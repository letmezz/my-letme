<template>
  <div id="app">
    <div id="nav">
    
    </div>
    <router-view />
  </div>
</template>

<!-- <script>
  export default{
    name:'APP',
    data (){
      return{

      }
    },
    mounted: function () {
         //此方法刷新页面时也会执行
         window.addEventListener('beforeunload',()=>{
            localStorage.removeItem('token');
        });
    }
  }
</script> -->
<style lang="scss" scoped>
#app {
 margin: 0px;
 padding: 0px;
}

</style>
