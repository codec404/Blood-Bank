import React from 'react'

//Accessing via props
const InputType = ({label,labelFor,inputType,name,value,onChange}) => {
  return (
    <>
      <div className="mb-1">
          <label htmlFor={labelFor} className="form-label">
            {label}
          </label>
          <input
            type={inputType}
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
    </>
  )
}

export default InputType
