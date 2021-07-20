import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { gql, request } from 'graphql-request';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


const ListSingle = ({ organization }) => {
  let randomElevation = Math.floor(Math.random() * 5);
  let randomMargin = Math.floor(Math.random() * 6);
  let randomFontSizeRepo = Math.floor(Math.random() * 30) + 12;
  let randomFontSizeOrganization = Math.floor(Math.random() * 30) + 40;
  return (
  <Paper elevation={randomElevation}>
    <Box m={randomMargin}>
    <h2 style={{fontSize: randomFontSizeOrganization}}>{organization.organizationName} <span style={{fontSize: randomFontSizeRepo + "px"}}>- <a href={`https://github.com/${organization.organizationName}`}>github</a></span></h2>
    <hr/>
    <Grid container spacing={3}>
      
      <Grid item xs={12}>
        <a href={`/organization/_sh_/${organization.organizationName}`} ><Button variant="contained" color="primary">_sh_</Button></a>
      </Grid>      
    </Grid>
    </Box>
    </Paper>
  )
}

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