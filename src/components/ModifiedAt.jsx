import React from "react";

export const ModifiedAt = (props) => {
  let intl = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return <>Modified {intl.format(props.date)}</>;
};
