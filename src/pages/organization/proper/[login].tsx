import { useOrganization } from "~/components/organization/hooks"
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import useSWR from 'swr'
import { Typography } from "@material-ui/core"
import { Grid } from '@material-ui/core'
import ShLayout from "~/components/layout/shLayout"

const fetcher = url => fetch(url).then(res => res.json());

const Organization = ({ organizationProper }) => {
  const router = useRouter();
  const organizationName = router.query.login;
  const { data: organization, error: orgError } = useSWR(`https://raw.githubusercontent.com/${organizationName}/sh-proper/main/proper.json`,
    fetcher
  )
  const { data: organizationStyle, error: orgStyleError } = useSWR(`https://raw.githubusercontent.com/${organizationName}/sh-proper/main/style/un/style.json`,
    fetcher
  )
  const getRandomColor = (index) => {
    //console.log(data?.style?.colors)
    let randomIndex:number = -1;
    while (randomIndex === index || randomIndex === -1) {
      randomIndex = Math.floor(Math.random() * organizationStyle?.colors.length);
    }
    return organizationStyle?.colors[randomIndex].hex;
  }
  return (
    <ShLayout style={organizationStyle} title={organizationName}>
      {!organization? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h1>=== {organization.name} ===</h1>
      <h2 style={{textAlign: "right"}}>level 1</h2>
      <div style={{height: "5px", backgroundColor: `${getRandomColor(4)}`}}/>
      <h2 style={{textAlign: "center"}}>{organization.glyphs.map( (glyph, index) => <span key={index}>{`${glyph}`}</span>)}</h2>
      <Grid container>
        {organizationStyle?.colors.map((color, index) => (
          <Grid key={index} item xs={4} style={{height: 240, backgroundColor: color.hex}}>
            <p style={{fontFamily: organizationStyle?.fonts[0].family, color: getRandomColor(index)}}>{color.name}</p>
            <p style={{fontFamily: organizationStyle?.fonts[1].family, color: getRandomColor(index)}}>{color.hex}</p>
          </Grid>
        ))}
        
        
        <Grid item xs={12} style={{height: 240}}>
          <div style={{margin: "5px 15px", padding: "5px", border: `1px solid ${getRandomColor(3)}`}}>
          <h3 style={{color: getRandomColor(3)}}>Comm <a href={"https://shielkwamm.com/comm"}>link</a></h3>
            <iframe style={{margin: "0 -15px", width: "calc(100% + 10px)"}} frameBorder="0"src="https://shielkwamm.com/comm" >
          </iframe>
          </div>
        </Grid>
      </Grid>
      </>
    )}
    </ShLayout>
  );
};

export default Organization;

export async function getServerSideProps(context) {
  const organizationLogin = context.query.login;
  return {
    props: {}, // will be passed to the page component as props
  }
};

//{organizations?.map((organization) => (