import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';

const fetcher = query => request('/api/graphql', query)

function App () {
  const { data, error } = useSWR(
    `{
      Movie(title: "Inception") {
        releaseDate
        actors {
          name
        }
      }
    }`,
    fetcher
  )
  // ...
}

const Organization = () => {
  const router = useRouter();
  const organizationName = router.query.organizationName;
  const organization = getOrganization();
  return (
    <Layout>
      <h1>{organizationName}</h1>
      <div>level 1</div>
      <div>owner</div>
      <p>glyphs list</p>
      <p>Proper Details</p>
      <OrganizationTeams/>
      <div>
        <a href={``}>Show</a>
      </div>
      <div>
        <a href={`https://github.com/${organizationName}`}>Github</a>
      </div>
    </Layout>
  );
};

const organizationFetcher = (url) =>
fetch(url)
  .then((r) => r.json())
  .then((data) => {
    return { organization: data?.organization || null };
  });

export default Organization;

const OrganizationTeams = () => (
  <p>Teams</p>
)

export const getOrganization = () => {
  //const { data, error } = useSWR('https://api.github.com/graphql', organizationFetcher)
  return useQuery(queryOrganization, {
    variables: {
      organizationName: "Shielkwamm"
    }
  })
}

/*fetch('http://localhost:4000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `
    query {
      todos {
        edges {
          node {
            completed
            id
            text
          }
	}
      }
    }` 
  }),
})*/