import React from "react";
import axiosWithAuth from "../util/axiosWithAuth";

//Material Core imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class FriendsList extends React.Component {
  state = {
    friends: [],
  };

  componentDidMount() {
    this.getFriends();
  }

  componentDidUpdate() {
    this.getFriends();
  }

  getFriends = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  render() {
    return (
      <>
        <Grid container>
          {this.state.friends.map((friend, i) => {
            return (
              <Grid item key={i}>
                <Typography textAlign="left" variant="h4">
                  {friend.name}
                </Typography>
                <Typography variant="h4">{friend.age}</Typography>
                <Typography variant="h4">{friend.email}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default FriendsList;
