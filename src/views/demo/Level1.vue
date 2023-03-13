<template>
  <div class="container"></div>
  <div class="description">Hello world</div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import {onMounted} from "vue";
import {MeshBasicMaterial} from "three";

let container
let width, height
let scene, camera, renderer
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴
let axes = new THREE.AxesHelper(20) // 设置轴线的粗细度为 20
let plane, cube, sphere

let spotLight = new THREE.SpotLight(0xFFFFFF)

const init = () => {
  container = document.querySelector(".container");
  width = container.clientWidth;
  height = container.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height)
  // 添加坐标轴
  scene.add(axes)
  // 添加物料-------------------------


  // 添加一个平板
  let planeGeometry = new THREE.PlaneGeometry(60, 20)
  // let planeMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA})
  // let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff})
  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xAAAAAA})
  plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI // 设置平板沿 X 轴旋转 - π/2 : // π是 180 度 , 所以沿着 X 轴逆时针旋转 90 度
  plane.position.set(15, 0, 0) // 设置平板的空间坐标
  scene.add(plane)


  // 添加一个 sphere 球体
  let sphereGeometry = new THREE.SphereGeometry(8, 40, 40);
  let sphereMaterial = new THREE.MeshLambertMaterial({
    // color: 0x7777FF,
    color: 0xffffff,
    wireframe: true
  })

  // 设置材质的透明度
  sphereMaterial.opacity = 0.3;
// 开启材质的透明度
  sphereMaterial.transparent = true;


  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(20, 8, 1)
  scene.add(sphere)

  // 打个灯
  spotLight.position.set(40, 50, 10)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(24, 24);
  spotLight.shadow.camera.far = 130
  spotLight.shadow.near = 10
  scene.add(spotLight);

  // // 灯光 2
  // let light = new THREE.PointLight(0xffffff, 1, 100);
  // light.position.set(0, 20, 40);
  // scene.add(light);


  // 分割线 ---------------------
  // 相机设置位置
  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position) // 0,0,0
  container.appendChild(renderer.domElement)
}


function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01
  spotLight.rotation.x += 0.01
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

.description {
  position: fixed;
  left: 200;
  top: 0;
  height: 100px;
  width: 300px;
  color: #ffffff;
}
</style>