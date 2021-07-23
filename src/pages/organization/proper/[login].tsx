import { useOrganization } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client';
import useSWR from 'swr'
import { Typography } from "@material-ui/core";
import { Grid } from '@material-ui/core';

const fetcher = url => fetch(url).then(res => res.json());

const Organization = ({ organizationProper }) => {
  const router = useRouter();
  const organizationName = router.query.login;
  const { data, error } = useSWR(`https://raw.githubusercontent.com/${organizationName}/sh-proper/main/proper.json`,
    fetcher
  )
  return (
    <Layout>
      {!data? (
        <h1>loading</h1>
      ) :
      (
        <>
      <h1>{data.name}</h1>
      <Typography variant={"h3"} color={"textSecondary"}>level 1</Typography>
      <h1>{data.glyphs.map( (glyph, index) => <span key={index}>{`${glyph}`}</span>)}</h1>
      <Grid container>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["1"]}}>{data.colorScheme["1"]}</Grid>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["2"]}}>{data.colorScheme["2"]}</Grid>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["3"]}}>{data.colorScheme["3"]}</Grid>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["4"]}}>{data.colorScheme["4"]}</Grid>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["background"]}}>{data.colorScheme["background"]}</Grid>
        <Grid item xs={4} style={{height: 240, backgroundColor: data.colorScheme["foreground"]}}>{data.colorScheme["foreground"]}</Grid>
        <Grid item xs={4} style={{height: 240}}>
          <h3>Comm <a href={"https://shielkwamm.com/comm"}>link</a></h3>
            <iframe src="https://shielkwamm.com/comm" >
          </iframe>
        </Grid>
      </Grid>
      </>
    )}
    </Layout>
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