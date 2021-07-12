// It won't reload if there are no remount => we need to find a way to mutate on login
// @see https://github.com/vercel/next.js/discussions/19601
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { propers: data?.propers || null };
    });

export function usePropers({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR("/api/proper", fetcher);
  const propers = data?.propers;
  const finished = Boolean(data);
  const hasPropers = Boolean(propers);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    
  }, [redirectTo, redirectIfFound, finished, hasPropers]);

  return error ? null : propers;
}
