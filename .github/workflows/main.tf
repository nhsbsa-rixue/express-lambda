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

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_dynamodb_table" "table" {
  name           = "notes"
  hash_key       = "odsCode"
  range_key      = "partMonth"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "odsCode"
    type = "S"
  }

  attribute {
    name = "partMonth"
    type = "S"
  }
}

resource "aws_lambda_layer_version" "layer" {
  filename            = "./layer.zip"
  layer_name          = "express-lambda-layer"
  compatible_runtimes = ["nodejs20.x"]
}

resource "aws_lambda_function" "lambda_function" {
  filename = "./lambda.zip"
  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)
  function_name = "tf-managed-lambda-function"
  handler = "./src/index.handler"
  runtime = "nodejs20.x"
  role    = aws_iam_role.lambda_execution_role.arn
  layers = [aws_lambda_layer_version.layer.arn]
  publish = true

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
