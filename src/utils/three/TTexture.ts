//贴图
import { Texture, TextureLoader, CubeTextureLoader } from 'three'

const textureLoader: TextureLoader = new TextureLoader()
const cubeTextureLoader: CubeTextureLoader = new CubeTextureLoader()
//放在public下使用绝对路径
export const pictureTexture: Texture = textureLoader.load('/d.jpg')

export const pictures = cubeTextureLoader.setPath('/seraphine/modelc/环境贴图4/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], function (texture) {
});