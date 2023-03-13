<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';

import {onMounted, onUnmounted} from "vue";

let container: HTMLElement
let width, height
let camera, cameraTarget, scene, renderer
let materials, group
THREE.Cache.enabled = true;
let gui
onMounted(() => {
  container = document.querySelector(".container");
  width = container.clientWidth
  height = container.clientHeight
  // 设置相机
  camera = new THREE.PerspectiveCamera(30, width / height, 1, 1500);
  // 设置 ??
  camera.position.set(0, 400, 700);
  // 设置 ??
  cameraTarget = new THREE.Vector3(0, 150, 0);

  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  // LIGHTS: 设置灯光
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);

  materials = [
    new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true}), // front
    new THREE.MeshPhongMaterial({color: 0xffffff}) // side
  ];

  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);
  // loadFont();

  const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.5, transparent: true})
  );
  plane.position.y = 100;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);


  // RENDERER
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);

  gui = new GUI();
  const params = {
    changeColor: function () {

      pointLight.color.setHSL(Math.random(), 1, 0.5);

    },
    changeFont: function () {

      fontIndex++;

      fontName = reverseFontMap[fontIndex % reverseFontMap.length];

      loadFont();

    },
    changeWeight: function () {

      if (fontWeight === 'bold') {

        fontWeight = 'regular';

      } else {

        fontWeight = 'bold';

      }

      loadFont();

    },
    changeBevel: function () {

      bevelEnabled = !bevelEnabled;

      refreshText();

    }
  };
  gui.add(params, 'changeColor').name('change color');
  gui.add(params, 'changeFont').name('change font');
  gui.add(params, 'changeWeight').name('change weight');
  gui.add(params, 'changeBevel').name('change bevel');
  gui.open();

})

onUnmounted(() => {
  gui.destroy()
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>