// components/Avatar.tsx
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

type Props = {
  image?: string | null;
  highlight?: boolean;
  size?: AvatarSize;
};

export default function Avatar({
  image,
  highlight = true,
  size = "md",
}: Props) {
  const containerClassName = getContainerStyle(size, highlight);
  const imageSize = getImageSizeStyle(size);

  return (
    <div className={containerClassName}>
      <div className="bg-white rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt="user profile"
            width={imageSize}
            height={imageSize}
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-gray-400 text-xs">
            👤
          </div>
        )}
      </div>
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const highlightClass = highlight
    ? "bg-linear-to-r from-pink-200 via-pink-300 to-purple-400 p-0.5"
    : "bg-gray-200 p-[2px]";

  const containerSizes: Record<AvatarSize, string> = {
    sm: "w-[32px] h-[32px]",
    md: "w-[44px] h-[44px]",
    lg: "w-[68px] h-[68px]",
  };

  return `rounded-full inline-block ${highlightClass} ${containerSizes[size]}`;
}

function getImageSizeStyle(size: AvatarSize): number {
  const imageSizes: Record<AvatarSize, number> = {
    sm: 28,
    md: 40,
    lg: 64,
  };

  return imageSizes[size];
}
