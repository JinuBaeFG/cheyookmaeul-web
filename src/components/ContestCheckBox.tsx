import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

const ContestCheckBox = ({ id, onCheck, checked }) => {
  const [_checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);
  const toggleCheck = () => {
    setChecked(!_checked);
    onCheck && onCheck(!_checked, id);
  };

  return (
    <div
      className="checkBox"
      style={{
        backgroundColor: _checked ? "#546A78" : "#ffffff",
        borderWidth: 1,
        border: "1px solid #546A78",
        width: 16,
        height: 16,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={toggleCheck}
    >
      {_checked && <BiCheck size={16} color="#fff" />}
    </div>
  );
};

export default ContestCheckBox;
