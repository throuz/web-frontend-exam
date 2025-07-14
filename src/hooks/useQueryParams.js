import { useState, useEffect, useCallback } from "react";

function parseQuery(defaults = {}) {
  const params = new URLSearchParams(window.location.search);
  const result = { ...defaults };
  for (const key in defaults) {
    let val = params.get(key);
    if (val === null) continue;
    // 型別轉換：page 轉 int
    if (key === "page") {
      val = parseInt(val, 10) || defaults.page || 1;
    }
    result[key] = val;
  }
  return result;
}

function buildQuery(obj = {}) {
  const params = new URLSearchParams();
  for (const key in obj) {
    if (
      obj[key] !== undefined &&
      obj[key] !== "" &&
      !(key === "page" && obj[key] === 1)
    ) {
      params.set(key, obj[key]);
    }
  }
  return params.toString();
}

export default function useQueryParams(defaults = {}) {
  const [query, setQueryState] = useState(() => parseQuery(defaults));

  // 監聽 URL 變動（如瀏覽器前進/後退）
  useEffect(() => {
    const onPopState = () => {
      setQueryState(parseQuery(defaults));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [defaults]);

  // 當 URL query string 變動時同步
  useEffect(() => {
    setQueryState(parseQuery(defaults));
    // eslint-disable-next-line
  }, [window.location.search]);

  // 設定 query string
  const setQuery = useCallback(
    (newQuery) => {
      const merged = { ...query, ...newQuery };
      const qs = buildQuery(merged);
      const newUrl = `${window.location.pathname}${qs ? "?" + qs : ""}`;
      window.history.replaceState({}, "", newUrl);
      setQueryState(parseQuery(defaults));
    },
    [query, defaults]
  );

  return [query, setQuery];
}
