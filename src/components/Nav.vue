<template>
    <div id="Nav">
        <img class="logo" src="@/assets/logo.png"/>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" background-color="#344a5f" text-color="#fff" router>
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden":key="item.id" :index="index + ''">
                    <template slot="title">
                        <i :class="item.meta.icons"></i>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                    </el-submenu>
            </template>
    
        </el-menu>
    </div>
</template>

<script>
    import '@/style/elementui.scss';
export default{
    name:'Nav',
    data (){
        return{
            isCollapse: false,
            routers:(this.$router.options.routes)
        }
    },
    methods: {
       
    },
    computed:{
        isCollSPSE:function(){
            console.log(111111)
            return this.$store.state.isCollapse
        }
    }
  
    
}
</script>

<style lang="scss" scoped>
 
    #Nav{
        position: fixed;
        width: 250px;
        height: 100vh;
        top: 0px;
        left: 0px;
        background-color: #344a5f;
    }
    .el-menu-vertical-demo /deep/  .el-submenu .el-submenu-item.isactive{
    background-color: #f56c6c !important;
    }   
    .logo{
        display: block;
        margin: 28px auto 25px;
        width: 92px;
        height: 92px;
    }

</style>
