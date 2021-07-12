import { useOrganizations } from "~/components/organization/hooks";
import Layout from "~/components/organization/layout";

const OrganizationsList = () => {
  const organizations = useOrganizations();
  return (
    <Layout>
      <h1>Organizations</h1>
      {organizations?.map((organization) => (
        <Organizations key={organization._id} organization={organization}/>
      ))}
    </Layout>
  );
};

export default OrganizationsList;

const Organizations = ({ organization }) => (
  <div>
    <h2>{organization.organizationName}</h2>
    <a href={`/organization/${organization.organizationName}`} >Proper</a> | <a href={`https://github.com/${organization.organizationName}`}>Github</a>
    <p>glyphs list</p>
  </div>
)