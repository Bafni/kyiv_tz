<template>
    <div class="container py-6 md:mx-auto px-3">
        <div class="md:flex md:justify-end text-center md:space-x-5">
            <div class="md:flex justify-end">
                <label for="filter" class="md:w-full  mx-2 my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter</label>
                <select id="filter"
                        v-model="filter"
                        @change="filterBy"
                        class="md:w-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blockp-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>

                </select></div>
            <div class="md:flex justify-end">
                <label for="sort" class="md:w-full mx-2 my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sort</label>
                <select
                    v-model="sortBy"
                    @change="getSortBy"
                    id="sort"
                        class="md:w-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blockp-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="latest">Recently Added</option>
                    <option value="longAgo">Added long time ago </option>
                    <option value="deadline_hot">Hot Deadline Date</option>
                    <option value="deadline_coming">Upcoming Deadline Date</option>
                </select></div>
        </div>
    </div>
</template>

<script>
import {computed, ref} from 'vue'
import store from "../store";
export default {
    name: "TheFilter",
    setup() {
        const sortBy = ref('')
        const filter = ref('')
        sortBy.value = 'longAgo'
        filter.value = 'all'
        const tasks = computed(()=> store.getters['getTasks'])
        const getSortBy = () => {
            if(sortBy.value === 'latest') {
                tasks.value.sort( (a, b) =>  new Date(b.created_at) - new Date(a.created_at))
            }
            if(sortBy.value === 'longAgo') {
                tasks.value.sort( (a, b) =>  new Date(b.created_at) - new Date(a.created_at))
                tasks.value.reverse()
            }
            if(sortBy.value === 'deadline_hot') {
                tasks.value.sort( (a, b) =>  new Date(b.deadline) - new Date(a.deadline))
                tasks.value.reverse()
            }
            if(sortBy.value === 'deadline_coming') {
                tasks.value.sort( (a, b) =>  new Date(b.deadline) - new Date(a.deadline))
            }
        }
        const filterBy = async () => {
          await  store.dispatch('getTasksFilter',filter.value )
        }
        return {
            sortBy,
            getSortBy,
            filter,
            filterBy,
        }
    }
}
</script>

<style scoped>

</style>
