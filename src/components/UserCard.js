import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { SimpleImg } from 'react-simple-img';

const cardStyle = css`
  background: #fff;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  padding: 12px;
  height: 50px;
  margin: 12px;
  border-radius: 4px;
  @media (min-width: 768px) {
    flex-basis: calc(100% - 48px);
  }
  @media (min-width: 480px) {
    flex-basis: calc(50% - 48px);
  }
`;

const usernameStyle = css`
  margin-left: 24px;
  line-height: 50px;
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  color: dimgray;
`;

const imageStyle = {
  height: 50,
  width: 50,
  borderRadius: 25,
  display: 'inline-block',
}

export default (props) => {
  return (
    <Link css={cardStyle} to={`/user/${props.userName}`}>
      <SimpleImg 
        importance='low' 
        src={props.avatar}
        alt={`Profile picture of ${props.userName}`}
        imgStyle={imageStyle}
        style={{ display: 'inline-block' }}
        height={50}
        width={50}
      />
      <span css={usernameStyle}>{props.userName}</span>
    </Link>
  )
}
