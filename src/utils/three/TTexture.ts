//贴图
import { Texture, TextureLoader } from 'three'
// import d from '../../assets/d.jpg'

const textureLoader: TextureLoader = new TextureLoader()
export const pictureTexture: Texture = textureLoader.load('../../assets/d.jpg')