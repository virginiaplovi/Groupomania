<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group fadeIn second">
            <label for="email"><i class="fas fa-at"></i> Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" v-model="email" :class="{ 'is-invalid': isSubmitted && $v.email.$error }" />
            <div v-if="isSubmitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Email field is required</span>
                <span v-if="!$v.email.email">Please provide valid email</span>
            </div>
        </div>
        <div class="form-group fadeIn third">
            <label for="password"><i class="fas fa-unlock-alt"></i> Password</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" v-model="password" :class="{ 'is-invalid': isSubmitted && $v.password.$error }" />
            <div v-if="isSubmitted && $v.password.$error" class="invalid-feedback">
                <span v-if="!$v.password.required">Password field is required</span>
            </div>
        </div>
        <button class="btn btn-danger fadeIn fourth">Login</button>
    </form>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
            isSubmitted: false,
        };
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
        },
    },
    methods: {
        handleSubmit() {
            this.isSubmitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                axios
                    .post("http://localhost:5000/auth/login", {
                        Email: this.email,
                        Password: this.password,
                    })
                    .then((res) => {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        const user = JSON.parse(localStorage.getItem('user'));
                        const FullName = user.FirstName + " " + user.LastName;
                        let timerInterval;
                        Swal.fire({
                            icon: "success",
                            title: "Welcome back " + FullName + "!",
                            html: "You will be redirected to the home page in <b></b> seconds.",
                            timer: 5000,
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
                        })
                        // .then((result) => {
                        //     if (result.dismiss === Swal.DismissReason.timer) {
                        //         this.$router.push("/");
                        //     }
                        // });
                    })
                    .catch((error) => {
                        const codeError = error.message.split("code ")[1];
                        let messageError = "";
                        switch (codeError) {
                            case "401":
                                messageError = "The password you entered is incorrect. Please try again.";
                                break;
                            case "404":
                                messageError = "The email address that you've entered doesn't match any account.";
                                break;
                        }
                        Swal.fire({
                            icon: "error",
                            title: "Ops!",
                            text: messageError || error.message,
                            showConfirmButton: false,
                            showCancelButton: true,
                        });
                    });
            }
        },
    },
};
</script>
