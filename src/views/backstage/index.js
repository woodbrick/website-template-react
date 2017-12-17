import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import { Route } from 'react-router-dom'
import SideBar from '../../components/side-bar'
import Issue from './issue'

const drawerWidth = 240
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  }
})

class Folder extends React.Component {
  render() {
    return <div> folder </div>
  }
}

class Backstage extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                <MenuIcon className={classes.middleIcon} />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Backstage For Auto template
              </Typography>
            </Toolbar>
          </AppBar>
          <SideBar open={this.state.open} handleDrawerClose={this.handleDrawerClose}/>
          <main className={classes.content}>
            <Route path="/backstage/issue" component={Issue}/>
            <Route path="/backstage/folder" component={Folder}/>
          </main>
        </div>
      </div>
    )
  }
}

Backstage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Backstage)
