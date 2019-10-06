import React from 'react';
import { css, keyframes } from '@emotion/core';

const animate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ring = css`
  border: 5px solid;
  border-color: #444 transparent #444 transparent;
  border-radius: 50px;
  display: inline-block;
  width: 50px;
  height: 50px;
  animation: ${animate} 1.2s linear infinite;
`

export default () => {
  return (
    <div css={ring} />
  )
}
