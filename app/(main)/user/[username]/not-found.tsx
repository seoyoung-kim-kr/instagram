import Link from "next/link";
import { FaUserTimes } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-neutral-50 border border-neutral-100 shadow-xs text-neutral-400">
        <FaUserTimes className="size-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
          사용자를 찾을 수 없습니다
        </h2>
        <p className="text-neutral-500 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
          요청하신 사용자의 프로필이 존재하지 않거나, 잘못된 링크로 접근하셨을 수 있습니다.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center font-semibold text-sm px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
        >
          메인 피드로 돌아가기
        </Link>
      </div>
    </section>
  );
}
