import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://15.206.118.222:5000/admin/auth/";

class AuthService {
  login(username, password) {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
    return axios
      .post(
        API_URL + "login",
        {
          username,
          password,
        },
        requestOptions
      )
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        if (response) {
          localStorage.setItem(
            "configData",
            JSON.parse(JSON.stringify(response.config.data))
          );
        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return user;
  }
}

export default new AuthService();
