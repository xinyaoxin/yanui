import {
    Mesh, Color,
    Scene, PerspectiveCamera,
    WebGLRenderer, Vector3, AxesHelper,
    GridHelper, Object3D, Vector2, Raycaster, MeshStandardMaterial
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { TEventManager } from './TEventManager'
import store from '@/store/index'

export class ThreeEngine {
    public isPopover = store.state.user.isPopover
    private dom: HTMLElement // 挂载的 DOM
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    private mouse: Vector2 = new Vector2();
    private raycaster: Raycaster
    private transformControls: TransformControls;

    private eventManager: TEventManager



    // private material: MeshBasicMaterial
    // 构造器函数
    constructor(dom: HTMLElement) {
        console.log('****进入ThreeJS****')
        console.log(dom)
        this.dom = dom
        this.renderer = new WebGLRenderer({
            antialias: true, //抗锯齿 线条平滑
        })

        //射线拾取器
        this.raycaster = new Raycaster()






        //阴影 渲染阴影 灯光阴影 地面接收阴影 物体产生阴影
        this.renderer.shadowMap.enabled = true
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)


        //设置宽高
        // this.renderer.domElement.width = this.dom.offsetWidth
        // this.renderer.domElement.height = this.dom.offsetHeight
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight)
        this.camera.position.set(40, 50, 60)
        //相机的朝向
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.camera.up = new Vector3(0, 1, 0)

        //背景色 默认整个空间是黑色
        this.renderer.setClearColor('rgb(38,38,38)')
        this.renderer.clearColor()

        //性能监视
        const stats = Stats()
        const statsDom = stats.domElement
        statsDom.style.position = 'fixed'
        statsDom.style.top = '144px'
        statsDom.style.right = '20px'
        statsDom.style.left = 'unset'

        //轨道控制器 可旋转视角
        const orbitControls = new OrbitControls(this.camera, this.renderer.domElement) //相机 渲染器的dom
        // orbitControls.autoRotate = true      //相机自动旋转
        // orbitControls.enableDamping = true  //相机变换的惯性


        // 初始变换控制器
        this.transformControls = new TransformControls(
            this.camera,
            this.renderer.domElement
        );
        let transing = false
        // this.scene.add(this.transformControls)

        const eventManager = new TEventManager({
            dom: this.renderer.domElement,
            scene: this.scene,
            camera: this.camera
        })
        let cacheObject: Mesh | null = null
        //点击时可以获取当前射线和所有物体的焦点
        eventManager.addEventListener('mousemove', (event) => {
            if (event.intersection.length) {
                const object = event.intersection[0].object
                // if(object.type === 'TransformControlsPlane'){
                //     this.transformControls.detach()
                //     this.scene.remove(this.transformControls)
                // }else{
                //     this.scene.add(this.transformControls)
                //     this.transformControls.attach(object)
                // }
                if (object === cacheObject) {
                    return
                } else if (object !== cacheObject) {
                    (cacheObject?.material as MeshStandardMaterial).color.multiplyScalar(10 / 13)
                }
                if (object.material) {
                    object.material.color.multiplyScalar(1.3)
                    cacheObject = object
                }
            } else {
                if (cacheObject) {
                    (cacheObject?.material as MeshStandardMaterial).color.multiplyScalar(10 / 13)
                }
                cacheObject = null
            }
        })
        eventManager.addEventListener('click', (event) => {
            // if (!store.state.user.visible) {
            //     event.intersection[0].object.material.visible = false
            // }
            if (event.intersection.length) {
                const object = event.intersection[0].object
                console.log('这是此次点击获取到的内容', object)
                store.commit("user/SET_ELNAME", object.parent.name);
                store.commit("user/SET_Popover", true);
                store.commit("user/SET_POSITOIN", {
                    left: event.mouse_x,
                    top: event.mouse_y
                });
            } else {
                store.commit("user/SET_Popover", false);
                store.commit("user/SET_ELNAME", '')
                store.commit("user/SET_POSITOIN", {});
            }
        })

        // let transing = false;
        // this.transformControls.addEventListener("mouseDown", () => {
        //     transing = true;
        // });
        // document.addEventListener("keydown", (event) => {
        //     if (event.repeat) {
        //         return false;
        //     }

        //     console.log(event);
        //     if (event.key === "e") {
        //         this.transformControls.mode = "scale";
        //         return false;
        //     }

        //     if (event.key === "r") {
        //         this.transformControls.mode = "rotate";
        //         return false;
        //     }

        //     if (event.key === "t") {
        //         this.transformControls.mode = "translate";
        //         return false;
        //     }
        // });
        // this.scene.add(transformControls)

        // let cacheObject: Object3D | null = null
        // //添加点击事件
        // const mouse = new Vector2()
        // let x = 0
        // let y = 0
        // let width = 0
        // let height = 0
        // //全局添加鼠标移动事件改变当前鼠标的坐标为click选取物体做铺垫
        // this.renderer.domElement.addEventListener('mousemove', (e) => {
        //     //转换三维坐标
        //     x = e.offsetX
        //     y = e.offsetY
        //     width = this.renderer.domElement.offsetWidth
        //     height = this.renderer.domElement.offsetHeight
        //     mouse.x = x / width * 2 - 1
        //     mouse.y = -y * 2 / height + 1

        //     //发射射线 选取物体 使物体颜色发生改变
        //     this.raycaster.setFromCamera(mouse, this.camera)
        //     //获取相交物体的焦点
        //     this.scene.remove(this.transformControls)
        //     const intsections = this.raycaster.intersectObjects(this.scene.children)
        //     if (intsections.length) { //选取到物体
        //         const object = intsections[0].object
        //         //新老物体对比
        //         if (object !== cacheObject) {
        //             // 新老物体不一样且原来有物体先离开原来的物体
        //             if (cacheObject) {
        //                 cacheObject.dispatchEvent({
        //                     type: 'mouseleave'
        //                 })
        //             }
        //             //新老物体不一样进入
        //             object.dispatchEvent({
        //                 type: 'mouseenter'
        //             })

        //         } else if (object === cacheObject) {
        //             cacheObject.dispatchEvent({
        //                 type: 'mousemove'
        //             })
        //         }
        //         cacheObject = object //把当前物体进行缓存
        //     } else { //没有选取物体 鼠标从物体移动到空白
        //         if (cacheObject) {
        //             cacheObject.dispatchEvent({
        //                 type: 'mouseleave'
        //             })
        //         }
        //         cacheObject = null
        //     }
        // })

        // this.renderer.domElement.addEventListener('click', (e) => {
        //     if (transing) {
        //         transing = false
        //         return false
        //     }
        //     //发射射线 选取物体
        //     this.raycaster.setFromCamera(mouse, this.camera)
        //     //获取相交物体的焦点
        //     const intsections = this.raycaster.intersectObjects(this.scene.children)
        //     if (intsections.length) {
        //         // console.log(((intsections[0].object as Mesh).material as any).color.set(0xff0000))
        //         const object = intsections[0].object
        //         // object.dispatchEvent({
        //         //     type: 'click'
        //         // })
        //         // this.isPopover = true
        //     } else {
        //     }

        // })



        //鼠标功能提取？




        // 动画渲染 setTimeout setInterval requestAnimationFrame
        const renderFn = () => {
            // box.position.y += 0.01
            // box.rotation.y += 0.001
            orbitControls.update()
            this.renderer.render(this.scene, this.camera)
            stats.update()
            requestAnimationFrame(renderFn)
        }
        renderFn()

        //渲染canvas 性能监视器
        dom.appendChild(this.renderer.domElement)
        dom.appendChild(statsDom)

        // 把一些东西挂载到this
        // this.mouse = mouse
        this.eventManager = eventManager

    }

    //用于场景中批量添加光源，几何体
    addObject(...object: Object3D[]) {
        object.forEach(element => {
            this.scene.add(element)
        });
    }

    modelHide(object: any) {
        console.log(this.scene)
    }
}