<template>
  <div class="container"></div>
  <div class="description">
    给材质设置灯光
  </div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import {onMounted, onUnmounted} from "vue";
import {MeshBasicMaterial} from "three";
import Stats from "three/examples/jsm/libs/stats.module"
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";

let stats
let container
let width, height
let scene, camera, renderer
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴
let axes = new THREE.AxesHelper(20) // 设置轴线的粗细度为 20
let plane, cube, sphere

let spotLight = new THREE.SpotLight(0xFFFFFF)
let trackballControls, clock
const init = () => {
  container = document.querySelector(".container");
  let desc = document.querySelector(".description");
  stats = Stats({
    dom: desc
  })
  width = container.clientWidth;
  height = container.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(width, height)
  renderer.setClearColor(new THREE.Color(0x659730)) // 设置背景颜色
  // 设置渲染器允许阴影
  renderer.shadowMap.Enabled = true
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
  plane.receiveShadow = true //接收阴影
  scene.add(plane)


  // 添加一个 sphere 球体
  let sphereGeometry = new THREE.SphereGeometry(4, 30, 30);
  // let sphereMaterial = new THREE.MeshLambertMaterial({
  let sphereMaterial = new THREE.MeshLambertMaterial({
    // color: 0x7777FF,
    color: 0xffffff,
    wireframe: true
  })

  // 设置材质的透明度
  // sphereMaterial.opacity = 0.3;
// 开启材质的透明度
  sphereMaterial.transparent = true;


  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(20, 6, 1)
  sphere.castShadow = true
  scene.add(sphere)


  // 打个灯
  spotLight.position.set(-80, 130, 50)
  spotLight.castShadow = true
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 2000
  spotLight.shadow.near = 0.1
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
  // 利用鼠标移动摄像机
  createTrackballControls()

}

let step = 0;


let gui
const controls = new function () {
  this.rotationSpeed = 0.02
  this.bouncingSpeed = 0.03
  // rotationSpeed: 0.02,
  // bouncingSpeed: 0.03,
  // changeSphereYSpeed: function () {
  //   // pointLight.color.setHSL(Math.random(), 1, 0.5);
  // },
};

function guiInit() {
  gui = new GUI();
  gui.add(controls, 'rotationSpeed', 0, 20).name('改变旋转速度');
  gui.add(controls, 'bouncingSpeed', 0, 0.5).name('改变跳跃速度');
  gui.open();
}

// 利用鼠标移动摄像机


function animate() {
  stats.update()
  requestAnimationFrame(animate);
  step += controls.bouncingSpeed
  sphere.position.x = 20 + 10 * (Math.cos(step))
  // sphere.position.y = 2 + controls.bouncingSpeed * Math.abs(Math.sin(step))
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

  trackballControls.update();

  renderer.render(scene, camera);


  // clock = new THREE.Clock()
  // trackballControls.update(clock.getDelta())
}

function createTrackballControls() {
  trackballControls = new TrackballControls(camera, renderer.domElement);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.keys = ['KeyA', 'KeyS', 'KeyD'];
}

onMounted(() => {
  guiInit()
  init()
  animate();

})

onUnmounted(() => {
  gui.destroy()
})

onMounted(() => {

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