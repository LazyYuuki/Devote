import React from 'react';
import Box from "@mui/material/Box";

import Home from "pages/Home/Index";
import Account from "pages/Account/Index";
import Past from "pages/Past/Index";
import AppBar from 'components/AppBar';
import HeaderBar from 'components/HeaderBar';

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

  const [value, setValue] = React.useState(0);

  return (
    <div>
      <HeaderBar route={ROUTES[value]} />
      <Box sx={theme => ({ minHeight: theme.mixins.toolbar.minHeight })} />

      {PAGES[value]}

      <div style={{ height: 56 }} />

      <AppBar
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
