import { CWPriority } from "./Enums";

abstract class CWElement {
  protected _children: CWElement[];
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _priority: CWPriority;

  public get children() {
    return this._children;
  }

  public get x(): number {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;
  }

  public get priority(): CWPriority {
    return this._priority;
  }

  public set priority(value: CWPriority) {
    this._priority = value;
  }

  protected constructor(protected parent: CWElement) {
    this._children = [];
    this._x = 0;
    this._y = 0;
    this._width = 1;
    this._height = 1;
    this._priority = CWPriority.NORMAL;
    if (parent !== null) {
      parent.addChild(this);
    }
  }

  public setPosition(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public setSize(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  protected addChild(child: CWElement) {
    this._children.push(child);
  }

  public inBoundary(coordinateX: number, coordinateY: number): boolean {
    const x1 = this._x;
    const x2 = this._x + this._width;
    const y1 = this._y;
    const y2 = this._y + this._height;

    return (coordinateX >= x1 && coordinateX <= x2) && (coordinateY >= y1 && coordinateY <= y2);
  }

  public invalidate() {
    this.parent.invalidate();
  }

  abstract paint(context: CanvasRenderingContext2D, rx: ((r: number) => number), ry: ((r: number) => number));
}

export { CWElement };