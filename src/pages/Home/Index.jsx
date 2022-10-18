import React from 'react';
import TopicCard from "components/TopicCard/Index";

// =============================================================================
const FAKE_DATA = {
  title: "Minim ut cillum amet amet officia aute occaecat voluptate labore Lorem.",
  author: "John Doe",
  description: "Magna dolor excepteur laboris anim ut dolor ut velit incididunt nisi id aliqua. Esse eiusmod qui veniam laboris do cupidatat cillum consectetur. Ut sint elit id nostrud velit commodo tempor deserunt laboris exercitation. In Lorem cillum veniam anim occaecat cillum aliquip cupidatat consequat eiusmod est nostrud laborum. Quis mollit sunt velit excepteur tempor magna commodo nostrud voluptate deserunt. Minim reprehenderit et ullamco pariatur eu veniam officia excepteur reprehenderit. Minim dolor aliqua sit ad velit elit excepteur fugiat. Duis laboris exercitation exercitation eu exercitation mollit et qui est non in irure velit dolor proident.",
  link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  startTime: "10/10/2022",
}

// =============================================================================
export default function Home() {

  return(
    <div style={{positoin: "relative"}}>
      {[0,1,2].map((val, index) =>
        <div key={index} style={{margin: "24px 0"}}>
          <TopicCard 
            title ={FAKE_DATA.title}
            author={FAKE_DATA.author}
            description={FAKE_DATA.description}
            link={FAKE_DATA.link}
            startTime={FAKE_DATA.startTime}
          />
        </div>
      )}     
    </div>
  )

}