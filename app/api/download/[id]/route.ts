import { ddbDocClient, TABLE_NAME, s3Client, BUCKET_NAME } from '@/lib/aws-config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { ImageData } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get image metadata from DynamoDB
    const response = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: params.id },
      })
    );

    const image = response.Item as ImageData;
    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Get image from S3
    const s3Response = await s3Client.send(
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: image.fileName,
      })
    );

    const arrayBuffer = await s3Response.Body?.transformToByteArray();
    if (!arrayBuffer) {
      return new NextResponse('Image data not found', { status: 404 });
    }

    // Return the image with appropriate headers
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': image.fileType,
        'Content-Disposition': `attachment; filename="${image.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}