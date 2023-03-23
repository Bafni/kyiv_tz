<template>
    <div class="container md:mx-auto px-3">
        <div class="p-4 bg-gray-800">
<!--            <form @submit.prevent="createTask" >-->
            <form @submit.prevent="$emit('actionModal', $event.target.value)" >
                <label for="add_new"
                       class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg fill="none" class="w-5 h-5 text-gray-500 dark:text-gray-400" stroke="currentColor"
                             stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 4.5v15m7.5-7.5h-15"></path>
                        </svg>
                    </div>
                    <input
                        :value="title"
                        @input="$emit('update:title', $event.target.value)"
                        type="text" id="add_new"
                           class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Add new...">
                    <button
                        type="submit"
                            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add new
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import store from "../store";

export default {
    name: "TheAddForm",
    props:['title', 'titleBlur', 'titleE',],
    emits:['create', 'update:title', 'actionModal'],
    setup(props,{emit}) {
        const createTask = () => {
            store.commit('openModal')
            emit('create', props.title)
        }
        return {
            createTask

        }
    }

}
</script>

<style scoped>

</style>
