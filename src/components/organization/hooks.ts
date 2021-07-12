// It won't reload if there are no remount => we need to find a way to mutate on login
// @see https://github.com/vercel/next.js/discussions/19601
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const organizationFetcher = (url) =>
  fetch(url)
  .then((r) => r.json())
  .then((data) => {
    return { organization: data?.organization || null };
  });

export function useOrganization({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR("/api/organization", organizationFetcher);
  const organization = data?.organization;
  const finished = Boolean(data);
  const hasOrganization = Boolean(organization);
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
  }, [redirectTo, redirectIfFound, finished, hasOrganization]);

  return error ? null : organization;
}

const organizationsFetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { organizations: data?.organizations || null };
    });

export function useOrganizations({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) {
  const { data, error } = useSWR("/api/organizations", organizationsFetcher);
  const organizations = data?.organizations;
  const finished = Boolean(data);
  const hasOrganizations = Boolean(organizations);

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
  }, [redirectTo, redirectIfFound, finished, hasOrganizations]);

  return error ? null : organizations;
}
