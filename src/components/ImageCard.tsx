import Image from "next/image";
import { useState } from "react";

export const ImageCard = ({ url }: { url: string }) => {
  const [isLoading, setLoading] = useState(true);
  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
      <Image
        width={1024}
        height={1024}
        src={url}
        alt="Generated image from DALl-E"
        className={cn(
          "duration-700 ease-in-out",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};
