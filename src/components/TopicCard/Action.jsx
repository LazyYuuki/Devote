import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { vote } from "contracts/utils";
import AddressContext from "components/Context";

// =============================================================================
export default function Action(props) {

  const address = React.useContext(AddressContext)
  const [option, setOpiton] = React.useState(0)
  const [open, setOpen] = React.useState(false);
  const handleOpen = (opt) => {
    setOpen(true)
    setOpiton(opt)
  };
  const handleClose = () => setOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const bid = event.target.bid.value
    vote(
      address,
      props.policyID,
      option,
      bid
    )
  }

  return (
    <>
      <Tooltip title="Full link to policy" placement="top">
        <IconButton aria-label="open full link"
          href={props.link}
          target="_blank"
          rel="noopener"
        >
          <InsertLinkIcon />
        </IconButton>
      </Tooltip>

      <div style={{flex: 1}}/>

      {
        props.disableVote ? 
        null
        :

        <>
          <Tooltip title="For" placement="top">
            <IconButton onClick={()=> handleOpen(1)}>
              <CheckCircleOutlinedIcon 
                fontSize="large"
                sx={{color: "green"}}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Against" placement="top">
            <IconButton onClick={()=> handleOpen(0)}>
              <CancelOutlinedIcon 
                fontSize="large"
                sx={{color: "red"}}
              />
            </IconButton>
          </Tooltip>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box 
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              style={{
                width: "60%",
                backgroundColor: "white",
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid #000',
                borderRadius: 24,
                padding: 16,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2">
                You are voting <u>{option ? "for" : "against"}</u> this policy
              </Typography>
              <div style={{height: 16}}/>
              <TextField
                id="bid"
                label="Amount"
                placeholder="Enter your bid amount"
                sx={{width: "100%"}}
              />
              <div style={{height: 16}}/>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  color: "#948afa",
                  borderColor: "#948afa",
                  ":hover": {
                    borderColor: "#1b1557"
                  }
                }}
              >
                Send Bid
              </Button>
            </Box>
          </Modal>
        </>

      }
    </>
  )
}