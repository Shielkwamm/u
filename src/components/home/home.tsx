import "~/types/mdx.d.ts"; // TODO: load this automatically
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useSpring, animated, config } from 'react-spring'

export const Home = () => {
  const randomDuration1 = Math.floor(Math.random() * 500) + 1000;
  const randomDuration2 = Math.floor(Math.random() * 500) + 1000;
  const randomDuration3 = Math.floor(Math.random() * 500) + 1000;
  const scaleX = useSpring({
    loop: true,
    to: [
      { scaleX: 0.95 },
      { scaleX: 1 },
    ],
    from: { scaleX: 1 },
    config: { 
      duration: randomDuration1,
      mass: 17,
      tension: 234,
      velocity: -1
    },
  })
  const skewX1 = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: randomDuration2 },
  })
  const skewX2 = useSpring({
    loop: true,
    to: [
      { skewX: 20 },
      { skewX: 0.5 },
    ],
    from: { skewX: 0.5 },
    config: { duration: randomDuration3 },
  })
  return (
  <div>
      <animated.div style={scaleX}> 
        <h2> <a href="/u">⒰</a><Button size="small" color="secondary" variant="outlined">ữ</Button></h2>
      </animated.div>
      
      <h2><a style={{display: "inline-block"}} href="/organizations"><animated.div style={skewX1}><Button color="primary" variant="contained">ữ</Button>rganizations</animated.div></a> </h2>
      <h2><a style={{display: "inline-block"}} href="/products"><animated.div style={skewX2}>prod<Button variant="contained">ṵ</Button>cts</animated.div></a>  </h2>
  </div>
  )
};

export default Home;
