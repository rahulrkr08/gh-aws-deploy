const { execSync } = require('child_process');
const core = require('@actions/core');

const AWS_ACCESS_KEY_ID = core.getInput('AWS_ACCESS_KEY_ID', { required: true });
const AWS_SECRET_ACCESS_KEY = core.getInput('AWS_SECRET_ACCESS_KEY', { required: true });
const awsRegion = core.getInput('AWS_REGION') || process.env.AWS_DEFAULT_REGION || 'us-east-1';

function run(cmd, options = {}) {
    if (!options.hide) {
        console.log(`$ ${cmd}`);
    }
    return execSync(cmd, {
        shell: '/bin/bash',
        encoding: 'utf-8',
        env: {
            ...process.env,
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY,
        },
    });
}

run(`$(aws ecr get-login --no-include-email --region ${awsRegion})`);

const accountData = run(`aws sts get-caller-identity --output json`);
const awsAccountId = JSON.parse(accountData).Account;

core.setOutput('account', awsAccountId);