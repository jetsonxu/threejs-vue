<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import {onMounted} from "vue";
import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";

// 容器
let container, width, height

// 基本组件
let scene, // 所有不同对象的容器, 场景图
    camera, // 决定屏幕上哪些东西需要渲染
    renderer, // 基于摄像机和场景提供的信息,调用底层图形 API 执行真正的场景绘制工作
    spotLight, // 点光源:决定材质如何显示以及用于产生阴影
    ambientLight // 环境光

// 对象: 摄像机透视图里主要的渲染对象,如方块、球体等
let plane, cube, sphere

function init() {
  container = document.querySelector(".container")!
  width = container.clientWidth
  height = container.clientHeight
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  renderer.setClearColor(new THREE.Color(0xCCCCCC))
  renderer.shadowMap.enabled = true;   // 设置渲染器允许阴影
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  camera.position.set(-30, 40, 30); // 设置相机位置
  // camera.position.z = 5;
  camera.lookAt(scene.position)
  container.appendChild(renderer.domElement)
  scene.add(camera)
  scene.add(new THREE.AxesHelper(20)); //添加空间辅助坐标轴
  genPlane(scene)
  genCube(scene)
  genLight(scene)
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0.02
  render()
}


onMounted(() => {
  init()
  animate()
})

function genLight(scene) {
  ambientLight = new THREE.AmbientLight(0x3c3c3c)
  scene.add(ambientLight)
  spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  // spotLight.shadow.camera.far = 2000
  // spotLight.shadow.near = 0.1
  //Set up shadow properties for the light
  spotLight.shadow.camera.near = 0.5;    // default
  spotLight.shadow.camera.far = 500      // default
  spotLight.shadow.focus = 1;            // default
  scene.add(spotLight)

  // const helper = new THREE.CameraHelper(spotLight.shadow.camera);
  // scene.add(helper);


}

function genPlane(scene) {
  let planeGeometry = new THREE.PlaneGeometry(60, 20)
  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xeeeeee})
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI // 设置平板沿 X 轴旋转 - π/2 : // π是 180 度 , 所以沿着 X 轴逆时针旋转 90 度
  plane.position.set(15, 0, 0) // 设置平板的空间坐标
  plane.receiveShadow = true //接收阴影
  scene.add(plane)
}

function genCube(scene) {
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6638F0,
    wireframe: false
  });
  cube = new Mesh(geometry, material);
  cube.castShadow = true // Foolish error!
  cube.position.set(-8, 5, -1)
  scene.add(cube);
}


</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}

</style>