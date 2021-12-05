<template>
    <div class="post">
        <div class="container my-2 p-3 d-flex justify-content-center" v-for="post in posts" :key="post.PostID">
            <div class="card1">
                
                    <div class="bg-white ">
                        <div class="d-flex flex-row user p-2">
                            <img class="rounded-circle" src="logo2.png" width="50" />
                            <div class="d-flex flex-column ml-2">
                                <span class="name font-weight-bold">{{ post.user.FirstName }} {{ post.user.LastName }}</span
                                ><span>{{ post.CreatedAt | formatDate }}</span>
                            </div>
                        </div>
                        <div class="mt-2 p-2">
                            <!-- <img src="https://i.imgur.com/xhzhaGA.jpg" class="img-fluid" /> -->
                            <p class="post-content">{{ post.Message }}</p>
                        </div>
                        <div class="d-flex justify-content-between p-3 border-top">
                            <div class="btn-group" role="group">
                                <button v-if="post.user.UserID == userID" class="btn btn1 btn-danger p-2">Edit</button>
                                <button v-if="post.user.UserID == userID" class="btn btn1 btn-danger p-2" @click="deletePost(post.PostID)">Delete</button>
                            </div>
                            <div class="d-flex align-items-center border-left px-3 likes"><i class="far fa-thumbs-up"></i><span class="ml-2">6</span></div>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";


export default {
    name: "Post",
    data() {
        return {
            posts: [],
            userID: "",
            
        };
    },
    methods: {
        async getAllPost() {
            try {
                const response = await axios.get(`http://localhost:5000/post`);
                this.posts = response.data;
            } catch (err) {
                console.log(err);
            }
        },
        async deletePost(id) {
            try {
                await axios.delete(`http://localhost:5000/post/${id}`);
                this.getAllPost();
            } catch (err) {
                console.log(err);
            }
        },
    
    },
    created() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.userID = user.UserID;
        this.getAllPost();
    },
};
</script>
<style>
.name {
    font-size: 20px;
    color: #ed7265;
}

.post-content {
    font-size: 14px;
}

.likes {
    color: #ed7265;
}
</style>
