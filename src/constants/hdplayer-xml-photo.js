import { createElement } from "react";

const HdPhotoPlugin = (props) =>
  createElement("Node", { Level: "4", Type: "HD_Photo_Plugin", ...props });

export { HdPhotoPlugin };
