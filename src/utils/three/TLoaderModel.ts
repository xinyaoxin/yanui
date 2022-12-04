import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const gltfLoader: GLTFLoader = new GLTFLoader()
export const framePromise = gltfLoader.loadAsync('/seraphine/modelb/scene.gltf')

const fbxLoader: FBXLoader = new FBXLoader()
export const fbxFramePromise = fbxLoader.loadAsync('/seraphine/modelc/jack.fbx')