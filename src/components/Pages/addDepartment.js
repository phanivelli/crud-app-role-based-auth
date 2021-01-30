import React, { useState } from "react";
import axios from "axios";
import { userService } from "../../services/user-service";
import authHeader from "../../services/auth-header";

const API = "http://15.206.118.222:5000/admin/department/add";

const AddDepartmentForm = (props) => {
  const initUser = { name: "" };
  const [departmentName, setDepartment] = useState(initUser);
  const handleChange = (e) => {
    e.persist();
    setDepartment({ ...departmentName, [e.target.name]: e.target.value });
  };

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: departmentName.name };
    axios.post(API, data, requestOptions).then((result) => {
      props.history.push("/department-list");
    });
  };

  return (
    <form>
      <label>Name</label>
      <input
        className="u-full-width"
        type="text"
        value={departmentName.name}
        name="name"
        onChange={handleChange}
      />
      <button className="button-primary" type="submit" onClick={handleSubmit}>
        Add user
      </button>
    </form>
  );
};

export default AddDepartmentForm;
