import {
    Object3D,
    AmbientLight, PointLight, SpotLight, DirectionalLight
} from 'three'

export const lightsList: Object3D[] = []

/**
 * 物体最终的显示效果是环境光和物体本身颜色的乘积
 * 物体       1, 0, 0
 * 环境光颜色  0 ,1 ,1 
 * 物体最终    0, 0, 0
 */

// 环境光，显示物体本身的颜色相当于自然光 
export const ambientLight = new AmbientLight(0xffffff, 0.9) //白色 强度1

//点光 需要指定位置 需要光源辅助才能看到具体位置
export const pointLight = new PointLight(0xffffff, 0.9); //点光距离大才能更好显示棱角
pointLight.position.set(50, 70, 60); //红线 x 绿线 y 蓝线z
pointLight.castShadow = true

//聚光灯
export const spotLight = new SpotLight('rgb(50, 205, 50)', 1, 800, Math.PI / 4,)
spotLight.position.set(-50, 150, -60)
spotLight.castShadow = true

export const directionalLight = new DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(100, 350, 200);
export const directionalLight2 = new DirectionalLight(0xffffff, 0.7);
directionalLight2.position.set(-300, -100, -400);
export const directionalLight3 = new DirectionalLight(0xffffff, 0.3);
directionalLight3.position.set(-10, -300, -30);
export const point = new PointLight(0xffffff, 0.9);
point.position.set(400, 150, 300);
export const ambient = new AmbientLight(0xffffff, 0.9);





// lightsList.push(ambientLight, pointLight)
lightsList.push(directionalLight, directionalLight2, directionalLight3, point, ambient)
