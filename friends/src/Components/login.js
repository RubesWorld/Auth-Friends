import React from "react";
import axios from "axios";
// MUI Core
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      credentials: {
        ...this.state.credentials,
        [name]: value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", this.state.credentials)
      .then((res) => {
        console.log(res.data.payload);
        //set Token to local Storage
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/FriendsForm");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container maxWidth="xs">
        <form onSubmit={this.login}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                    label="username"
                    name="username"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    label="Password"
                    name="password"
                    size="small"
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default Login;
