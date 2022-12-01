import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const gltfLoader: GLTFLoader = new GLTFLoader()
export const framePromise = gltfLoader.loadAsync('/seraphine/scene.gltf')
// gltfLoader.load('/seraphine/scene.gltf', (gltf) => {
//     var model = gltf.scene
//     scene.add(model)
// })