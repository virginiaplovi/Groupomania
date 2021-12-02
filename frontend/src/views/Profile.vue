<template>
    <div class="profile">
        <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div class="card p-4">
                <div class="image d-flex flex-column justify-content-center align-items-center">
                    <button class="btn btn0 btn-danger"><img src="logo2.png" height="100" width="100" /></button>
                    <span class="name mt-3">{{ firstName }} {{ lastName }}</span>
                    <span class="idd">{{ email }}</span>

                    <div class="d-flex mt-2"><button v-if="paramsID == userID" class="btn1 btn-danger" @click="deleteAccount">Delete Profile</button></div>
                    <div class="px-2 rounded mt-4 date">
                        <span class="join">Joined on {{ createdAt | formatDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "Profile",
    components: {},
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            createdAt: "",
            paramsID: this.$route.params.id,
            userID: "",
        };
    },
    methods: {
        // Get Product By Id
        async getUserById() {
            try {
                const response = await axios.get(`http://localhost:5000/auth/${this.$route.params.id}`);
                this.firstName = response.data.FirstName;
                this.lastName = response.data.LastName;
                this.email = response.data.Email;
                this.createdAt = response.data.createdAt;
            } catch (err) {
                console.log(err);
            }
        },
        deleteAccount() {
            Swal.fire({
                title: "Are you sure you want to delete your account?",
                text: "You won't be able to revert this and your post will be lost!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:5000/auth/${this.$route.params.id}`).then((response) => {
                        console.log(response);
                        localStorage.clear();
                        Swal.fire("Deleted!", "Your account has been deleted.", "success");
                        this.$router.push("/");
                    });
                    
                }
            });
        },
    },
    created: function () {
        const user = JSON.parse(localStorage.getItem("user"));
        this.userID = user.UserID;
        // this.lastName = user.LastName;
        // this.email = user.Email;
        // this.createdAt = user.CreatedAt;

        this.getUserById();
    },
};
</script>
<style>
.card {
    width: 600px;
    background-color: #ffd7d7;
    border: none;
    transition: all 0.5s;
}

.image img {
    transition: all 0.5s;
}

.card:hover .image img {
    transform: scale(1.5);
}

.btn0 {
    height: 140px;
    width: 140px;
    border-radius: 50%;
}

.name {
    font-size: 22px;
    font-weight: bold;
    color: #545454;
}

.idd {
    font-size: 14px;
    font-weight: 600;
    color: #545454;
}

.number {
    font-size: 22px;
    font-weight: bold;
}

.post {
    font-size: 12px;
    font-weight: 500;
    color: #444444;
}

.btn1 {
    height: 40px;
    width: 150px;
    border: none;
    background-color: #ed7265;
    color: #ffd7d7;
    font-size: 15px;
}

.join {
    font-size: 14px;
    color: #a0a0a0;
    font-weight: bold;
}

.date {
    background-color: #ccc;
}
</style>
