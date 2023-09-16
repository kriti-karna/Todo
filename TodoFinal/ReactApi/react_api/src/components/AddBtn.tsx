interface Param {
  btnClickEvent: () => void;
}

function AddBtn({ btnClickEvent }: Param) {
  return (
    <button id="add-btn" className="add-btn" onClick={btnClickEvent}>
      +
    </button>
  );
}

export default AddBtn;
