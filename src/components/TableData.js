import React from 'react';
import { Link } from 'react-router-dom';

function TableData(props) {
  const { type, title, location, id } = props.jobdetail;

  const link = '/jobdetails/' + id;

  return (
    <React.Fragment>
      <tr>
        <td>{type}</td>
        <td>
          <Link to={link}>{title}</Link>
        </td>
        <td>{location}</td>
      </tr>
    </React.Fragment>
  );
}

export default TableData;
