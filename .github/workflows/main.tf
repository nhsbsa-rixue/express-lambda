provider "aws" {
  region = "eu-west-2"
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "lambda-execution-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"  # Allow Lambda service to assume this role
        },
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_lambda_function" "lambda_function" {
  filename = "./lambda.zip"
  function_name = "tf-managed-lambda-function"
  handler = "index.handler"
  runtime = "nodejs20.x"
  role          = aws_iam_role.lambda_execution_role.arn
  # Other configurations like source code, permissions, etc.
}

resource "aws_lambda_function_url" "lambda_function_url" {
  function_name = aws_lambda_function.lambda_function.function_name
  authorization_type     = "NONE"
}

output "lambda_function_url" {
  value = aws_lambda_function_url.lambda_function_url
}

output "function_arn" {
  value = aws_lambda_function.lambda_function.arn
}
