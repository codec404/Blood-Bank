//Reusable Form
import { Link } from "react-router-dom"; // Does the same like <a> tag
import React, { useState } from "react";
import InputType from "./InputType";
import { handleLogin, handleReg } from "../../../services/authService";

const Form = ({ submitBtn, formTitle, formType }) => {
  //creating states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Donor");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <form className="card p-3"
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            handleReg(
              e,
              email,
              password,
              name,
              organizationName,
              role,
              hospitalName,
              address,
              website,
              phone
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            {/* Donor */}
            <input
              type="radio"
              className="form-check-input"
              id="donorRadio"
              name="role"
              value={"Donor"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donorRadio" className="form-check-label">
              Donor
            </label>
          </div>
          {/* Admin */}
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              id="adminRadio"
              name="role"
              value={"Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              id="hospitalRadio"
              name="role"
              value={"Hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input "
              id="organizationRadio"
              name="role"
              value={"Organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organizationRadio" className="form-check-label">
              Organization
            </label>
          </div>
        </div>
        {/* conditional rendering */}
        {/* return switch */}
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    label={"Email Address"}
                    name={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    label={"Password"}
                    name={"password"}
                    labelFor={"forEmail"}
                    inputType={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
              break;
            }
            case formType === "register": {
              return (
                <>
                  {/* Omly Show name in donor and admin role */}
                  {(role === "Admin" || role === "Donor") && (
                    <InputType
                      label={"Name"}
                      name={"name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {/* Only for organization role */}
                  {role === "Organization" && (
                    <InputType
                      label={"Organization Name"}
                      name={"organizationName"}
                      labelFor={"forOrganizationName"}
                      inputType={"text"}
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  )}
                  {/* Only for Hospitals */}
                  {role === "Hospital" && (
                    <InputType
                      label={"Hospital Name"}
                      name={"hospitalName"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}
                  <InputType
                    label={"Email Address"}
                    name={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    label={"Phone"}
                    name={"phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <InputType
                    label={"Address"}
                    name={"address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    label={"Website"}
                    name={"website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    label={"Password"}
                    name={"password"}
                    labelFor={"forEmail"}
                    inputType={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
              break;
            }
            default:
              break;
          }
        })()}
        <div className="d-flex flex-row justify-content-between">
          <div>
            {formType === "login" ? (
              <p>
                Not registered yet ? <Link to="/register"> Register</Link>
              </p>
            ) : (
              <p>
                Already registered ? <Link to="/login"> Login</Link>
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            {submitBtn}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
