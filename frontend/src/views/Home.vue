<template>
    <div class="home">        
        <NavBar></NavBar>
        <router-view name='a'/>
        <Post></Post>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import Post from '../components/Post.vue'


export default {
    name: 'Home',
    components: {
        NavBar,
        Post
        
    }
}
</script>
<style>

</style>