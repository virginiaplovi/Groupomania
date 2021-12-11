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
                        <div class="d-flex align-items-center border-left px-3 likes">
                            <span v-if="!seens.includes(post.PostID)"><i class="fas fa-eye mx-2"></i>
                            <input  type="checkbox" :value="post.PostID" @change="markRead(post.PostID, $event)" /> Mark as read</span>
                            <span v-else class="text-muted"><i class="fas fa-check-square"></i> Read</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="noPost" class="text-center mt-5">
            <p class="h2">Sorry, there are no post to show...</p>
            <p class="h3">Be the first by adding a new post!</p>
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
import Swal from "sweetalert2";

export default {
    name: "Post",
    data() {
        return {
            posts: [],
            userID: "",
            scTimer: 0,
            scY: 0,
            noPost: false,
            seenPost: [],
            seens: []
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        //Get all post to display with the for each loop
        async getAllPost() {
            try {
                const response = await axios.get(`http://localhost:5000/post`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                const allPost = response.data;
                if (allPost.length === 0) {
                    this.noPost = true;
                } else {
                    this.noPost = false;
                    this.posts = allPost;
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deletePost(id) {
            try {
                await axios.delete(`http://localhost:5000/post/${id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.getAllPost();
                location.reload();
            } catch (err) {
                console.log(err);
            }
        },
        // Function to scroll to top page
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
        //On change event, mark post as read
        markRead(id, event) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            // If checkbox is checked
            if (event.target.checked) {
                axios
                    .post(
                        "http://localhost:5000/seen",
                        {
                            UserID: this.userID,
                            PostID: id,
                        },
                        { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } }
                    )
                    .then(() => {
                        Toast.fire({
                            text: "Marked as read!",
                            icon: "success",
                            willClose: () => {
                                location.reload();
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        // Get all the post read by the user logged in
        async checkRead() {
            try {
                const response = await axios.get(`http://localhost:5000/seen/auth/${this.userID}`, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } });
                this.seenPost = response.data.seens;
                // Filter the respons to return the PostID
                let valObj = this.seenPost.filter(function (elem) {
                    if (elem.UserID) return elem.PostID;
                });
                // Push all the PostID in the Array seenPostID
                for (let i = 0; i < valObj.length; i++) {
                    let seenPostID = valObj[i].PostID                   
                    this.seens.push(seenPostID)
                }
                
                console.log(this.seens)
            } catch (err) {
                console.log(err);
            }
        },
    },
    created() {
        //Get the user logged in id from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        this.userID = user.UserID;
        this.getAllPost();
        this.checkRead();
    },
};
</script>
<style>
.post-content {
    font-size: 14px;
}

.likes {
    color: #fd2b01b8;
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
