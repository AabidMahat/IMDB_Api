import { BallTriangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div style={styles.container}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#3498db"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
const styles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
