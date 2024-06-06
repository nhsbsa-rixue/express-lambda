terraform {
  backend "s3" {
    bucket         = "nhsbsa-sandpit-terraform"
    key            = "express-lambda-tf-state"
    region         = "eu-west-2"
  }
}

provider "aws" {
  region = "eu-west-2"
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "express-lambda-execution-role"
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

resource "aws_dynamodb_table" "table" {
  name           = "notes"
  hash_key       = "odsCode"
  range_key      = "partMonth"
  read_capacity  = 5
  write_capacity = 5

  attribute {
    name = "odsCode"
    type = "S"
  }

  attribute {
    name = "partMonth"
    type = "S"
  }
}

resource "aws_lambda_function" "lambda_function" {
  filename = "./lambda.zip"
  function_name = "tf-managed-lambda-function"
  handler = "./src/index.handler"
  runtime = "nodejs20.x"
  role          = aws_iam_role.lambda_execution_role.arn
  environment {
    variables = {
      DYNAMODB_ENDPOINT = aws_dynamodb_table.table.arn
    }
  }
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
