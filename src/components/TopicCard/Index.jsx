import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TopicCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
      maxWidth: 300, 
      margin: 'auto',
      borderRadius: 8,
    }}>
      <CardHeader
        title={props.title}
        titleTypographyProps={{
          variant: "h6"
        }}
        subheader={"By " + props.author}
        sx={{
          background: "#8ef1f7"        
        }}
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
      </CardContent>

      <CardActions disableSpacing>
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
          <></>
          :
          <>
            <Tooltip title="For" placement="top">
              <IconButton aria-label="open full link">
                <CheckCircleOutlinedIcon 
                  fontSize="large"
                  sx={{color: "green"}}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Against" placement="top">
              <IconButton aria-label="open full link">
                <CancelOutlinedIcon 
                  fontSize="large"
                  sx={{color: "red"}}
                />
              </IconButton>
            </Tooltip>
          </>
        }
      </CardActions>

    </Card>
  );
}
