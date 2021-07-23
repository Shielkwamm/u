import Grid from '@material-ui/core/Grid';
import { gql, request } from 'graphql-request';

const ListSingle = ({ product }) => (
  <>
    <h2>{product.name}{product.u}</h2>
    {product.description ? (<p><b>description</b>: {product.description}</p>): null}
    {product.bigIdea ? ( <p><em>bigIdea</em>: {product.bigIdea}</p> ): null }
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <a href={`https://github.com/${product.productOwner}`}>Product Owner: {product.productOwner}</a></Grid>
      <Grid item xs={4}>
        <a href={`${product.repo}`}>repo</a>
      </Grid>
      <Grid item xs={4}>
        <a href={`https://github.com/${product.name}`}>github</a>
      </Grid>
    </Grid>
    {product.lean? (<h4>lean</h4>):null}
    {product.lean?.map((ps, index) => (
      <div key={index} >
        <h4><em>problem</em>: {ps.problem}</h4>
        <p><b>solution</b>: {ps.solution}</p>
      </div>
    ))}
  </>
)

export default ListSingle;