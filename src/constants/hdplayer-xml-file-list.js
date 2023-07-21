import { createElement } from "react";

const FileList = (props) =>
  createElement("List", { Name: "__FileList__", Index: "0", ...props });

export { FileList };
