export default function Button({ isOpen, onClick }) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
