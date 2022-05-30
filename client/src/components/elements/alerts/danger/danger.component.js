import React from "react";

import "./danger.styles.css";

const Danger = (props) => {
  return (
    <div className="danger-alert" role="alert" aria-label={props.ariaLabel}>
      <p>{props.message}</p>
    </div>
  );
};

export default Danger;
