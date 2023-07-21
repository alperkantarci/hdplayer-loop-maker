import { createElement } from "react";

const ListItem = (props) =>
  createElement("ListItem", {
    FileKey: props.fileKey,
    FileName: props.fileName,
  });

export { ListItem };
