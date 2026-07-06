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
  const { container, imageSize } = getAvatarStyles(size, highlight);

  return (
    <div className={container}>
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

type AvatarStyle = {
  container: string;
  imageSize: number;
};

function getAvatarStyles(size: AvatarSize, highlight: boolean): AvatarStyle {
  const highlightClass = highlight
    ? "bg-linear-to-r from-pink-200 via-pink-300 to-purple-400 p-0.5"
    : "bg-gray-200 p-[2px]";

  const sizeMap: Record<AvatarSize, { container: string; imageSize: number }> = {
    sm: { container: "w-[32px] h-[32px]", imageSize: 28 },
    md: { container: "w-[44px] h-[44px]", imageSize: 40 },
    lg: { container: "w-[68px] h-[68px]", imageSize: 64 },
  };

  const currentSize = sizeMap[size];

  return {
    container: `rounded-full inline-block ${highlightClass} ${currentSize.container}`,
    imageSize: currentSize.imageSize,
  };
}
