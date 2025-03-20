import { ddbDocClient, TABLE_NAME, s3Client, BUCKET_NAME } from '@/lib/aws-config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { ImageData } from '@/lib/types';
import { notFound } from 'next/navigation';
import ImageDetail from '@/components/ImageDetail';

async function getImage(id: string): Promise<ImageData | null> {
  try {
    const response = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );
    return response.Item as ImageData;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export default async function ImagePage({
  params,
}: {
  params: { id: string };
}) {
  const image = await getImage(params.id);

  if (!image) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ImageDetail image={image} />
    </div>
  );
}