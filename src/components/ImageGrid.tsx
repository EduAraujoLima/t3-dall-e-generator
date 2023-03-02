import { ImageCard } from "./ImageCard";

type Props = {
  images: {
    url: string;
  }[];
};

export const ImageGrid = ({ images }: Props) => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {images.map((image, index) => (
        <div key={index}>
          <ImageCard url={image.url} />
        </div>
      ))}
    </div>
  );
};
