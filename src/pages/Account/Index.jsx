import React from 'react';
import { Link } from "react-router-dom";
import web3 from "web3";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import InfoBox from "pages/Account/InfoBox";

// =============================================================================


// =============================================================================
export default function Account() {

  const [address, setAddress] = React.useState(null)
  const [balance, setBalance] = React.useState(null)

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

      <div style={{textAlign: 'center'}}>
        <Button
          variant="outlined"
          disabled={address}
          onClick={() => getWalletInfo()}
          sx={{
            color: "#948afa",
            borderColor: "#948afa",
            ":hover": {
              borderColor: "#1b1557"
            }
          }}
        >
          {address ? "Metamask connected" : "Connect MetaMask"}
        </Button>
      </div>

    </div>
  )

  async function getWalletInfo() {
    let account = await window.ethereum.request({method:'eth_requestAccounts'})
    let balance = await window.ethereum.request({
      method:'eth_getBalance',
      params: [account[0], 'latest']
    }).then(res => {
      let wei = web3.utils.hexToNumberString(res)
      let ether = web3.utils.fromWei(wei, 'ether')
      return ether
    })

    setAddress(account)
    setBalance(balance)
  }
}