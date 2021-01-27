import React from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import FriendList from "../Components/FriendsList";
// MUI Core
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class FriendsForm extends React.Component {
  state = {
    friend: {
      id: Date.now(),
      name: "",
      email: "",
      age: "",
    },
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      friend: {
        ...this.state.friend,
        [name]: value,
      },
    });
  };

  addFriend = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", this.state.friend)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      friend: {
        id: Date.now(),
        name: "",
        email: "",
        age: "",
      },
    });
  };

  render() {
    return (
      <Container maxWidth="xs">
        <form onSubmit={this.addFriend}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={this.state.friend.name}
                    onChange={this.handleChange}
                    label="Name"
                    name="name"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={this.state.friend.email}
                    onChange={this.handleChange}
                    label="Email"
                    name="email"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    value={this.state.friend.age}
                    onChange={this.handleChange}
                    label="Age"
                    name="age"
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
              >
                Submit Friend
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid>
          <FriendList />
        </Grid>
      </Container>
    );
  }
}

export default FriendsForm;
