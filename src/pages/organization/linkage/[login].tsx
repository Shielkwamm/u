import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request'
import useSWR from 'swr'
import { graphql } from "@octokit/graphql";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Organization = ({ organization, teams }) => {
  const router = useRouter();
  const organizationLogin = router.query.login;
  const data = false
  return (
    <Layout>
      {!teams? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h2>{organizationLogin}</h2>
      <p>{organization.description}</p>
      <img src={organization.avatarUrl}/>
      <OrganizationTeams teams={teams}/>
      </>
    )}
    </Layout>
  );
};

export default Organization;

const OrganizationTeams = ({ teams }) => (
  <>
    <h3>Teams</h3>
    {teams.map((team) => (
      <Paper key={team.node.id}>
        <h4>{team.node.name}</h4>
        <p>{team.node.description}</p>
        <p><a href={team.node.url}>{team.node.url}</a>📋</p>
        <TeamPinnedDiscussions pinnedDiscussions={team.node.discussions.edges}/>        
      </Paper>
    ))}
  </>
)



const TeamPinnedDiscussions = ({ pinnedDiscussions }) => (
  <>
  <h5>Pins</h5>
  <Grid container>
  {pinnedDiscussions.map((pin) => (
    <Grid item xs={4} key={pin.node.id}>
      <p>{pin.node.title}</p>
      <p><a href={pin.node.url}>Link</a></p>
    </Grid>
  ))}
  </Grid>
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
        
        teams (first: 11){
          edges {
            node {
              id
              url   
              name
              privacy
              description 
              discussions (isPinned: true, first: 4) {
                edges {
                  node {
                    id
                    title 
                    url 
                    body 
                  }
                }
              }
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

  let filteredTeams = teams.filter(function (e) {
    //privacy: 'SECRET'
    return e.node.privacy !== "SECRET";
  });
  //console.log(teams)

  let organizationData = organization;
  organizationData.teams = null;

  return {
    props: {organization: organizationData, teams: filteredTeams}, // will be passed to the page component as props
  }
}
