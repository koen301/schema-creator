<template>
  <div id="app">
    <div class="nav">
      <router-link to="/example1">Example1</router-link>
      <router-link to="/example2">Example2</router-link>
      <router-link to="/example3">Example3</router-link>
      <router-link to="/example4">Example4</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 60px 0;
  background-color: #f8f8f8;
}
.nav{
  padding-bottom: 50px;
}
.nav a{
  margin: 0 20px;
  text-decoration: none;
}
.router-link-exact-active{
  color: #fff;
  background-color: #409EFF;
}
h4 {
  border-bottom: 1px solid #dcdfe6;
  padding: 10px 0 0 20px;
  margin: 60px 0 40px;
  font-weight: 400;
  text-align: left;
  position: relative;
  line-height: 30px;
}

h4:before {
  display: block;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 20px;
  left: 0px;
  background: #262626;
}

h4:first-child {
  margin-top: 0;
}
</style>
