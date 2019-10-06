import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div>
      <Link to={`/user/${props.userName}`}>
        {`Go to ${props.userName}`}
      </Link>
    </div>
  )
}
