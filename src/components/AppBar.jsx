import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import PollIcon from '@mui/icons-material/Poll';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// =============================================================================
export default function Appbar(props) {

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}>
      <BottomNavigation
        value={props.value}
        onChange={props.onChange}
        sx={{
          backgroundColor: '#79e7e7',
        }}
      >
        <BottomNavigationAction label="Past Topics" icon={<PollIcon />} />
        <BottomNavigationAction label="Active Topics" icon={<HowToVoteIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  )
}