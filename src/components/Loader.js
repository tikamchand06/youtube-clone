import React from 'react';

const Loader = () => (
  <div className="tcm_loader">
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p style={{ marginTop: 10 }}>Loading...</p>
  </div>
);

export default Loader;
