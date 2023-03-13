<template>
  <div id="basic-render"></div>
</template>

<script setup lang="ts">
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import {onMounted} from "vue";


onMounted(() => {
  let dom = document.querySelector("#basic-render")

  console.log(dom?.clientWidth);
  console.log(dom?.clientHeight);
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, dom?.clientWidth / dom?.clientHeight, 0.1, 1000)
  const renderer = new WebGLRenderer();
  renderer.setSize(dom?.clientWidth, dom?.clientHeight);
  dom.appendChild(renderer.domElement);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({color: 0x00ff00});
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
})

</script>

<style scoped lang="scss">
#basic-render {
  width: 100%;
  height: 100%;
}
</style>