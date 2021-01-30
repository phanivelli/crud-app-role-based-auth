import React, { useEffect, useState } from "react";
import axios from "axios";
import { userService } from "../../services/user-service";
import authHeader from "../../services/auth-header";

const API = "http://15.206.118.222:5000/admin/department/update";

const EditDepartment = (props) => {
  const initUser = { id: "", name: "" };
  const [departmentName, setDepartment] = useState(initUser);

  //   const API_URL =
  //     "http://15.206.118.222:5000/admin/department/update"
  //     props.match.params.id;

  //   useEffect(() => {
  //     const GetData = async () => {
  //       const result = await axios(API_URL);
  //       setDepartment(result.data);
  //     };
  //     GetData();
  //   }, []);

  const handleChange = (e) => {
    e.persist();
    setDepartment({ ...departmentName, [e.target.name]: e.target.value });
  };

  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
  };
  const updateDepartment = (e) => {
    e.preventDefault();
    const data = { dId: props.match.params.id, name: departmentName.name };
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
      <button
        className="button-primary"
        type="submit"
        onClick={updateDepartment}
      >
        update
      </button>
    </form>
  );
};

export default EditDepartment;
