import {
    Mesh, Scene, PerspectiveCamera,
    WebGLRenderer, MeshStandardMaterial, BoxGeometry,
    MeshBasicMaterial,
    Vector3
} from 'three'

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
        this.renderer = new WebGLRenderer()
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000)

        dom.appendChild(this.renderer.domElement) //渲染canvas
        //设置宽高
        // this.renderer.domElement.width = this.dom.offsetWidth
        // this.renderer.domElement.height = this.dom.offsetHeight
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight)
        this.camera.position.set(20,20,20)
        //相机的朝向
        this.camera.lookAt(new Vector3(0,0,0))
        this.camera.up= new Vector3(0,1,0)

        //生成立方体
        const box: Mesh = new Mesh(
            new BoxGeometry(10, 10, 10),
            new MeshStandardMaterial(),
            // new MeshBasicMaterial({ color: 0x00ff00 });
        )
        this.scene.add(box)

        this.renderer.setClearColor('rgb(164, 196, 235)')
        this.renderer.clearColor()
        this.renderer.render(this.scene, this.camera)

    }
}