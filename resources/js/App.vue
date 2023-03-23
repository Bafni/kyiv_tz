<template>
    <div class="container mx-auto">
        <div class="my-12 text-red-800 text-center text-3xl font-bold underline">
            <h1 class="text-3xl font-extrabold dark:text-white">My Todo-s</h1>
        </div>
    </div>
<router-view></router-view>

</template>

<script>
//import TheModal from "./components/TheModal.vue";

import {onMounted}  from 'vue'
export default {
    name: "App",
    components: {/*TheModal*/},
    setup(){
        return {

        }
    }
}
</script>

<style scoped>

</style>
