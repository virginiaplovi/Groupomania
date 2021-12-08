<template>
    <div class="post">
        <div class="container my-2 p-3 d-flex justify-content-center" v-for="post in posts" :key="post.PostID">
            <div class="card card2 border-0 pb-0">
                <div class="bg-white">
                    <div class="d-flex flex-row user p-2">
                        <img class="rounded-circle profile-pic mr-3" src="logo2.png" width="50" />
                        <div class="d-flex flex-column ml-2">
                            <span class="name font-weight-bold">{{ post.user.FirstName }} {{ post.user.LastName }}</span
                            ><span>{{ post.CreatedAt | formatDate }}</span>
                        </div>
                    </div>
                    <router-link :to="{ name: 'OnePost', params: { id: post.PostID } }" class="text-decoration-none text-muted">
                        <div class="mt-2 p-2">
                            <p class="post-content mb-2">{{ post.Message }}</p>
                            <div v-if="post.ImageUrl">
                                <img :src="post.ImageUrl" class="img-fluid" />
                            </div>
                        </div>
                    </router-link>
                    <div class="d-flex justify-content-between p-3 border-top">
                        <div class="btn-group" role="group">
                            <router-link :to="{ name: 'EditPost', params: { id: post.PostID } }" class="btn btn-post" v-if="post.user.UserID == userID">Edit</router-link>
                            <button v-if="post.user.UserID == userID" class="btn btn-post" @click="deletePost(post.PostID)">Delete</button>
                        </div>
                        <div class="d-flex align-items-center border-left px-3 likes"><i class="far fa-thumbs-up"></i><span class="ml-2">6</span></div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div id="pagetop" class="" v-show="scY > 300" @click="toTop">
                <i class="fas fa-angle-double-up h3"></i>
            </div>
        </transition>
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
            scTimer: 0,
            scY: 0,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
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
        handleScroll: function () {
            if (this.scTimer) return;
            this.scTimer = setTimeout(() => {
                this.scY = window.scrollY;
                clearTimeout(this.scTimer);
                this.scTimer = 0;
            }, 100);
        },
        toTop: function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
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
.post-content {
    font-size: 14px;
}

.likes {
    color: #fd2b01b8;;
}
#pagetop {
    position: fixed;
    bottom: 20px;
    right: 40px;
}

.fa-angle-double-up {
    color: #fd2b01b8;
}

</style>
