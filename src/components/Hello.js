import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';

export default () => {
  return (
    <React.Fragment>
      <div css={css`background-color: black; color: white;`}>Hello!</div>
      <Link to="/there">Go there</Link>
    </React.Fragment>
  )
}
