import { createElement } from "react";

const HdOrdinaryScenePlugin = (props) =>
  createElement("Node", {
    Level: "2",
    Type: "HD_OrdinaryScene_Plugin",
    ...props,
  });

export { HdOrdinaryScenePlugin };
