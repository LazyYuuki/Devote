import * as React from 'react';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Action from "components/TopicCard/Action";
import Timer from "components/TopicCard/Timer";
import VoteCount from "components/TopicCard/VoteCount";
import AddressContext from "components/Context";
import { endPolicy, withdrawBid } from "contracts/utils";

export default function TopicCard(props) {

  const address = React.useContext(AddressContext)
  const handlePolicy = () => endPolicy(address, props.id)
  const handleWithdraw = () => withdrawBid(address, props.id)

  return (
    <Card sx={{ 
      maxWidth: 300, 
      margin: 'auto',
      borderRadius: 8,
    }}>
      <CardHeader
        title={"ID " + props.id + ": " + props.title}
        titleTypographyProps={{
          variant: "h6"
        }}
        subheader={"By " + props.author}
        sx={{
          background: "#8ef1f7"        
        }}
      />

      <Timer 
        startTime={props.startTime}
        duration={props.duration}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"
          sx={{fontWeight: "bold"}}
        >
          Brief Description:
        </Typography>
        <br/>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <VoteCount policyID={props.id}/>
      </CardContent>

      <CardActions disableSpacing>
        <Action 
          policyID={props.id}
          link={props.link}
          disableVote={props.disableVote}
        />
      </CardActions>

      <div style={{
        textAlign: "center",
        marginBottom: 16
      }}>
        {
          props.disableEndPolicy ?
          <>
            <Typography variant="h6">
              {props.result}
            </Typography>
            <Button
              disabled={parseInt(props.startTime) + parseInt(props.duration) > moment().unix()}
              onClick={handleWithdraw}
              variant="outlined"
              sx={{
                color: "#948afa",
                borderColor: "#948afa",
                ":hover": {
                  borderColor: "#1b1557"
                }
              }}
            >
              Withdraw Bid
            </Button>
          </>
          :
          <Button
            disabled={parseInt(props.startTime) + parseInt(props.duration) > moment().unix()}
            onClick={handlePolicy}
            variant="outlined"
            sx={{
              color: "#948afa",
              borderColor: "#948afa",
              ":hover": {
                borderColor: "#1b1557"
              }
            }}
          >
            End Policy
          </Button>
        }
      </div>

    </Card>
  );
  
}
