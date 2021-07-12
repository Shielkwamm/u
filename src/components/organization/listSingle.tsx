import Grid from '@material-ui/core/Grid';
import { gql, request } from 'graphql-request';

const ListSingle = ({ organization }) => (
  <>
    <h2>{organization.organizationName}</h2>
    <Grid container spacing={3}>
      
      <Grid item xs={4}>owner</Grid>
      <Grid item xs={4}>
        <a href={`/organization/${organization.organizationName}`} >proper</a>
      </Grid>
      <Grid item xs={4}>
        <a href={`https://github.com/${organization.organizationName}`}>github</a>
      </Grid>
      
    </Grid>
    </>
)

export default ListSingle;

const queryOrganization = gql `query ($organizationName: String!){ 
  organization(login: $organizationName) { 
    name
    memberStatuses(first:1) {
      edges {
        node {
        	user {
            login
          }
        }
      }
    }
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