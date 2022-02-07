import {
  OnClickCallback,
  OnDoubleClickCallback,
  OnMouseDownCallback,
  OnMouseMoveCallback,
  OnMouseOutCallback, OnMouseOverCallback, OnMouseUpCallback, OnWheelCallback
} from "./EventCallbacks";

function isOnClickCallback(obj: any): obj is OnClickCallback {
  return obj && 'onClick' in obj;
}

function isOnDoubleClickCallback(obj: any): obj is OnDoubleClickCallback {
  return obj && 'onDoubleClick' in obj;
}

function isOnMouseDownCallback(obj: any): obj is OnMouseDownCallback {
  return obj && 'onMouseDown' in obj;
}

function isOnMouseMoveCallback(obj: any): obj is OnMouseMoveCallback {
  return obj && 'onMouseMove' in obj;
}

function isOnMouseOutCallback(obj: any): obj is OnMouseOutCallback {
  return obj && 'onMouseOut' in obj;
}

function isOnMouseOverCallback(obj: any): obj is OnMouseOverCallback {
  return obj && 'onMouseOver' in obj;
}

function isOnMouseUpCallback(obj: any): obj is OnMouseUpCallback {
  return obj && 'onMouseUp' in obj;
}

function isOnWheelCallback(obj: any): obj is OnWheelCallback {
  return obj && 'onMouseUp' in obj;
}

export {
  isOnClickCallback,
  isOnDoubleClickCallback,
  isOnMouseDownCallback,
  isOnMouseMoveCallback,
  isOnMouseOutCallback,
  isOnMouseOverCallback,
  isOnMouseUpCallback,
  isOnWheelCallback,
}