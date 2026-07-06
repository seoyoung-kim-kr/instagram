import Avatar from "@/components/Avatar";
import { AuthUser } from "@/model/user";

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <section className="space-y-7">
      <div className="flex gap-x-4 items-center">
        {image && <Avatar image={image} size="md" highlight={false} />}
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-neutral-500 leading-4">{name}</p>
        </div>
      </div>

      <p className="text-neutral-500 text-sm">
        About ∙ Help ∙ Press ∙ API ∙ Jobs ∙ Privacy ∙ Terms ∙ Location ∙
        Language
      </p>

      <p className="font-bold text-gray-500 text-sm">
        @Copyright INSTAGRAM from METAL
      </p>
    </section>
  );
}
