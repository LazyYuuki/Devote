import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

// =============================================================================
export default function HeaderBar(props) {
  return (
    <AppBar position="fixed"
      sx={theme => ({
        backgroundColor: "#79e7e7",
        minHeight: theme.mixins.toolbar.minHeight,
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Typography variant="h6" component="div"
        sx={{
          color: "#14044d"
        }}
      >
        {props.route}
      </Typography>
    </AppBar>
  )
}