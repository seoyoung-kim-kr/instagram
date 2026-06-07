import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "./ui/Dialog";
import ActionBar from "./ActionBar";
import useSWR from "swr";
import { FullPost } from "@/model/post";
import { Spinner } from "./ui/Spinner";
import Image from "next/image";
import Avatar from "./Avatar";
import parseDate from "@/util/date";
import CommentForm from "./CommentForm";

type Props = {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PostDetailDialog({ open, onOpenChange, id }: Props) {
  const {
    data: post,
    isLoading,
    error,
  } = useSWR<FullPost>(open && id ? `/api/posts/${id}` : null);

  if (isLoading) return <Spinner />;
  if (error) return <p>error: {error.message}</p>;
  if (!post) return null;

  const { username, userImage, image, likes, comments, createdAt, text } = post;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent
          className="rounded-none w-[90%] max-w-5xl h-[calc(100vh-80px)] max-h-212.5 p-0 flex bg-white overflow-hidden gap-0"
          showCloseButton={false}
        >
          <div className="relative w-4/5 h-full bg-black flex items-center justify-center">
            <Image
              src={image}
              alt="post photo"
              fill
              sizes="(max-width: 1024px) 60vw, 600px"
              className="object-contain"
              priority
            />
          </div>

          <section className="w-2/5 h-full flex flex-col justify-between bg-white">
            <DialogTitle className="sr-only">
              {username}님의 게시물 상세
            </DialogTitle>

            <div className="px-4 py-3.5 flex items-center gap-x-3 border-b border-neutral-200">
              <Avatar image={userImage} />
              <span className="font-semibold text-sm">{username}</span>
            </div>

            {comments && comments.length > 0 && (
              <ul className="flex-1 p-4 overflow-y-auto text-md">
                {comments.map(
                  ({ username, comment, createdAt, image }, idx) => (
                    <li
                      key={`${username}_${createdAt}_${idx}`}
                      className="flex items-center gap-x-3.5 pb-5"
                    >
                      <Avatar image={image} highlight={false} />
                      <div>
                        <p>
                          <span className="font-semibold">{username}</span>{" "}
                          {comment}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {parseDate(createdAt)}
                        </p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            )}

            <div className="p-4 border-y border-neutral-200 space-y-4">
              <ActionBar
                showCount={false}
                likes={likes}
                comment={comments?.length ?? 0}
              />
              <div className="space-y-1">
                <p className="font-bold text-md">{likes?.length ?? 0} like</p>
                <p className="text-neutral-500 text-sm font-semibold">
                  {parseDate(createdAt)}
                </p>
              </div>
            </div>
            <div>
              <CommentForm />
            </div>
          </section>
        </DialogContent>

        <DialogClose asChild>
          <button
            type="button"
            className="fixed right-6 top-6 z-60 text-white opacity-85 hover:opacity-100 transition-opacity"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </DialogClose>
      </DialogPortal>
    </Dialog>
  );
}
