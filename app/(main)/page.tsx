import { auth } from "@/auth";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";

export default async function Homepage() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <section className="w-full max-w-212.5 flex flex-col md:flex-row justify-between gap-x-10 px-10 py-7">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
