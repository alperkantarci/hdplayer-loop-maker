import { createElement } from "react";

const HdVideoPlugin = (props) =>
  createElement("Node", { Level: "4", Type: "HD_Video_Plugin", ...props });

export { HdVideoPlugin };
