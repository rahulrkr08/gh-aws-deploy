const { execSync } = require('child_process');
const core = require('@actions/core');

const aws_access_key = core.getInput('aws_access_key', { required: true });
const aws_secret_access_key = core.getInput('aws_secret_access_key', { required: true });

const aws_region = core.getInput('aws_region') || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const direction = core.getInput('direction') || 'push';
const image = core.getInput('image', { required: true });

function run(cmd, options = {}) {
    if (!options.hide) {
        console.log(`$ ${cmd}`);
    }
    return execSync(cmd, {
        shell: '/bin/bash',
        encoding: 'utf-8',
        env: {
            ...process.env,
            AWS_ACCESS_KEY_ID: aws_access_key,
            AWS_SECRET_ACCESS_KEY: aws_secret_access_key,
        }
    });
}

run(`$(aws ecr get-login --no-include-email --region ${aws_region})`);

const accountData = run(`aws sts get-caller-identity --output json`);
const awsAccountId = JSON.parse(accountData).Account;

core.setOutput('account', awsAccountId);

if (direction === 'push') {
    console.log(`Pushing image ${image} to ${awsAccountId}.dkr.ecr.${aws_region}.amazonaws.com/${image}`);
    run(`docker tag ${image} ${awsAccountId}.dkr.ecr.${aws_region}.amazonaws.com/${image}`);
    run(`docker push ${awsAccountId}.dkr.ecr.${aws_region}.amazonaws.com/${image}`);
} else {
    throw new Error(`Unknown direction ${direction}`);
}
