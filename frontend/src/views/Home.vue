<template>
    <div class="home">
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
    name: "Hpme",
    components: {
        LoginForm,
        LoginSignupCard,
    },
};
</script>

<style></style>
