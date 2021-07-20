import { useProducts } from "~/components/product/hooks";
import Layout from "~/components/product/layout";
import ListSingle from "~/components/product/listSingle";

const ProductsList = () => {
  const products = useProducts();
  return (
    <Layout>
      <h1>Products</h1>
      {products?.map((product) => (
        <ListSingle key={product._id} product={product}/>
      ))}
    </Layout>
  );
};

export default ProductsList;