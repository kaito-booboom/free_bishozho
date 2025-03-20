import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

// 環境変数からAWSの認証情報を取得
const REGION = process.env.AWS_REGION || "ap-northeast-1";
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "", // 環境変数からアクセスキーを取得
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "", // 環境変数からシークレットキーを取得
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

export const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "my-image-bucket"; // バケット名も環境変数に
export const TABLE_NAME = process.env.AWS_TABLE_NAME || "images"; 
