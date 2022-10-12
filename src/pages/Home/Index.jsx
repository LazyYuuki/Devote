import React from 'react';
import { Link } from "react-router-dom";
import web3 from "web3";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// =============================================================================
export default function Home() {

  const [address, setAddress] = React.useState(null)
  const [balance, setBalance] = React.useState(null)

  return(
    <div>
      Home
      <br/>
      <Button
        onClick={() => getWalletInfo()}
        disabled={address ? true : false}
      >
        {address ? "Wallet Connected" : "Connect Metamask Wallet"}
      </Button>

      <Typography>
        Address: {address}
      </Typography>

      <Typography>
        Balance: {balance}
      </Typography>


      <br />
      <Link to="/vote">
        Vote
      </Link>
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