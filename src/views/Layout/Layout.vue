<template>
    <div>
        <LayoutHeader>

        </LayoutHeader>
        <LayoutMain>
    
        </LayoutMain>
        <LayoutNav>
    
        </LayoutNav>
    </div>
    
</template>

<script>
    import LayoutHeader from "@/components/Header.vue"
    import LayoutMain from "@/components/Main.vue"
    import LayoutNav from "@/components/Nav.vue"
    export default{
        name:'Layout',
        data (){
            return{

            }
        },
        components:{
            LayoutHeader,
            LayoutMain,
            LayoutNav
        }
    }
</script>

<style lang="scss" scoped>

</style>