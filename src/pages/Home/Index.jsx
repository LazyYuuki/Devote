import { Link } from "react-router-dom";


// =============================================================================
export default function Home() {
  return(
    <div>
      Home
      <br />
      <Link to="/vote">
        Vote
      </Link>
    </div>
  )
}