import { Mesh, MeshStandardMaterial, BufferGeometry, Object3D, BufferAttribute } from 'three'
import { pictureTexture } from './TTexture'



//红线 x 绿线 y 蓝线z
export const codeModelList: Object3D[] = []

//80,60,80
//顶点位置
const points: Float32Array = new Float32Array([
    -10, 60, 40,
    50, 60, 40,
    50, 60, -40,
    -10, 60, -40,
    -10, 0, 40,
    50, 0, 40,
    50, 0, -40,
    -10, 0, -40,
])

//顶点索引 逆时针为渲染面
const pointIndex: number[] = [
    0, 1, 2,
    2, 3, 0,
    0, 4, 5,
    5, 1, 0,
    1, 5, 6,
    6, 2, 1,
    2, 6, 7,
    7, 3, 2,
    0, 3, 7,
    7, 4, 0,
    4, 7, 6,
    6, 5, 4
]
//会自动把图片的左下角映射成0,0右上角映射成1,1
const uv: Float32Array = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,
    0, 1
])

const geometry: BufferGeometry = new BufferGeometry()
//位置信息
geometry.setAttribute('position', new BufferAttribute(points, 3))
geometry.setAttribute('uv', new BufferAttribute(uv, 2))
//法线信息
geometry.setAttribute('normal', new BufferAttribute(points, 3))
//顶点索引
geometry.setIndex(pointIndex)

const metrial: MeshStandardMaterial = new MeshStandardMaterial({
    color: 'white',
    // map: pictureTexture
})

const codeBox: Mesh = new Mesh(geometry, metrial)

codeBox.position.y = 10
// codeBox.rotation.x = Math.PI / 180 * 90


codeModelList.push(codeBox)