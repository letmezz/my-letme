<template>
    <div id="Main">
        <router-view />
    </div>
    
</template>

<script>
export default{
    name:'Main',
    data (){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
    #Main{
        position: fixed;
        left: 250px;
        right: 0px;
        top: 75px;
        bottom: 0px;
        -webkit-box-sizing: border; 
        border: 30px solid #f7f7f7; 
        border-bottom: none;
    }

</style>