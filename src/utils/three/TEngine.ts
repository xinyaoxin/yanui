import {
    Scene, PerspectiveCamera,
    WebGLRenderer, Vector3,AxesHelper,
    GridHelper, Object3D
} from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class ThreeEngine {
    private dom: HTMLElement // 挂载的 DOM
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: PerspectiveCamera
    // private material: MeshBasicMaterial
    // 构造器函数
    constructor(dom: HTMLElement) {
        console.log('****进入ThreeJS****')
        console.log(dom)
        this.dom = dom
        this.renderer = new WebGLRenderer({
            antialias: true, //抗锯齿 线条平滑
        })
        //阴影 渲染阴影 灯光阴影 地面接收阴影 物体产生阴影
        this.renderer.shadowMap.enabled = true
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)


        //设置宽高
        // this.renderer.domElement.width = this.dom.offsetWidth
        // this.renderer.domElement.height = this.dom.offsetHeight
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight)
        this.camera.position.set(150, 200, 200)
        //相机的朝向
        this.camera.lookAt(new Vector3(0, 0, 0))
        this.camera.up = new Vector3(0, 1, 0)

        //背景色 默认整个空间是黑色
        this.renderer.setClearColor('rgb(164, 196, 235)')
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
    }

    //用于场景中批量添加光源，几何体
    addObject(...object: Object3D[]) {
        object.forEach(element => {
            this.scene.add(element)
        });
    }
}