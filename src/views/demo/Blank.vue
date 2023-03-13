<template>
  <div class="container"></div>
  <div class="description"></div>
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
  // 添加物料-------------------------


  // 分割线 ---------------------
  // 相机设置位置
  camera.position.set(-30, 40, 30)
  camera.lookAt(scene.position)
  container.appendChild(renderer.domElement)
}


function animate() {
  // requestAnimationFrame(animate);
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
  right: 0;
  top: 0;
  height: 100px;
  width: 300px;

}
</style>