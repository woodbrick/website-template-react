
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SvgIcon from 'material-ui/SvgIcon';


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
    width: 36,
    height: 36,
  },
  active: {
    color: theme.palette.primary[500]
  },
  inActive: {
    color: 'grey'
  },
  block: {
    display: 'block'
  },
  inline: {
    display: 'inline-block'
  }
});
const HomeIcon = props => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);
const maptMenuList = route => classes => arr => {
  return arr.map((item, index) => {
    return (
      <ListItem button key={index}>
        <Route path={item.route} exact={true} children={({ match }) => (
          <div className={match ? classes.active : classes.inActive}>
            <Link to={item.route} className={classes.block}>
              <HomeIcon className={classNames(classes.middleIcon, match ? classes.active : classes.inActive)}>{item.icon}</HomeIcon>
              <ListItemText className={classes.inline} primary={item.title} secondary="Jan 28, 2014" />
            </Link>
          </div>
        )}/>
      </ListItem>
    )
  })
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
    console.log('Router', Router)
    console.log('Route', Route)
    const { classes, theme } = this.props;
    const getMenuList = maptMenuList(Router.route)(classes)
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
};
export default withStyles(styles, { withTheme: true })(SideBar);
