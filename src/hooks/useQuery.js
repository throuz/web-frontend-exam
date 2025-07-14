import { useState, useEffect, useRef } from "react";

// 簡單快取（記憶體）
const cache = {};

function buildUrl(url, params) {
  if (!params) return url;
  const usp = new URLSearchParams(params);
  return url + (url.includes("?") ? "&" : "?") + usp.toString();
}

export default function useQuery({ url, params, enabled = true, cacheKey }) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const key = cacheKey || buildUrl(url, params);
  const abortRef = useRef();

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    // 快取命中
    if (cache[key]) {
      setData(cache[key]);
      setLoading(false);
      return;
    }
    // fetch
    abortRef.current && abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    fetch(buildUrl(url, params), { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json) => {
        cache[key] = json;
        setData(json);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
    // 只依賴 key，避免不必要的 re-fetch，參考 React Query/SWR 實踐
    // eslint-disable-next-line
  }, [key, enabled]);

  return { data, loading, error };
}
