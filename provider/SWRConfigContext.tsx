// components/SWRConfigContext.tsx
"use client";

import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRConfigContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: true }}>
      {children}
    </SWRConfig>
  );
}
