<template>
    <div class="login">
        <LoginSignupCard>
            <template v-slot:form>
                <LoginForm></LoginForm>
            </template>
            <template v-slot:link>
                <div>Not a member?</div>
                <router-link to="/signup" class="underlineHover">Register here!</router-link>
            </template>
        </LoginSignupCard>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import LoginSignupCard from "../components/LoginSignupCard.vue";

export default {
    name: "Login",
    components: {
        LoginForm,
        LoginSignupCard,
    },
};
</script>

<style></style>
