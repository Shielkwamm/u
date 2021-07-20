import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request'
import useSWR from 'swr'

const fetcher = query => request('https://api.github.com/graphql', query)

const Organization = () => {
  const router = useRouter();
  const organizationName = router.query.organizationName;
  const { data, error } = useSWR(
    `query {
      organization (login: ${router.query.organizationName}){
        login
        teams (first: 20){
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }`,
    fetcher
  )
  console.log(data)
  return (
    <Layout>
      {!data? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h1>{organizationName}</h1>
      <div>level 1</div>
      <div>owner</div>
      <p>glyphs list</p>
      <p>Proper Details</p>
      <OrganizationTeams teams={data.teams}/>
      <div>
        <a href={``}>Show</a>
      </div>
      <div>
        <a href={`https://github.com/${organizationName}`}>Github</a>
      </div>
      </>
    )}
    </Layout>
  );
};

export default Organization;

const OrganizationTeams = ({ teams }) => (
  <>
    {teams.map((organiation) => (
      <p>Team</p>
    ))}
  </>
)

//{organizations?.map((organization) => (