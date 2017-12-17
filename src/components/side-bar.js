
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { Route, Link } from 'react-router-dom';

const drawerWidth = 240;
const styles = theme => ({
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  middleIcon: {
    fontSize: '2.6rem'
  },
  active: {
    color: theme.palette.primary[500],
    '& h3':{
      color: theme.palette.primary[500],
      fontWeight: 'bold'
    },
    '& p':{
      color: theme.palette.primary[500],
    }
  },
  inActive: {
    color: 'grey'
  },
  menuLink: {
    display: 'block',
    padding: '12px',
    width: '100%',
    transition: 'all .5s'
  },
  inline: {
    display: 'inline-block'
  },
  menuItem: {
    padding: 0
  }
});

const maptMenuList = classes => arr => {
  return arr.map((item, index) => (
    <ListItem button key={index} className={classes.menuItem}>
      <Link to={item.route} className={classes.menuLink}>
        <Route path={item.route} exact={true} children={({ match }) => (
          <div className={match ? classes.active : classes.inActive}>
            <i className={classNames("material-icons", classes.middleIcon)}>{item.icon}</i>
            <ListItemText className={classes.inline} primary={item.title} secondary="Jan 28, 2014" />
          </div>
        )}/>
      </Link>
    </ListItem>
  ))
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.menuArr = [{
      title: 'issues',
      icon: 'list',
      route: '/backstage/issue'
    }, {
      title: 'folders',
      icon: 'folder',
      route: '/backstage/folder'
    }]
  }
  render() {
    const { classes, theme } = this.props;
    const getMenuList = maptMenuList(classes)
    return (
      <Drawer
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}>
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          {getMenuList(this.menuArr)}
        </List>
        <Divider />
        <List className={classes.list}>{[4,5,6]}</List>
      </div>
    </Drawer>
    )
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool
};
export default withStyles(styles, { withTheme: true })(SideBar);
