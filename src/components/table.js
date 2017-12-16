import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const getTableRowData = cols => row =>
  cols.map(c => (
    {title: row[c.prop], numeric: c.numeric}
  ))

function BasicCells(props) {
  return (
    props.cols.map((item, i) => 
      <TableCell numeric={item.numeric} key={i}>{item.title}</TableCell>)
  )
}

BasicRows.propTypes = {
  cols: PropTypes.array.isRequired
}

function BasicRows(props) {
  let mapRow = getTableRowData(props.cols)
  return (
    props.rows.map(row => 
      <TableRow key={row.id}>
        <BasicCells cols={mapRow(row)} />
      </TableRow>
    )
  )
}

BasicRows.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired
}

function BasicTable(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <BasicCells cols={props.cols} />
          </TableRow>
        </TableHead>
        <TableBody>
          <BasicRows rows={props.rows} cols={props.cols} />
        </TableBody>
      </Table>
    </Paper>
  );
}

BasicTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTable);
