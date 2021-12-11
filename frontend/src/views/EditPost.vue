<template>
    <div class="EditPost">
        <NavBar></NavBar>
        <div class="container mx-auto mt-5">
            <div class="row d-flex justify-content-center">
                <div class="card card2 border-0 mt-5 mx-3">
                    <div class="row px-3">
                        <img class="profile-pic mr-3" src="logo2.png" />
                        <div class="flex-column">
                            <h3 class="mb-0 font-weight-normal" v-if="post.user">{{ post.user.FirstName }} {{ post.user.LastName }}</h3>
                        </div>
                    </div>
                    <div class="row px-3 form-group">
                        <textarea class="text-muted bg-light mt-4 mb-3" v-model="newMessage" :placeholder="placeholder"></textarea>
                    </div>
                    <div class="row px-3 form-group">
                        <div class="justify-content-center"><input @change="onFileChange()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png" /></div>
                        <button type="submit" @click.prevent="editPost()" class="btn btn-post ml-auto">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar.vue";
export default {
    name: "EditPost",
    components: {
        NavBar,
    },
    data() {
        return {
            post: [],
            userID: "",
            newMessage: "",
            placeholder: "",
            newImage: "",
            file: null,
        };
    },
    methods: {
        // Get one post and set the message as the input placeholder 
        getOnePost() {
            axios
                .get(`http://localhost:5000/post/${this.$route.params.id}`, { headers: { "Authorization":"Bearer " + localStorage.getItem("jwt") }})
                .then((response) => {
                    this.post = response.data;
                    this.newMessage = this.post.Message;
                    this.placeholder = this.post.Message;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file);
        },
        editPost() {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            //Create a formData that contain the file to send with put request
            const formData = new FormData();
            formData.set("image", this.file);
            formData.set("Message", this.newMessage.toString());
            axios
                .put(`http://localhost:5000/post/${this.$route.params.id}`, formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("jwt") }})
                .then(() => {
                    Toast.fire({
                        text: "Post update successfully!",
                        icon: "success",
                        willClose: () => {
                            this.$router.push(`/post/${this.$route.params.id}`);
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {
        //Get the user logged in id from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        this.userID = user.UserID;

        this.getOnePost();
    },
    //Check if the user logged in is the user that create the post, if not redirect to homepage
    beforeMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        let userLogged = user.UserID;
        console.log(userLogged);
        axios
            .get(`http://localhost:5000/post/${this.$route.params.id}`, { headers: { "Authorization":"Bearer " + localStorage.getItem("jwt") }})
            .then((response) => {
                console.log(response);
                let userPost = response.data.UserID;
                console.log(userPost);
                if (userPost !== userLogged) {
                    this.$router.push(`/home`);
                }
            })
            .catch((error) => {
                error;
            });
    },
};
</script>
<style></style>
