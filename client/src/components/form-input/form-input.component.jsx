import React from "react";
import "./form-input-styles.scss";

export const FormInput = ({
  label,
  onChange,
  margin = false,
  ...otherProps
}) => (
  <div className="group">
    <input
      style={margin ? { margin: "0px" } : {}}
      className="form-input"
      onChange={onChange}
      {...otherProps}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
