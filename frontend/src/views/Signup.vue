<template>
    <div class="Signup">
        <LoginSignupCard>
            <template v-slot:form>
                <!-- Registration form -->
                <SignupForm></SignupForm>
            </template>
            <template v-slot:link>
                <div>Already a member?</div>
                <router-link to="/" class="underlineHover">Login here!</router-link>
            </template>
        </LoginSignupCard>
    </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginSignupCard from "../components/LoginSignupCard.vue";

export default {
    name: "Signup",
    components: {
        SignupForm,
        LoginSignupCard,
    },
};
</script>

<style></style>
