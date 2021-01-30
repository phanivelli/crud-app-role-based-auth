import {
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import React from "react";
import _ from "lodash";
import { userService } from "../../services/user-service";
import { Link } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/auth-header";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: "",
      displaydept: "",
    };
  }
  handleChange = (e) => {
    let input = e.target.value.toLowerCase();
    this.setDisplayedContacts(input);
  };

  async componentDidMount() {
    await userService
      .getList()
      .then((users) => this.setState({ users: users.data.rows }));

    this.setDisplayedContacts = _.debounce(async (query) => {
      await userService.getList().then((users) =>
        this.setState({
          users: users.data.rows.filter((x) => x.name.toLowerCase() == query),
        })
      );
    }, 1000);
  }
  editDepartment = (id) => {
    this.props.history.push({
      pathname: "/edit/" + id,
    });
  };
  deleteDepartment = (id) => {
    console.log(this.state.users);
    this.setState({
      users: this.state.users.filter((data) => data.id !== id),
    });
    // const requestOptions = {
    //   method: "DELETE",
    //   headers: authHeader(),
    // };
    // axios
    //   .delete(
    //     "http://15.206.118.222:5000/admin/department/update?id=" + id,
    //     requestOptions
    //   )
    //   .then((result) => {
    //     this.props.history.push("/dashboard");
    //   });
  };
  logout = () => {
    localStorage.removeItem("user");
    this.props.history.push("/");
  };
  render() {
    const { users } = this.state;
    const configData = JSON.parse(localStorage.getItem("configData"));
    return (
      <>
        <div>
          <Button
            onClick={() => {
              this.logout();
            }}
          >
            Logout
          </Button>
          {configData.username.split("@hrvite.com")[0] === "admin" ||
          configData.username.split("@hrvite.com")[0] === "manager" ? (
            <Button>
              <Link to="/add-department">Add</Link>
            </Button>
          ) : null}
        </div>
        <input
          type="text"
          className="search-field"
          onChange={this.handleChange}
        />
        <TableContainer component={Paper}>
          <Table
            // className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Status</TableCell>
                {configData.username.split("@hrvite.com")[0] === "admin" ||
                configData.username.split("@hrvite.com")[0] === "manager" ? (
                  <TableCell align="right">Actions</TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {_.reverse(users || []).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  {configData.username.split("@hrvite.com")[0] === "admin" ||
                  configData.username.split("@hrvite.com")[0] === "manager" ? (
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          this.editDepartment(row.id);
                        }}
                      >
                        Edit
                      </Button>
                      {!configData.username.split("@hrvite.com")[0] ===
                        "manager" ||
                      configData.username.split("@hrvite.com")[0] ===
                        "admin" ? (
                        <Button
                          onClick={() => {
                            this.deleteDepartment(row.id);
                          }}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
