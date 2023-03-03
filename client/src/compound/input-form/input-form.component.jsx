import React from "react";
import './form-input.styles.css';

const FormInput = ({ handleChange, label, ...otherProps}) => (
    <div>
        <input
            className="form-input"
            // onChange={handlechange}
            // { ...otherProps }
        />
        <label>label</label>
    </div>
)

export default FormInput;