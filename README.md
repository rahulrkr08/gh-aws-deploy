# Github Actions for Amazon Web Services

To set this up, create a new IAM user with access to ECR (e.g. with the AmazonEC2ContainerRegistryFullAccess policy).  
Then, add the following secrets to your GitHub project:

* `aws_access_key`
* `aws_secret_access_key`
* `aws_region`

## login

Usage:

```yaml
- name: Login to ECR
  id: ecr
  uses: rahulrkr08/gh-aws-deploy@v3
  with:
    aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws_region: ${{ secrets.AWS_REGION }}
    image: <image name>:<version>
```
