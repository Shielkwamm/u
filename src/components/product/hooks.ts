// It won't reload if there are no remount => we need to find a way to mutate on login
// @see https://github.com/vercel/next.js/discussions/19601
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const productFetcher = (url) =>
  fetch(url)
  .then((r) => r.json())
  .then((data) => {
    return { product: data?.product || null };
  });

export function useProduct({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR("/api/product", productFetcher);
  const product = data?.product;
  const finished = Boolean(data);
  const hasProduct = Boolean(product);
  useEffect(() => {
    if (!finished) return;
    /*if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }*/
  }, [redirectTo, redirectIfFound, finished, hasProduct]);

  return error ? null : product;
}

const productsFetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { products: data?.products || null };
    });

export function useProducts({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR("/api/products", productsFetcher);
  const products = data?.products;
  const finished = Boolean(data);
  const hasProducts = Boolean(products);

  useEffect(() => {
    if (!finished) return;
    /*if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }*/
  }, [redirectTo, redirectIfFound, finished, hasProducts]);

  return error ? null : products;
}
