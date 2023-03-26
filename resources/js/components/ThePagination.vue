<template>
    <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
            <li>
                <a @click.prevent="setPage(pagination.current_page - 1)"
                    href="#"
                   :class="disabled(pagination.current_page === 1 )"
                   class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li v-for="link of pagination.links">
                <template v-if="Number(link.label)">
                    <a

                        @click.prevent="setPage(link.label)"  :key="link.label"
                       :class="active(link.active)"
                       class="hidden md:inline cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ link.label }}</a>
                </template>
            </li>
            <li >
                <a
                    @click.prevent="setPage(pagination.current_page + 1)"
                    href="#"
                    :class="disabled(pagination.current_page === pagination.last_page )"
                    class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import paginationModule from "../modules/pagination-module";
export default {
    name: "ThePagination",
    setup() {
        return {
            ...paginationModule()
        }
    }
}
</script>

<style scoped>

</style>
