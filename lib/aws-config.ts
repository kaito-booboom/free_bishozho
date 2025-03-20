import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

const REGION = "ap-northeast-1";
const credentials = {
  accessKeyId: "dummy-access-key",
  secretAccessKey: "dummy-secret-key",
};

export const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials,
});

export const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const s3Client = new S3Client({
  region: REGION,
  credentials,
});

export const BUCKET_NAME = "my-image-bucket";
export const TABLE_NAME = "images";