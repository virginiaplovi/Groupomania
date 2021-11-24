<template>
  <!-- First Row -->
  <form @submit.prevent="handleSubmit" autocomplete="off">
    <div class="form-row">
      <div class="col">
        <div class="form-group fadeIn second">
          <label for="firstName"
            ><i class="fas fa-pencil-alt"></i> First Name</label
          >
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            placeholder="Enter your First Name"
            v-model="firstName"
            :class="{ 'is-invalid': isSubmitted && $v.firstName.$error }"
          />
          <div
            v-if="isSubmitted && !$v.firstName.required"
            class="invalid-feedback"
          >
            First Name field is required
          </div>
        </div>
      </div>

      <div class="col">
        <div class="form-group fadeIn second">
          <label for="lastName"
            ><i class="fas fa-pencil-alt"></i> Last Name</label
          >
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="lastName"
            placeholder="Enter your Last Name"
            v-model="lastName"
            :class="{ 'is-invalid': isSubmitted && $v.lastName.$error }"
          />
          <div
            v-if="isSubmitted && !$v.lastName.required"
            class="invalid-feedback"
          >
            Last Name Name field is required
          </div>
        </div>
      </div>
    </div>
    <!-- Second Row -->
    <div class="form-row">
      <div class="col">
        <div class="form-group fadeIn third">
          <label for="password"
            ><i class="fas fa-unlock-alt"></i> Password</label
          >
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Create a new Password"
            v-model="password"
            :class="{ 'is-invalid': isSubmitted && $v.password.$error }"
          />
          <div
            v-if="isSubmitted && $v.password.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.password.required">Password field is required</span>
            <span v-if="!$v.password.minLength"
              >Password should be at least 6 characters long</span
            >
          </div>
        </div>
      </div>

      <div class="col">
        <div class="form-group fadeIn third">
          <label for="confirmPassword"
            ><i class="fas fa-unlock-alt"></i> Confirm Password</label
          >
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your Password"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && $v.confirmPassword.$error }"
          />
          <div
            v-if="isSubmitted && $v.confirmPassword.$error"
            class="invalid-feedback"
          >
            <span v-if="!$v.confirmPassword.required"
              >Confirm Password field is required</span
            >
            <span v-else-if="!$v.confirmPassword.sameAsPassword"
              >Passwords should be matched</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="form-group fadeIn second">
          <label for="email"><i class="fas fa-at"></i> Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            v-model="email"
            :class="{ 'is-invalid': isSubmitted && $v.email.$error }"
          />
          <div v-if="isSubmitted && $v.email.$error" class="invalid-feedback">
            <span v-if="!$v.email.required">Email field is required</span>
            <span v-if="!$v.email.email">Please provide valid email</span>
            <!-- <span v-if="!$v.email.isUnique"
              >This email is already registered.</span
            > -->
            <div class="error" v-if="!$v.username.isUnique"></div>
          </div>
        </div>
      </div>

      <div class="col align-self-end">
        <div class="form-group fadeIn third">
          <button class="btn btn-danger fadeIn fourth">Signup</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isSubmitted: false,
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password"),
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
          .post("http://localhost:5000/auth/signup", {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Password: this.password,
          })
          .then((data) => {
            console.log(data);
            let timerInterval;
            Swal.fire({
              icon: "success",
              title: "Thank you for joining us!",
              html: "You will be redirected to the login page in <b></b> seconds.",
              timer: 5000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  Swal.getHtmlContainer().querySelector("b").textContent = (
                    Swal.getTimerLeft() / 1000
                  ).toFixed(0);
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
          })
          .catch((error) => {
            console.log(error.response.data.error);
            Swal.fire({
              icon: "error",
              title: "This email address is already being used",
              text: "If it's you, go back and Login. Otherwise, choose another email.",
              showConfirmButton: false,
              showCancelButton: true
            });
          });
      }
    },
  },
};
</script>
