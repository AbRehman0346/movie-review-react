import ReactPlayer from "react-player";
function player(link, controls = true) {
  if (link.length !== 0) return <ReactPlayer url={link} controls={controls} />;
  return null;
}

export default player;
