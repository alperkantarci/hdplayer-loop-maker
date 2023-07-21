import { createElement } from "react";

const HdFramePlugin = (props) =>
  createElement("Node", { Level: "3", Type: "HD_Frame_Plugin", ...props });

export { HdFramePlugin };
