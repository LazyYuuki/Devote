import Typography from "@mui/material/Typography";

// =============================================================================
export default function InfoBox(props) {
  return(
    <div>
      <Typography variant="h6"
        sx={{
          color: "white",
        }}
      >
        {props.title}
      </Typography>
      
      <div style={{
        backgroundColor: "#bdbfc1",
        padding: 16,
        borderRadius: 8,
      }}>
        <Typography variant="body1"
          sx={{
            wordWrap: "break-word"
          }}
        >
          {props.content}
        </Typography>
      </div>
    </div>
  )
}