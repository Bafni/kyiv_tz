<template>
    <div class="md:flex justify-end">
        <label :for="forId" class="md:w-full  mx-2 my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{filterName}}</label>
        <select :id="forId"
                :value="filter"
                @change="$emit('filterBy' , $event.target.value)"
                :key="forId"
                class="md:w-auto w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 blockp-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="option  of options" :value="option.value">{{ option.name }}</option>
        </select></div>
</template>

<script>
export default {
    name: "TheFilter",
    props: ['filter', 'update:filter', 'options', 'filterName', 'forId'],
    emits: ['filterBy'],
}
</script>

<style scoped>

</style>
