//贴图
import { Texture, TextureLoader } from 'three'

const textureLoader: TextureLoader = new TextureLoader()
//放在public下使用绝对路径
export const pictureTexture: Texture = textureLoader.load('/d.jpg')