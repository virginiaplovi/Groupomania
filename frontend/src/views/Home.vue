<template>
    <div class="home">        
        <NavBar></NavBar>
        <AddPost></AddPost>
        <Post></Post>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import Post from '../components/Post.vue'
import AddPost from '../components/AddPost.vue'


export default {
    name: 'Home',
    components: {
        NavBar,
        AddPost,
        Post
    }
}
</script>
<style>

</style>