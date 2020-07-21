<template>
    <div id="Header">
        <div class="Header_menu" @click="NavMenustatus">
            <i class="el-icon-s-operation" style="font-size: 30px; color: gray; padding:  0 32px;"></i>
        </div>
        <div class="Header_icon">
            <div class="Header_edit" @click="loginout">
                <i  class="el-icon-switch-button" style="font-size: 30px; color:gray;"></i>
            </div>
        </div>
        <div class="Header_user">
            管理员
            <!-- {{username}} -->

        </div>
        <div class="clear" style="clear: both;"></div>
    </div>
</template>

<script>
 import { mapMutations } from 'vuex';
export default{
    name:'Header',
    data (){
        return{
            username:this.$store.state.username
        }
    },
    methods:{
        NavMenustatus(){
            this.$store.commit('modifyCollapse')
        },
        ...mapMutations(['DEL_TOKEN']),
        loginout(){
            sessionStorage.clear()
            window.location.reload()
            this.$router.push('/Login')
            this.DEL_TOKEN()
        }
    }
}
</script>

<style lang="scss" scoped>
    #Header{
        position: fixed;
        top: 0px;
        left: 250px;
        height: 75px;
        background-color: white;
        box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
        right: 0px;
    }
    .Header_menu{
        width: 25px;
        height: 75px;
        float: left;
        line-height: 80px;
        
    }
    .Header_icon{
        float: right;
        height: 75px;
    }
    .Header_edit{
        line-height:82px;
        height: 75px;
        border-left: 1px solid gray;
        padding: 0 20px;
    }
    .Header_user{
        margin-left: 1150px;
        height: 75px;
        line-height: 75px;
     
    }
    
</style>