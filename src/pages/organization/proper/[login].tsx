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
  const { data, error } = useSWR(`https://raw.githubusercontent.com/${organizationName}/sh-proper/main/proper.json`,
    fetcher
  )
  const getRandomColor = (index) => {
    //console.log(data?.style?.colors)
    let randomIndex:number = -1;
    while (randomIndex === index || randomIndex === -1) {
      console.log(randomIndex)
      randomIndex = Math.floor(Math.random() * data?.style?.colors.length);
    }
    return data?.style?.colors[randomIndex].hex;
  }
  return (
    <ShLayout style={data?.style} title={organizationName}>
      {!data? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h1>=== {data.name} ===</h1>
      <h2 style={{textAlign: "right"}}>level 1</h2>
      <h2 style={{textAlign: "center"}}>{data.glyphs.map( (glyph, index) => <span key={index}>{`${glyph}`}</span>)}</h2>
      <Grid container>
        {data?.style?.colors.map((color, index) => (
          <Grid key={index} item xs={4} style={{height: 240, backgroundColor: color.hex}}>
            <p style={{color: getRandomColor(index)}}>{color.name}</p>
            <p style={{color: getRandomColor(index)}}>{color.hex}</p>
          </Grid>
        ))}
        
        
        <Grid item xs={12} style={{height: 240}}>
          <h3>Comm <a href={"https://shielkwamm.com/comm"}>link</a></h3>
            <iframe style={{width: "100%"}} frameBorder="0"src="https://shielkwamm.com/comm" >
          </iframe>
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