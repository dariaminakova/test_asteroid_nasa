import React, { Component } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { asteriodAPI } from "./api/api";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    maxWidth: 700,
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asteriod_id: "",
      answer: "",
      list_asteroids: "",
      open: false,
    };
  }

  submitCurrentAsteroid = async (e) => {
    e.preventDefault();
    const result = await asteriodAPI.getCurrentAsteroid(this.state.asteriod_id);
    this.setState({ answer: result, open: true });
    console.log(this.state.answer);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (e) => {
    this.setState({ asteriod_id: e.target.value });
  };

  selectRandom = async () => {
    const answer = await asteriodAPI.getRandomAsteroid();
    this.setState({ list_asteroids: answer });
  };

  render() {
    const { classes } = this.props;
    const { near_earth_objects } = this.state.list_asteroids;

    return (
      <div className="App">
        <form
          className={classes.container}
          noValidate
          onSubmit={this.submitCurrentAsteroid}
        >
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={this.state.asteriod_id}
            onChange={(e) => this.handleChange(e)}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!this.state.asteriod_id}
          >
            Send
          </Button>
        </form>
        <Button
          onClick={this.selectRandom}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Random Asteroid
        </Button>
        {this.state.list_asteroids && (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {near_earth_objects.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Here is an information about Asteroid you are looking for
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <strong>NAME</strong>
              <div>{this.state.answer.name}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back to Search
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(App);
