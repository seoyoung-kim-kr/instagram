import { Files } from "lucide-react";

type Props = {
  className?: string;
};

export default function FilesIcon({ className }: Props) {
  return <Files className={className || "size-6"} />;
}
