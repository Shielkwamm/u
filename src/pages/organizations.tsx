import { useOrganizations } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import ListSingle from "~/components/organization/listSingle";
import Button from '@material-ui/core/Button';
import { useSpring, animated } from 'react-spring'

const OrganizationsList = () => {
  const organizations = useOrganizations();
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
      {organizations?.map((organization) => (
        <ListSingle key={organization._id} organization={organization}/>
      ))}
    </Layout>
  );
};

export default OrganizationsList;