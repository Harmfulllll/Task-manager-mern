import React, { useId } from "react";
import "./input.css";

function Input({ label, type = "text", ...props }, ref) {
  const id = useId();
  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      {
        <input
          className="inputVal"
          id={id}
          ref={ref}
          type={type}
          {...props}
        ></input>
      }
    </div>
  );
}

export default React.forwardRef(Input);
