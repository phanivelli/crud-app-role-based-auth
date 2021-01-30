import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, Card } from "@material-ui/core";
import AuthService from "../../services/auth-service";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    width: 275,
    textAlign: "center",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await AuthService.login(username, password).then(() => {
        props.history.push("/department-list");
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Card className={classes.root}>
      <form className={classes.margin} onSubmit={handleSubmit}>
        <TextField
          className={classes.margin}
          id="input-with-icon-textfield"
          label="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          htmlFor="standard-adornment-password"
          className={classes.margin}
          id="standard-adornment-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <Button size="small" type="submit">
          Login
        </Button>
      </form>
    </Card>
  );
}
