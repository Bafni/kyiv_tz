<template>
    <the-add-form/>
    <the-select/>
    <the-list
        :tasks="tasks"
    />

</template>

<script>
import TheAddForm from "../components/TheAddForm.vue";
import TheSelect from "../components/TheSelect.vue";
import TheList from "../components/TheList.vue";
import {computed, onMounted} from "vue";
import store from "../store";
export default {
    name: "Main",
    components: {
        TheAddForm, TheSelect, TheList
    },
    setup() {
        onMounted(async ()=> {
           await store.dispatch('getTasks')

        })
        return {
            tasks: computed(() => store.getters['getTasks'])
        }
    }
}
</script>

<style scoped>

</style>
