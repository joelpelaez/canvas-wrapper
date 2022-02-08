import { CWElement } from './CWElement';
import {
  isOnClickCallback,
  isOnDoubleClickCallback,
  isOnMouseDownCallback, isOnMouseMoveCallback, isOnMouseOutCallback, isOnMouseOverCallback,
  isOnMouseUpCallback, isOnWheelCallback
} from './EventCallbackCheckers';

class CWLayer extends CWElement {
  private readonly context: CanvasRenderingContext2D;
  private mouseEventsElements: CWElement[];

  constructor(private canvas: HTMLCanvasElement) {
    // Only CWLayer has null parent
    super(null);

    this.context = canvas.getContext("2d");
    this.width = canvas.getBoundingClientRect().width;
    this.height = canvas.getBoundingClientRect().height;
    
    this.mouseEventsElements = [];

    canvas.onclick = ev => this.onClick(ev);
    canvas.ondblclick = ev => this.onDoubleClick(ev);
    canvas.onmousedown = ev => this.onMouseDown(ev);
    canvas.onmousemove = ev => this.onMouseMove(ev);
    canvas.onmouseup = ev => this.onMouseUp(ev);
    canvas.onwheel = ev => this.onWheel(ev);
  }

  onClick(event: MouseEvent) {
    this.executeMouseEvent('onClick', isOnClickCallback, event);
  }

  onDoubleClick(event: MouseEvent) {
    this.executeMouseEvent('onDoubleClick', isOnDoubleClickCallback, event);
  }

  onMouseDown(event: MouseEvent) {
    this.executeMouseEvent('onMouseDown', isOnMouseDownCallback, event);
  }

  onMouseMove(event: MouseEvent) {
    // This process cannot be mapped directly to child elements, only move is possible,
    // but mouseout and mouseover must be reimplemented.

    // Check if the mouse is on child area, when add it to mouse event map.
    // Because the mouseout and mouseover events are two parts of same flow,
    // if an element has one of them, it must be included on all flow.
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const elementsOutOver = this._children.filter(e => isOnMouseOutCallback(e) || isOnMouseOverCallback(e));
    for (const element of elementsOutOver) {
      if (element.inBoundary(x, y) && this.mouseEventsElements.indexOf(element) === -1) {
        this.mouseEventsElements.push(element);

        if (isOnMouseOverCallback(element)) {
          element.onMouseOver(event)
        }
      }

      if (!element.inBoundary(x, y) && this.mouseEventsElements.indexOf(element) !== -1) {
        this.mouseEventsElements = this.mouseEventsElements.filter(e => e !== element);

        if (isOnMouseOutCallback(element)) {
          element.onMouseOut(event)
        }
      }
    }

    // Always process move events in all cases.
    this.executeMouseEvent('onMouseMove', isOnMouseMoveCallback, event);
  }

  onMouseUp(event: MouseEvent) {
    this.executeMouseEvent('onMouseUp', isOnMouseUpCallback, event);
  }

  onWheel(event: MouseEvent) {
    this.executeMouseEvent('onWheel', isOnWheelCallback, event);
  }

  private executeMouseEvent<T>(op: string, checker: (obj: any) => obj is T, eventData: MouseEvent) {
    // Check operator
    const testObj = {
      [op]: () => {
        return;
      }
    }
    if (checker(testObj) === null) {
      throw Error("Invalid mouse event mapping between callback and checker.");
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = eventData.clientX - rect.left;
    const y = eventData.clientY - rect.top;

    const elementsWithOnClick = this._children.filter(checker);
    for (const element of elementsWithOnClick) {
      if (checker(element)) {
        if (element.inBoundary(x, y)) {
          element[op](eventData);
        }
      }
    }

    if (eventData.preventDefault) {
      eventData.preventDefault();
    } else {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prePaint() {
    // dummy, rendering is managed by other way.
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  paint(context: CanvasRenderingContext2D, rx: ((r: number) => number), ry: ((r: number) => number)) {
    // dummy, rendering is managed by other way.
  }

  invalidate() {
    // This calls to render()
    this.realRender();
  }

  public render() {
    requestAnimationFrame(this.realRender.bind(this));
  }

  public realRender() {
    const ctx = this.context;

    // Prepare elements by priority
    const toRender = this._children.sort((a, b) => {
      if (a.priority > b.priority) {
        return -1;
      }

      if (a.priority < b.priority) {
        return 1;
      }

      return 0;
    })

    // Clear all
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // initial save
    ctx.save();

    for (const element of toRender) {
      ctx.save(); // Save absolute position

      // Prepare relative position functions
      const rx = r => r + element.x;
      const ry = r => r + element.y;

      // Set valid drawing area
      const region = new Path2D();
      region.rect(element.x, element.y, element.width, element.height);
      ctx.clip(region);

      ctx.save() // Start child rendering

      element.paint(ctx, rx, ry);

      // Restore child before state.
      ctx.restore();

      // Remove clipping.
      ctx.restore();
    }

    // restore
    ctx.restore();
  }
}

export { CWLayer }