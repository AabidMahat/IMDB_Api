export default function Error({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}
