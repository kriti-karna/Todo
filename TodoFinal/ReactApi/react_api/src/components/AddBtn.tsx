interface Param {
  onClick: () => void;
}

function AddBtn({ onClick }: Param) {
  return (
    <button id="add-btn" className="add-btn" onClick={onClick}>
      +
    </button>
  );
}

export default AddBtn;
