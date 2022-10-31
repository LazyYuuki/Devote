import React from 'react';
import moment from "moment";
import Typography from '@mui/material/Typography';

// =============================================================================
export default function Timer(props) {

  const [timer, setTimer] = React.useState(0)
  const startTime = moment.unix(props.startTime).format('HH:mm:ss, MMMM Do YYYY')
  const endTime = moment.unix(parseInt(props.startTime)+parseInt(props.duration)).format('HH:mm:ss, MMMM Do YYYY')

  React.useEffect(() => {
    const endTime = parseInt(props.startTime) + parseInt(props.duration)
    const end = moment.unix(endTime)
    const now = moment()
    const diff = now.diff(end, "seconds")
    const timerCount = setInterval(() => setTimer(diff),1000)
    return () => clearInterval(timerCount)
  }, [timer, props.startTime, props.duration])

  return (
    <div>
      <Typography variant="body1" 
        style={{
          backgroundColor: "lightgreen",
          padding: 8,
        }}
      >
        Start: {startTime}
      </Typography>
      <Typography variant="body1" 
        style={{
          backgroundColor: "pink",
          padding: 8,
        }}
      >
        End: {endTime}
      </Typography>
    </div>
  )

  // function pad(num) {
  //   return ("0"+num).slice(-2);
  // }

  // function hhmmss(secs) {
  //   var minutes = Math.floor(secs / 60);
  //   secs = secs%60;
  //   var hours = Math.floor(minutes/60)
  //   minutes = minutes%60;
  //   return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  // }
}