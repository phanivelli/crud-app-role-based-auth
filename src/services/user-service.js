import { handleResponse } from "../helpers/handle-response";
import authHeader from "./auth-header";
import axios from "axios";

const BASE_URL = "http://15.206.118.222:5000/admin/department/";

function getList() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    BASE_URL + `list?role=1&limit=10&offset=0&filter=41`,
    requestOptions
  ).then(handleResponse);
}

export const userService = { getList };
