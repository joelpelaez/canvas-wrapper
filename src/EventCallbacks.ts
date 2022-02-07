interface OnClickCallback {
  onClick(ev: MouseEvent): void
}

interface OnDoubleClickCallback {
  onDoubleClick(ev: MouseEvent): void
}

interface OnMouseDownCallback {
  onMouseDown(ev: MouseEvent): void
}

interface OnMouseMoveCallback {
  onMouseMove(ev: MouseEvent): void
}

interface OnMouseOutCallback {
  onMouseOut(ev: MouseEvent): void
}

interface OnMouseOverCallback {
  onMouseOver(ev: MouseEvent): void
}

interface OnMouseUpCallback {
  onMouseUp(ev: MouseEvent): void
}

interface OnWheelCallback {
  onWheel(ev: MouseEvent): void
}

export {
  OnClickCallback,
  OnDoubleClickCallback,
  OnMouseDownCallback,
  OnMouseMoveCallback,
  OnMouseOutCallback,
  OnMouseOverCallback,
  OnMouseUpCallback,
  OnWheelCallback,
};