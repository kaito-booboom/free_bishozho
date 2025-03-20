"use client";

import { ImageData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageDetailProps {
  image: ImageData;
}

export default function ImageDetail({ image }: ImageDetailProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download/${image.id}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = image.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image.url}
          alt={image.title}
          fill
          className="object-contain"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{image.title}</h1>
            <p className="text-gray-600 mb-4">{image.description}</p>
            <p className="text-sm text-gray-500">
              Uploaded on {new Date(image.uploadDate).toLocaleDateString()}
            </p>
          </div>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
        <div className="mt-6">
          <Link href="/">
            <Button variant="outline">Back to Gallery</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}