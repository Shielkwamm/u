import { useUser } from "~/components/user/hooks";
import Layout from "~/components/user/layout";
import { useState } from "react"
import { getAllUs } from "../lib/u_Utils";
import { useSpring, animated, config } from 'react-spring'
import { Typography } from "@material-ui/core";

const U = () => {
  return (
    <Layout>
      <Scrolling/>
      <hr/>
      <h1>ṻ</h1>
      <Typography>ṵṷṹṻụủứừ⒰υṳ</Typography>
      <hr/>
      <h1>ự</h1>
      <Typography>ỤỦỨỪỬῢΰῦṺṴUὺ</Typography>
      <hr/>
      <h1>Ṹ</h1>
      <Typography>ῧuṲỮỰṶṸύῠῡ</Typography>
      <hr/>
      <h1>ὺ</h1>
      <Typography>ửữựὐὑὒὓὔὕὖὗ</Typography>
      <hr/>
      <Scrolling/>
    </Layout>
  );
};

export default U;

function Scrolling() {
  const [flip, set] = useState(false)

  const words = getAllUs().split("");

  const { scroll } = useSpring({
    scroll: (words.length - 1) * 50,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  })

  return (
    <animated.div
      style={{
        position: 'relative',
        //width: '100%',
        height: 60,
        overflow: 'hidden',
        fontSize: '2.5em',
      }}
      scrollTop={scroll}>
      {words.map((word, i) => (
        <div
          key={`${word}_${i}`}
          style={{  height: 50, textAlign: 'center' }}>
          {word}
        </div>
      ))}
    </animated.div>
  )
}
