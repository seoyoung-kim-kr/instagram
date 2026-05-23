import Image from "next/image";

type Props = {
  image: string | null;
};

export default function Avartar({ image }: Props) {
  return (
    <div
      className="p-0.5 rounded-full bg-linear-to-r from-pink-200 via-pink-300 to-purple-400 inline-block"
      style={{ width: 44, height: 44 }}
    >
      <div className="bg-white rounded-full overflow-hidden w-full h-full flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt="user profile"
            width={40}
            height={40}
            referrerPolicy="no-referrer"
          />
        ) : null}
      </div>
    </div>
  );
}
