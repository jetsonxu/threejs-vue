<template>
  <div class="demo-page">
    <div class="demo-left">
      <div class="left-title">three.js Demo</div>
      <ul>
        <li v-for="item in menuList">
          <RouterLink :to="`/demo/`+item.path">{{ item.meta.title }}</RouterLink>
        </li>
      </ul>
    </div>
    <div class=" demo-right">
      <RouterView/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {demoChildren} from "@/router";

let menuList = demoChildren
</script>

<style scoped lang="scss">
.demo-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;

  .demo-left {
    width: 180px;
    height: 100%;
    background: #DDD8CD;
    flex-shrink: 0;
    padding: 0 15px;

    .left-title {
      color: #171717;
      //font-family: Monaco;
      font-family: Cochin;
      //font-family: "Courier New";
      text-align: center;
      padding: 15px 0;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }

    ul {
      width: 100%;
      padding: 0;

      li {
        width: 100%;
        height: 35px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        a {
          width: 100%;
          height: 100%;
          font-family: "Courier New";
          display: flex;
          text-decoration: none;
          color: #181818;
          align-items: center;
          justify-content: center;
          font-weight: bold;

          &:hover {
            color: #916691;

          }
        }
      }
    }
  }

  .demo-right {
    width: 100%;
    height: 100%;
  }
}
</style>