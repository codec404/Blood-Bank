import { userLogin, userRegister } from "../redux/Features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if(!role || !email || !password){
        return alert("Please provide all the credentials")
    }
    store.dispatch(userLogin({email,password,role}))
  } catch (error) {
    console.log(error);
  }
};

export const handleReg = (
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
) => {
  e.preventDefault();
  try {
    store.dispatch(userRegister({email,
      password,
      name,
      organizationName,
      role,
      hospitalName,
      address,
      website,
      phone}))
  } catch (error) {
    console.log(error);
  }
};
