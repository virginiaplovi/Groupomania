<template>
    <div class="container mx-auto mt-5">
        <div class="row d-flex justify-content-center">
            <div class="card card2 border-0 mt-5 mx-3">
                <div class="row px-3">
                    <img class="profile-pic mr-3" src="logo2.png" />
                    <div class="flex-column">
                        <h3 class="mb-0 font-weight-normal">{{ firstName }} {{ lastName }}</h3>
                    </div>
                </div>
                <div class="row px-3 form-group">
                    <textarea class="text-muted bg-light mt-4 mb-3" v-model="message" :placeholder="placeholder"></textarea>
                </div>
                <div class="row px-3 form-group">
                    <div class="justify-content-center"><input @change="onFileChange()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png" /></div>
                    <button type="submit" @click.prevent="addPost()" class="btn btn-post ml-auto">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name: "AddPost",
    data() {
        return {
            message: "",
            image: "",
            file: null,
            userID: "",
            firstName: "",
            lastName: "",
            placeholder: ""
        };
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.image = URL.createObjectURL(this.file);
        },
        addPost() {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                
            });
            const formData = new FormData();
            formData.set("image", this.file);
            formData.set("UserID", this.userID.toString());
            formData.set("Message", this.message.toString());
            axios.post("http://localhost:5000/post", formData).then(() => {
                Toast.fire({
                    text: "Post created successfully!",
                    icon: "success",
                    willClose: () => {
                        location.reload();
                    },
                });
            }).catch((error) => {console.log(error)})
        },
    },
    created: function () {
        const user = JSON.parse(localStorage.getItem("user"));
        this.userID = user.UserID;
        this.firstName = user.FirstName;
        this.lastName = user.LastName;
        this.placeholder = 'Hi ' + this.firstName + ', what is on your mind today?';
    },
};
</script>

<style>
.card2 {
    border-radius: 10px;
    width: 600px;
    padding: 20px;
}

.profile-pic {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
}

textarea {
    padding: 15px 20px;
    border-radius: 10px;
    box-sizing: border-box;
    color: #616161;
    border: 1px solid #f5f5f5;
    font-size: 16px;
    letter-spacing: 1px;
    height: 120px !important;
    width: 100%;
}

textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #fd2b0162 !important;
    outline-width: 0 !important;
}

::placeholder {
    color: #bdbdbd;
}

:-ms-input-placeholder {
    color: #bdbdbd;
}

::-ms-input-placeholder {
    color: #bdbdbd;
}

.btn-post {
    border-radius: 50px;
    padding: 4px 40px;
    background-color: #fd2b01b8;
    color: #FECABF;
}
.btn-post:hover {
    background-color: #fd2b01ce;
    color: white;
}

.options {
    font-size: 23px;
    color: #757575;
    cursor: pointer;
}

.options:hover {
    color: #000;
}
</style>
