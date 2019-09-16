<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body,
html {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  font-size: 14px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.icon {  
   width: 3em; height: 3em;  
   vertical-align: -0.15em;  
   fill: currentColor;  
   overflow: hidden;  
} 
</style>
