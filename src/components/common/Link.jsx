import React from "react";
import classNames from "classnames";

const Link = ({ className = "", href = "", text }) => {
  return (
    <a className={classNames("underline capitalize text-sm", className)} href={href}>
      {text}
    </a>
  );
};

export default Link;
