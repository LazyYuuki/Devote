import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Home from "pages/Home/Index";
import Account from "pages/Account/Index";
import Past from "pages/Past/Index";
import AppBar from 'components/AppBar';
import HeaderBar from 'components/HeaderBar';
import AddressContext from "components/Context";

// =============================================================================
const PAGES = [
  <Past />,
  <Home />,
  <Account />,
]

const ROUTES = [
  "Past Topics",
  "Active Topics",
  "Account"
]

// =============================================================================
export default function App() {

  const [value, setValue] = React.useState(1);
  const [address, setAddress] = React.useState(null)

  return (
    <AddressContext.Provider value={address}>
      <div>
        <HeaderBar route={ROUTES[value]} />
        <Box sx={theme => ({ minHeight: theme.mixins.toolbar.minHeight })} />
        {
          address ?
            <>
              {PAGES[value]}
            </> :
            <Paper
              style={{
                width: "60%",
                margin: "32px auto",
                padding: 16,
              }}
            >
              <Typography variant="h6">
                Welcome to Devote
              </Typography>

              <div style={{ height: 16 }} />
              <Typography variant="body1">
                This is a demo voting platform for EE4032 Blockchain module in NUS.
                To use this demo, please first connect your metamask to the website to proceed.
                We hope this demo help you learn more about blockchain application.
              </Typography>

              <div style={{ height: 16 }} />
              <div style={{ textAlign: 'center' }}>
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
            </Paper>
        }
        <div style={{ height: 56 }} />
        <AppBar
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </AddressContext.Provider>
  )

  async function getWalletInfo() {
    let address = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAddress(address)
  }
}
