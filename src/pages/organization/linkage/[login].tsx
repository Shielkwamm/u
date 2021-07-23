import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request'
import useSWR from 'swr'
import { graphql } from "@octokit/graphql";

const Organization = ({ teams }) => {
  const router = useRouter();
  const organizationLogin = router.query.login;
  const data = false

  console.log(teams)

  return (
    <Layout>
      {!teams? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h1>{organizationLogin}</h1>
      <div>level 1</div>
      <div>owner</div>
      <p>glyphs list</p>
      <p>Proper Details</p>
      <OrganizationTeams teams={teams}/>
      </>
    )}
    </Layout>
  );
};

export default Organization;

const OrganizationTeams = ({ teams }) => (
  <>
    <h2>Teams</h2>
    {teams.map((team) => (
      <div key={team.node.id}>
        <h3>{team.node.name}</h3>
        <p>{team.node.description}</p>
        <p><a href={team.node.url}>{team.node.url}</a>📋</p>
      </div>
    ))}
  </>
)

export async function getServerSideProps(context) {
  const organizationLogin = context.query.login;
  if (!process.env.GITHUB) {
    throw new Error(
      "GITHUB env variable not defined. Could not use github API"
    );
  }

  const { organization } = await graphql(
    `
     query ($login: String!){
      organization (login: $login){
        login
        avatarUrl 
        description 
        email 
        location 
        
        teams (first: 20){
          edges {
            node {
              id
              url   
              name
              description 
            }
          }
        }
      }
    }
    `,
    {
      login: organizationLogin,
      headers: {
        authorization: `token ${process.env.GITHUB}`,
      },
    }
  );
  const teams = organization.teams.edges;
  return {
    props: {teams: teams}, // will be passed to the page component as props
  }
}
