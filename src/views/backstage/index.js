import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {MenuItem, MenuList} from 'material-ui/Menu';

const theme = createMuiTheme()
const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  contentBox: {
    display: 'flex'
  }
};

class Backstage extends Component {
  constructor(props) {
    super(props)
    this.switchMenu = this.switchMenu.bind(this)
  }
  state = {
    displayMenu: false,
  }
  switchMenu() {
    this.setState({displayMenu: !this.state.displayMenu})
  }
  render () {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu"
              onClick={this.switchMenu}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Title
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.contentBox}>
          <Paper>
            <MenuList
              id="menu-appbar"
              open={this.state.displayMenu}
            >
              <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
            </MenuList>
          </Paper>
          <div className="content">
            content
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
Backstage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Backstage);
