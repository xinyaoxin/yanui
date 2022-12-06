import {
  Camera,
  EventDispatcher,
  Object3D,
  Raycaster,
  Scene,
  Vector2,
  Vector3
} from "three";

export interface TEventManagerParameters {
  dom: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
}

export class TEventManager extends EventDispatcher {
  private raycaster: Raycaster = new Raycaster();
  private mouse: Vector2 = new Vector2();
  private dom: HTMLCanvasElement;
  private scene: Scene;
  private camera: Camera;
  constructor(params: TEventManagerParameters) {
    super();

    this.dom = params.dom;
    this.scene = params.scene;
    this.camera = params.camera;

    const mouse = this.mouse;
    const raycaster = this.raycaster;
    const dom = params.dom;


    let cacheObject: Object3D | null = null;

    dom.addEventListener("mousedown", (event) => {
      // 选取物体的操作
      raycaster.setFromCamera(mouse, this.camera);
      const intersection = raycaster.intersectObjects(this.scene.children);
      this.dispatchEvent({
        type: "mousedown",
        intersection,
      });
      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type: "mousedown",
        });
      }
    });

    dom.addEventListener("mousemove", (event) => {
      mouse.x = (event.offsetX / dom.offsetWidth) * 2 - 1;
      mouse.y = (-event.offsetY * 2) / dom.offsetHeight + 1;

      // 选取物体的操作
      raycaster.setFromCamera(mouse, this.camera);

      const intersection = raycaster.intersectObjects(this.scene.children);

      this.dispatchEvent({
        type: "mousemove",
        intersection,
      });
      if (intersection.length) {
        const object = intersection[0].object;

        if (object !== cacheObject) {
          if (cacheObject) {
            cacheObject.dispatchEvent({
              type: "mouseleave",
            });
          }
          object.dispatchEvent({
            type: "mouseenter",
          });
        } else if (object === cacheObject) {
          cacheObject.dispatchEvent({
            type: "mousemove",
          });
        }
        cacheObject = object;
      } else {
        if (cacheObject) {
          cacheObject.dispatchEvent({
            type: "mouseleave",
          });
        }
        cacheObject = null;
      }
    });

    dom.addEventListener("mouseup", (event) => {
      // 选取物体的操作
      raycaster.setFromCamera(mouse, this.camera);
      const intersection = raycaster.intersectObjects(this.scene.children);

      this.dispatchEvent({
        type: "mouseup",
        intersection,
      });
      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type: "mouseup",
        });
      }
    });

    const worldPosition = new Vector3()
    dom.addEventListener("click", (event) => {

      // vm.currentModel.getWorldPosition(worldPosition);
      var standardVector = worldPosition.project(this.camera);
      var a = (window.innerWidth - 200) / 2;
      var b = (window.innerHeight - 60) / 2;
      let some_left = Math.round(standardVector.x * a + a) + 200;
      let some_top = Math.round(-standardVector.y * b + b) - 140 + 60;
      // vm.bool = true


      // 把鼠标的位置转回
      let mouse_x = (mouse.x + 1) / 2 * dom.offsetWidth + 200
      let mouse_y = -((mouse.y - 1) * dom.offsetHeight) / 2 + 130
      console.log('这是鼠标的位置TEM', mouse.x, event.offsetX, mouse_x, event.offsetY, mouse_y, some_left, some_top)
      // 选取物体的操作
      raycaster.setFromCamera(mouse, this.camera);
      const intersection = raycaster.intersectObjects(this.scene.children);

      this.dispatchEvent({
        type: "click",
        intersection,
        mouse_x,
        mouse_y
      });
      if (intersection.length) {
        const object = intersection[0].object;
        object.dispatchEvent({
          type: "click",
          mouse_x,
          mouse_y
        });
      }
    });

    dom.addEventListener('contextmenu', (event) => {
      let mouse_x = (mouse.x + 1) / 2 * dom.offsetWidth + 200
      let mouse_y = -((mouse.y - 1) * dom.offsetHeight) / 2 + 130
      raycaster.setFromCamera(mouse, this.camera);
      const intersection = raycaster.intersectObjects(this.scene.children);
      this.dispatchEvent({
        type: "contextmenu",
        intersection,
        mouse_x,
        mouse_y
      });
      console.log('鼠标右键点击')
    })
  }
}
