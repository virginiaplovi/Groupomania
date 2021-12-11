<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>

export default {
    // set a title for pages
    watch: {
        $route: {
            handler: (to) => {
                document.title = to.meta.title || "Your Website";
            },
            immediate: true,
        },
    },
    
};
</script>
<style lang="scss">
html {
    overflow-y: overlay;
}

body {
    font-family: "Nunito", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f2f6e9;
}

#nav {
    padding: 10px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
