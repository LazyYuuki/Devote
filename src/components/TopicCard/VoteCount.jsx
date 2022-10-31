import React from 'react';
import Typography from "@mui/material/Typography";

import AddressContext from "components/Context";
import {getVoteValue} from "contracts/utils";

// =============================================================================
export default function VoteCount(props) {

  const address = React.useContext(AddressContext)
  const [voteValue, setVoteValue,] = React.useState({})

  React.useEffect(() => {
    getVoteValue(props.policyID).then(res => {
      const {
        totalValue,
        positive,
        negative
      } = res
      setVoteValue({
        totalValue,
        positive,
        negative
      })
    })
  }, [])

  return(
    <div style={{
      display: 'flex', 
      justifyContent: 'space-between',
      marginTop: 16,
    }}>
      <Typography variant="subtitle2">
        Your "for" vote: {voteValue.positive}
      </Typography>
      <Typography variant="subtitle2">
        Your "against" vote: {voteValue.negative}
      </Typography>
    </div>
  )
}