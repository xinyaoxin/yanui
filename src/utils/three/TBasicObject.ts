import {
    Mesh, MeshStandardMaterial,
    BoxGeometry, SphereGeometry, CylinderGeometry, PlaneGeometry,
    Object3D,
    Line,
    Color,
} from 'three'
import { pictureTexture } from './TTexture'

/**
 * 鼠标定义 12
 * canvas 15
 */

//定义公共的几何类型、材质
const geometry = new BoxGeometry(80, 60, 80)                               //几何对象
const material = new MeshStandardMaterial({
    color: 'red',
    map: pictureTexture
    // metalness: 0.4, //金属度
    // roughness: 0.3 //粗糙度
}) //给材料添加颜色

//地面
const stage: Mesh = new Mesh(
    new BoxGeometry(200, 10, 200),
    new MeshStandardMaterial({
        color: 'rgb(255, 255, 255)',
    })
    // new BoxGeometry(10, 10, 10),                           //几何对象
    // new MeshStandardMaterial({ color: 'rgb(255, 106, 106)' })
)
stage.position.y = -5
stage.receiveShadow = true
stage.addEventListener('click', () => {
    console.log('地面被点击了')
})
stage.raycast = () => { }


const box: Mesh = new Mesh(//网格物体的展现方式 Mesh Line Points(暂时不可用)
    geometry,
    material
)
box.position.y = 30
box.position.x = 100
box.castShadow = true

//贴图 相框
const plane: Mesh = new Mesh(
    new PlaneGeometry(100, 80),
    new MeshStandardMaterial({
        map: pictureTexture
    })
)
plane.position.y = 80
plane.position.x = 100
plane.scale.set(0.5, 0.5, 0.5) //缩放


// const sphere: Line = new Line(
//     new SphereGeometry(5, 25, 25),
//     new MeshStandardMaterial({ color: 'rgb(153, 50 ,204)' })
// )
// sphere.position.x = 10

// const cylinder: Mesh = new Mesh(
//     new CylinderGeometry(5, 5, 10, 32, 5),
//     new MeshStandardMaterial({ color: 'rgb(205, 192 ,176)' })
// )
// cylinder.position.z = 10

// const cylinder2: Points = new Points(
//     new CylinderGeometry(5, 5, 10, 32, 5),
//     new MeshStandardMaterial({ color: 'rgb(205, 192 ,176)' })
// )
// cylinder2.position.z = -10


export const basicObjectList: Object3D[] = []

basicObjectList.push()