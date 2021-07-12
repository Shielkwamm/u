import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';

const Organization = () => {
  const router = useRouter();
  const organizationName = router.query.organizationName;
  return (
    <Layout>
      <h1>{organizationName}</h1>
      <p>Proper Details</p>
      <OrganizationTeams/>
    </Layout>
  );
};

export default Organization;

const OrganizationTeams = () => (
  <p>Teams</p>
)

export const getOrganization = () => {
  return useQuery(queryOrganization, {
    variables: {
      organizationName: "Shielkwamm"
    }
  })
}

const queryOrganization = gql `query ($organizationName: String!) {
  organization(login: $organizationName) { 
    name
    teams(first: 20) {
      totalCount
      edges {
        node {
          name
          description
        }
      }
    }
  }
}`