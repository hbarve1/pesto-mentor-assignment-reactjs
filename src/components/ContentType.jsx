import React from "react";

const types = {
  articles: "Article",
  bundles: "Bundle",
  contributors: "Contributor"
};

export const ContentType = (props) => {
  return <>{types[props.collection]}</>;
};
