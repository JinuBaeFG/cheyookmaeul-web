import { useState } from "react";

export default function Checkbox({
  id,
  children,
  disabled,
  checked,
  onChange,
}: any) {
  const [checkedBox, setCheckedBox] = useState(checked);
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checkedBox}
        onChange={() => {
          setCheckedBox(!checkedBox);
          onChange(id);
        }}
      />
      {children}
    </label>
  );
}
