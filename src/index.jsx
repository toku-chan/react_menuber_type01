import { Global, css } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MenuBar } from './MenuBar';

const styles = css`
  html, body, * {
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Global styles={styles} />
    <MenuBar />
  </React.StrictMode>
);
