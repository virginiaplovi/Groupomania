<template>
    <div>
        <nav class="navbar navbar-expand-md">
            <router-link to="/home" class="navbar-brand"><img src="logo2.png" alt="Groupomania Logo" style="max-width: 25px" /></router-link>
            <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#main-navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main-navigation">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/home" class="nav-link">HOME</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'Profile', params: { id: userID } }" class="nav-link">HELLO, {{ userName }}</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="signOut" href="#"><i class="fas fa-sign-out-alt" title="Logout"></i> Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
    name: "NavBar",
    data() {
        return {
            userName: "",
            userID: ""
        };
    },
    created: function () {
        const user = JSON.parse(localStorage.getItem("user"));
        this.userName = user.FirstName + " " + user.LastName;
        this.userID = user.UserID
    },
    methods: {
        signOut() {
            localStorage.clear();
            let timerInterval;
            Swal.fire({
                icon: "info",
                title: "You have been logged out!",
                html: "You will be redirected to the login page in <b></b> seconds.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    timerInterval = setInterval(() => {
                        Swal.getHtmlContainer().querySelector("b").textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    this.$router.push("/");
                }
            });
        },
    },
};
</script>
<style>
.navbar {
    background: #ed7265;
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.145);
}
.nav-link,
.navbar-brand {
    color: #fff;
    cursor: pointer;
}
.nav-link {
    margin-right: 1em !important;
    opacity: 70%;
    text-transform: uppercase;
}
.nav-link:hover {
    color: white;
    opacity: 100%;
}
.navbar-collapse {
    justify-content: flex-end;
}
</style>
