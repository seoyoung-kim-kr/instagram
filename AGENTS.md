<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules & Policies

## 1. Icon Unification Policy
- 프로젝트 내에서 아이콘을 사용할 때 `react-icons`와 같은 외부 라이브러리를 개별 UI 컴포넌트에서 **직접 임포트해서 사용하지 않습니다.**
- 모든 외부 아이콘은 **`components/ui/icons/`** 디렉터리 하위에 커스텀 컴포넌트로 래핑하여 생성해야 합니다.
- **Outline(외곽선)과 Filled(채워진) 상태는 별도 파일로 분리**합니다.
  - Outline: `LikeIcon.tsx`, `BookmarkIcon.tsx`, `CommentIcon.tsx`
  - Filled: `LikeFilledIcon.tsx`, `BookmarkFilledIcon.tsx`, `CommentFilledIcon.tsx`
- `filled`와 같은 prop으로 상태를 분기하는 방식을 사용하지 않습니다. 각 파일이 단일 시각 상태만 담당합니다.
- 아이콘 컴포넌트는 `className` prop을 선택적으로 지원하여 크기나 색상 등을 외부에서 커스터마이징할 수 있도록 설계합니다.

