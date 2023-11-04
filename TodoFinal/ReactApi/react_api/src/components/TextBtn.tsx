interface TextBtnProps {
  btnName: string;
  clickHandle: () => void;
}

function TextBtn({ btnName, clickHandle }: TextBtnProps) {
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
