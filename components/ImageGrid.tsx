"use client";

import { ImageData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ImageGridProps {
  images: ImageData[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Link href={`/image/${image.id}`} key={image.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
              <p className="text-gray-600 line-clamp-2">{image.description}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}