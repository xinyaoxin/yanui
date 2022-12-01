import {
    Object3D,
    AmbientLight, PointLight, SpotLight
} from 'three'

export const lightsList: Object3D[] = []

/**
 * 物体最终的显示效果是环境光和物体本身颜色的乘积
 * 物体       1, 0, 0
 * 环境光颜色  0 ,1 ,1 
 * 物体最终    0, 0, 0
 */

//环境光，显示物体本身的颜色相当于自然光 
export const ambientLight = new AmbientLight('rgb(255, 255, 255)', 0.4) //白色 强度1

//点光 需要指定位置 需要光源辅助才能看到具体位置
export const pointLight = new PointLight('rgb(255, 222, 173)', 0.7, 300, 0.1); //点光距离大才能更好显示棱角
pointLight.position.set(50, 70, 60); //红线 x 绿线 y 蓝线z
pointLight.castShadow = true

//聚光灯
export const spotLight = new SpotLight('rgb(50, 205, 50)', 1, 800, Math.PI / 4, )
spotLight.position.set(-50, 150, -60)
spotLight.castShadow = true

lightsList.push(ambientLight,pointLight, spotLight)
