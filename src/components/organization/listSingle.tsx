import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { gql, request } from 'graphql-request';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useSpring, animated } from 'react-spring'

const ListSingle = ({ organization }) => {
  const randomElevation = Math.floor(Math.random() * 5);
  const randomMargin = Math.floor(Math.random() * 6);
  const randomFontSizeRepo = Math.floor(Math.random() * 30) + 12;
  const randomFontSizeOrganization = Math.floor(Math.random() * 30) + 40;
  const randomDuration = Math.floor(Math.random() * 500) + 1000;
  const uString = "ṵṷṹṻụủứừ⒰υṳ";
  const randomIndex = Math.floor(Math.random() * uString.length)
  const randomU = uString.slice(randomIndex, randomIndex + 1);
  const randomOrder = Math.floor(Math.random() * 3) 
  const opacityPulse = useSpring({
    loop: true,
    to: [
      { opacity: .5 },
      { opacity: 1 },
    ],
    from: { opacity: 1 },
    config: { duration: randomDuration },
  })

  const twist = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: [{ rotateZ: 180 }],
    config: { duration: randomDuration },
  })
  


  return (
    <animated.div style={opacityPulse}>
  <Paper elevation={randomElevation}>
    <Box m={randomMargin}>
    <h2 style={{fontSize: randomFontSizeOrganization}}>{organization.organizationName}</h2>
    <hr/>
    <Grid container spacing={3}>
    <Grid item xs={4} style={{order: randomOrder}}>
        <a href={`/organization/linkage/${organization.organizationName}`} ><Button variant="contained">linkage</Button></a>
      </Grid>
      <Grid item xs={4}>
          <a href={`/organization/proper/${organization.organizationName}`} ><Button variant="contained" color="primary">_sh_</Button></a>
      </Grid>
      <Grid item xs={4}>
        <span style={{fontSize: randomFontSizeRepo + "px"}}> <a href={`https://github.com/${organization.organizationName}`}>gith{randomU}b</a></span>
      </Grid>
    </Grid>
    </Box>
    </Paper>
    </animated.div>
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