import React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import {createPolicy} from "contracts/utils";
import AddressContext from "components/Context";


// =============================================================================
export default function PolicyBox(props) {

  const address = React.useContext(AddressContext)

  const handleSubmit = event => {
    event.preventDefault()
    const title = event.target.title.value
    const description = event.target.description.value
    const author = event.target.author.value
    const link = event.target.link.value
    const duration = event.target.duration.value

    createPolicy(
      address,
      title,
      description,
      author,
      link,
      duration
    )
  }

  return(
    <Paper style={{
      width: "80%",
      margin: "auto",
      backgroundColor: "#948afa",
      padding: 16,
      borderRadius: 8,
    }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" sx={{color: "white"}}>
          Create new policy
        </Typography>

        <div style={{height: 24}}/>
        <CustomTextField
          id="title"
          label="Title"
          placeholder="Title"
        />
        <CustomTextField
          id="description"
          label="Description"
          placeholder="Description"
        />
        <CustomTextField
          id="author"
          label="Author"
          placeholder="Author of policy"
        />
        <CustomTextField
          id="link"
          label="Link"
          placeholder="Link to full policy"
        />
        <CustomTextField
          id="duration"
          label="Duration"
          placeholder="Duration in second"
        />

        <div style={{textAlign: 'center', marginTop: 16}}>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              ":hover": {
                borderColor: "white"
              }
            }}
          >
            Create Policy
          </Button>
        </div>

      </Box>
    </Paper>
  )
}

// =============================================================================
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: "white",
    borderColor: "white",
    '&:focus': {
      borderColor: "white"
    }
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      color: 'white'
    },
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  width: '100%',
  margin: '8px auto',
})