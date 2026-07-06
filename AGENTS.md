<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Rules & Policies

## 1. Icon Unification Policy
- 프로젝트 내에서 아이콘을 사용할 때 `react-icons`와 같은 외부 라이브러리를 개별 UI 컴포넌트에서 **직접 임포트해서 사용하지 않습니다.**
- 모든 외부 아이콘은 **`components/ui/icons/`** 디렉터리 하위에 커스텀 컴포넌트(예: `SearchIcon.tsx`, `LikeIcon.tsx` 등)로 래핑하여 생성해야 합니다.
- 새로운 아이콘이 필요하면 기존 컴포넌트가 존재하지 않는지 먼저 검사하고, 존재한다면 `filled`와 같은 prop 확장을 고려하여 **최대한 재사용**합니다.
- 아이콘 컴포넌트는 `className` prop을 선택적으로 지원하여 크기나 색상 등을 외부에서 커스터마이징할 수 있도록 설계합니다.

