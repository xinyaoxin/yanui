//辅助功能 光源 网格 坐标轴等
import {
    AxesHelper,
    GridHelper,
    PointLightHelper,
    SpotLightHelper,
    Object3D
} from 'three'

import { pointLight, spotLight } from './TLights'

export const helperList: Object3D[] = []



//添加光源 有光源才可以显示颜色
const axesHelperesHelper = new AxesHelper(500) //添加坐标轴
const gridHelper = new GridHelper(300, 30, 'rgb(255,0,0)', 'rgb(255,255,255)') //网格大小 网格密度 xy颜色 网格线颜色
// gridHelper.position.y = -5
const pointLightHelper = new PointLightHelper(pointLight, 2, 'rgb(0, 0, 0)')
const spotLightHelper = new SpotLightHelper(spotLight, 'rgb(0, 1, 0)')


helperList.push(axesHelperesHelper, pointLightHelper,)