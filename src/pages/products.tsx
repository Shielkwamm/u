import { useProducts } from "~/components/product/hooks";
import Layout from "~/components/product/layout";
import ListSingle from "~/components/product/listSingle";
import { useSpring, animated } from 'react-spring'
import Button from '@material-ui/core/Button';
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json());
  

const ProductsList = () => {
  //const organizationName = router.query.login;
  const { data, error } = useSWR(`https://raw.githubusercontent.com/staticStatic/u-data/main/products.json`, fetcher);
  //const products = useProducts();
  const skewX = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: 700 },
  })
  
  return (
    <Layout>
      <h2><a style={{display: "inline-block"}} href="/products"><animated.div style={skewX}>prod<Button variant="contained">ṵ</Button>cts</animated.div></a>  </h2>
      {data?.map((product) => (
        <ListSingle key={product._id} product={product}/>
      ))}
    </Layout>
  );
};

export default ProductsList;