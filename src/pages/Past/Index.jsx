import React from 'react';
import TopicCard from "components/TopicCard/Index";

import { getAllPolicy } from "contracts/utils";

// =============================================================================
export default function Past() {

  const [policyList, setPolicyList] = React.useState(false)

  React.useEffect(() => {
    getAllPolicy().then(res =>
      setPolicyList(res)
    )
  }, [setPolicyList])

  return(
    <div style={{positoin: "relative"}}>
      {
        policyList ?
        policyList.map((policy, index) =>
          <div key={index} style={{margin: "24px 0"}}>
            {
              policy.ended ?
              <TopicCard 
                {...policy}
                disableVote
                disableEndPolicy
              /> : null
            }
          </div>
        ) 
        : <div>Loading data...</div>
      }     
    </div>
  )


}