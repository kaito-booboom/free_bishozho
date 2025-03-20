import ImageGrid from '@/components/ImageGrid';
import { ddbDocClient, TABLE_NAME } from '@/lib/aws-config';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { ImageData } from '@/lib/types';

async function getImages(): Promise<ImageData[]> {
  try {
    const data = await ddbDocClient.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );
    return data.Items as ImageData[];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function Home() {
  const images = await getImages();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Image Gallery</h1>
      <ImageGrid images={images} />
    </main>
  );
}