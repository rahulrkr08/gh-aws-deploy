# Github Actions for Amazon Web Services

To set this up, create a new IAM user with access to ECR (e.g. with the AmazonEC2ContainerRegistryFullAccess policy).  
Then, add the following secrets to your GitHub project:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_REGION`

## login

Usage:

```yaml
- name: Login to ECR
  id: ecr
  uses: rahulrkr08/gh-aws-deploy@v1
  with:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: ${{ secrets.AWS_REGION }}
- name: Push to ECR
  run: |
    docker tag my-image ${{ steps.ecr.outputs.account }}.dkr.ecr.us-east-1.amazonaws.com/my-image:v1
    docker push ${{ steps.ecr.outputs.account }}.dkr.ecr.us-east-1.amazonaws.com/my-image:v1
```
