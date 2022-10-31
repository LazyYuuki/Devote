import React from 'react';
import web3 from "web3";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import InfoBox from "pages/Account/InfoBox";
import PolicyBox from "pages/Account/PolicyBox";
import AddressContext from "components/Context";

// =============================================================================


// =============================================================================
export default function UserAccount() {

  const address = React.useContext(AddressContext)
  const [balance, setBalance] = React.useState(null)
  getBallance()

  return(
    <div>

      <div style={{height: 32}}/>

      <Paper style={{
        width: "80%",
        margin: "auto",
        backgroundColor: "#948afa",
        padding: 16,
        borderRadius: 8,
      }}>
        <InfoBox 
          title="Address"
          content={address}
        />
        <br/>
        <InfoBox 
          title="Tokens"
          content={balance}
        />
      </Paper>

      <div style={{height: 24}}/>
  
      <PolicyBox />

    </div>
  )

  async function getBallance() {
    let balance = await window.ethereum.request({
      method:'eth_getBalance',
      params: [address[0], 'latest']
    }).then(res => {
      let wei = web3.utils.hexToNumberString(res)
      let ether = web3.utils.fromWei(wei, 'ether')
      return ether
    })

    setBalance(balance)
  }
}