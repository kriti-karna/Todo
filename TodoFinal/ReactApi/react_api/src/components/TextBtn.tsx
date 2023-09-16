interface Param {
  btnName: string;
  clickHandle: () => void;
}

function TextBtn({ btnName, clickHandle }: Param) {
  return (
    <button
      style={{ margin: "auto 10px" }}
      className="system-btn"
      onClick={clickHandle}
    >
      {btnName}
    </button>
  );
}
export default TextBtn;
