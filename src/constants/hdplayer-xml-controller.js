import { createElement } from "react";

const CONTROLLER_HEIGHT = 768;
const CONTROLLER_WIDTH = 1280;
const CONTROLLER_DEVICE_MODEL = "A6";

const HdControllerPlugin = (props) =>
  createElement("Node", {
    Level: "1",
    Type: "HD_Controller_Plugin",
    ...props,
  });

const ControllerNameAttribute = (props) =>
  createElement("Attribute", { Name: "__NAME__" }, "Controller");

const ControllerDeviceModelAttribute = (props) =>
  createElement("Attribute", { Name: "DeviceModel" }, CONTROLLER_DEVICE_MODEL);

export {
  CONTROLLER_HEIGHT,
  CONTROLLER_WIDTH,
  HdControllerPlugin,
  ControllerNameAttribute,
  ControllerDeviceModelAttribute,
};
