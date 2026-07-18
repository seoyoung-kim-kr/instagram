"use client";

import { AuthUser } from "@/model/user";
import React, { useState, useRef, DragEvent, ChangeEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import Avatar from "./Avatar";
import FilesIcon from "./ui/icons/FilesIcon";
import { Spinner } from "./ui/Spinner";
import Button from "./Button";
import Image from "next/image";

type Props = {
  user: AuthUser;
};

// 1. 이미지 업로드/미리보기 영역 분리 및 메모이제이션
type ImageProps = {
  file: File | null;
  dragging: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onUploadClick: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
};

const PostFormImage = React.memo(({
  file,
  dragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadClick,
  onFileChange,
  onClearFile,
  fileInputRef,
}: ImageProps) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={file ? undefined : onUploadClick}
      className={`relative flex-1 flex flex-col items-center justify-center p-6 cursor-pointer transition-colors duration-200 ${
        dragging ? "bg-sky-50/50 border-sky-400" : "hover:bg-neutral-50/50"
      } ${file ? "" : "border-2 border-dashed border-neutral-200 m-4 rounded-xl"}`}
    >
      {file ? (
        <div className="relative w-full h-full">
          <Image
            src={URL.createObjectURL(file)}
            alt="preview"
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClearFile();
            }}
            className="absolute top-2 right-2 bg-neutral-800/80 hover:bg-neutral-800 text-white rounded-full p-1.5 shadow-md transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 bg-neutral-100 rounded-full text-neutral-400">
            <FilesIcon className="size-8" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-neutral-700">
              Drag photos and videos here
            </p>
            <p className="text-xs text-neutral-400 font-medium">
              Or click to upload from computer
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
});

PostFormImage.displayName = "PostFormImage";

// 2. 프로필 카드 영역 분리 및 메모이제이션
type ProfileProps = {
  username: string;
  image?: string;
};

const PostFormProfile = React.memo(({ username, image }: ProfileProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <Avatar image={image} highlight={false} />
      <span className="font-semibold text-sm text-neutral-800">
        {username}
      </span>
    </div>
  );
});

PostFormProfile.displayName = "PostFormProfile";

// 3. 메인 NewPost 컴포넌트
export default function NewPost({ user }: Props) {
  const { username, image: userImage } = user;
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  // 핸들러 useCallback 메모이제이션 적용
  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("이미지 파일만 첨부할 수 있습니다.");
      }
    }
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("이미지 파일만 첨부할 수 있습니다.");
      }
    }
  }, []);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleClearFile = useCallback(() => {
    setFile(null);
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!file || !text.trim() || loading) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      // SWR 피드 캐시 무효화 및 홈 리다이렉트
      await mutate("/api/posts");
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(
        "포스트를 업로드하는 과정에서 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto mt-6 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
      <header className="px-4 py-3 border-b border-neutral-200 text-center font-bold text-md text-neutral-800">
        Create New Post
      </header>

      {error && (
        <div className="p-3 mx-4 mt-4 text-xs font-semibold text-center text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-200 h-[500px]"
      >
        {/* 드래그앤드롭 및 이미지 미리보기 (메모이제이션된 자식 컴포넌트) */}
        <PostFormImage
          file={file}
          dragging={dragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onUploadClick={handleUploadClick}
          onFileChange={handleFileChange}
          onClearFile={handleClearFile}
          fileInputRef={fileInputRef}
        />

        {/* 캡션 기입 영역 */}
        <div className="w-full md:w-[250px] p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* 프로필 카드 (메모이제이션된 자식 컴포넌트) */}
            <PostFormProfile username={username} image={userImage} />

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a caption..."
              className="w-full h-40 outline-none resize-none border-0 text-sm text-neutral-700 placeholder-neutral-400 focus:ring-0"
              maxLength={200}
            />
            <div className="text-right text-xs text-neutral-400 font-medium">
              {text.length}/200
            </div>
          </div>

          <Button
            text={loading ? <Spinner className="size-4" /> : "Share"}
            onClick={() => handleSubmit()}
            disabled={loading || !file || !text.trim()}
          />
        </div>
      </form>
    </section>
  );
}
