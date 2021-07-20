import Grid from '@material-ui/core/Grid';
import { gql, request } from 'graphql-request';

const ListSingle = ({ product }) => (
  <>
    <h2>{product.productName}</h2>
    <Grid container spacing={3}>
      
      <Grid item xs={4}>
        <a href={`https://github.com/${product.productOwner}`}>Product Owner</a></Grid>
      <Grid item xs={4}>
        <a href={`${product.repo}`}>repo</a>
      </Grid>
      <Grid item xs={4}>
        <a href={`https://github.com/${product.name}`}>github</a>
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