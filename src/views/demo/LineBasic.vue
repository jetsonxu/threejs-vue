<template>
  <div id="content"></div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import {onMounted} from "vue";

onMounted(() => {
  let dom = document.querySelector("#content")
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(dom?.clientWidth, dom?.clientHeight);
  dom.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(45, dom?.clientWidth / dom?.clientHeight, 1, 500);
  // camera.position.set(0, 0, 100);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  const material = new THREE.LineBasicMaterial({color: 0x0000ff});

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  scene.add(line);


  // 辅助线
  const axesHelper = new THREE.AxesHelper(20);
  scene.add(axesHelper);


  renderer.render(scene, camera);


})

</script>

<style scoped lang="scss">
#content {
  width: 100%;
  height: 100%;
}
</style>