<template>
  <h1>自由发挥吧您呢</h1>
  <div class="container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import {onMounted} from "vue";

let container
let width, height
let scene, camera, renderer
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴
let axes = new THREE.AxesHelper(50) // 设置轴线的粗细度为 20
let plane, cube, sphere

const init = () => {
  container = document.querySelector(".container");
  width = container.clientWidth;
  height = container.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height)
  // 添加坐标轴
  scene.add(axes)
  // 添加一个平板
  let planeGeometry = new THREE.PlaneGeometry(60, 20)
  let planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA})
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI // 设置平板沿 X 轴旋转 - π/2 : // π是 180 度 , 所以沿着 X 轴逆时针旋转 90 度
  plane.position.set(15, 0, 0) // 设置平板的空间坐标
  scene.add(plane)
  // 添加一个 Cube 立方体
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
  let cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true, // 将几何体渲染为线框。默认值为false（即渲染为平面多边形）。
  })
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(-4, 3, 0)
  scene.add(cube)
  // 添加一个 sphere 球体
  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777FF,
    color: 0xFFFFFF,
    wireframe: true
  })
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(20, 4, 2)
  scene.add(sphere)


  // 分割线 ---------------------


  // 相机设置位置
  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position)
  container.appendChild(renderer.domElement)
}


function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01 + Math.random() * 0.01
  cube.rotation.y += 0.01 + Math.random() * 0.01
  sphere.rotation.x += 0.01 + Math.random() * 0.01
  sphere.rotation.y += 0.01 + Math.random() * 0.01

  renderer.render(scene, camera);
}


onMounted(() => {
  init()
  animate();
})


console.log("Using Three.js version:", THREE.REVISION)

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>