import { useOrganizations } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import ListSingle from "~/components/organization/listSingle";
import Button from '@material-ui/core/Button';
import { useSpring, animated } from 'react-spring'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json());

const OrganizationsList = () => {
  const { data, error } = useSWR(`https://raw.githubusercontent.com/staticStatic/u-data/main/organizations.json`, fetcher);
  //const organizations = useOrganizations();
  const skewX = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: 1000 },
  })
  return (
    <Layout>
      <h2><a style={{display: "inline-block"}} href="/organizations"><animated.div style={skewX}><Button color="primary" >ữ</Button>rganizations</animated.div></a> </h2>
      {data?.map((organization, index) => (
        <ListSingle key={index} organization={organization}/>
      ))}
    </Layout>
  );
};

export default OrganizationsList;