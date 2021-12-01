<template>
    <div class="home">        
        <NavBar></NavBar>
        <router-view name='a'/>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'


export default {
    name: 'Home',
    components: {
        NavBar,
        
    }
}
</script>
<style>

</style>