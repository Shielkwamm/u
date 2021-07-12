import { useOrganizations } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";
import ListSingle from "~/components/organization/listSingle";

const OrganizationsList = () => {
  const organizations = useOrganizations();
  return (
    <Layout>
      <h1>Organizations</h1>
      {organizations?.map((organization) => (
        <ListSingle key={organization._id} organization={organization}/>
      ))}
    </Layout>
  );
};

export default OrganizationsList;