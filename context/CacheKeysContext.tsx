import { createContext, useContext } from "react";

type CacheKeysContextType = {
  postsKey: string;
};

export const CacheKeysContext = createContext<CacheKeysContextType>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
