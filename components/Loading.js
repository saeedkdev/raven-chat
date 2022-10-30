import { Circle } from 'better-react-spinkit';

function Loading() {
  return (
	  <center style={{ display: "grid", placeItems: "center", height:"100vh" }}>
		<div>
		  <img src="raven.png" alt="loading" height={200} style={{ marginBottom: 10 }} />
		  <Circle color="#5585d4" size={60} />
		</div>
	  </center>
  );
}

export default Loading;
