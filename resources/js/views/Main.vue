<template>
    <the-add-form
        v-model:title="title"
        @actionModal="actionAdd"
    />
    <div class="container py-6 md:mx-auto px-3">
        <div class="md:flex md:justify-end text-center md:space-x-5">
            <the-filter
                v-model:filter="filter"
                :options="filterOptions"
                @filterBy="filterBy"
                filterName="Filter"
                forId="filter"
            />
            <the-filter
                v-model:filter="sortBy"
                :options="sortOptions"
                @filterBy="getSortBy"
                filterName="Sort"
                forId="sort"
            />
        </div>
    </div>
<!--   :tasks="request(tasks)"  -->
    <the-list
        v-if="tasks.length !== 0"
        :tasks="tasks"
        @editTask="editTask"
        @deleteTask="deleteTask"
    />
    <div v-if="tasks && tasks.length !== 0" class="container text-center mx-auto px-3 py-3">
        <ThePagination />
    </div>
<!--    <div v-show="false" v-if="tasks" class="container text-center mx-auto px-3 py-3">
        <nav v-if="tasks.length !== 0" aria-label="Page navigation ">
            <paginate
                v-model="page"
                :page-count="pageCount"
                :page-range="pageRange"
                :margin-pages="margiPage"
                :click-handler="clickCallback"
                :container-class="'inline-flex -space-x-px'"
                :active-class="'dark:bg-gray-500 dark:text-white'"
                :disabled-class="'dark:hover:none dark:bg-gray-900 pointer-events-none'"
                :no-li-surround="true"
                :page-link-class="'px-3 py-2 hidden md:block cursor-pointer leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                :prev-link-class="'px-3 py-2 ml-0 cursor-pointer  leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                :next-link-class="'px-3 py-2 cursor-pointer leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                :prev-text="'Prev'"
                :next-text="'Next'"
            />
        </nav>
    </div>-->
    <teleport to="body">
        <the-modal
            v-model:status="status"
            v-model:title="title"
            v-model:deadline="deadline"
            @onSubmit="onSubmit"
            :btnName="btnName"
            @title-blur="titleBlur"
            :title-e="titleE"
            :deadline-e="deadlineE"
            @deadline-blur="deadlineBlur"
        />
    </teleport>
</template>

<script>
import TheAddForm from "../components/TheAddForm.vue";
import TheList from "../components/TheList.vue";
import TheModal from "../components/TheModal.vue";
import TheLoader from "../components/TheLoader.vue";
import TheFilter from "../components/TheFilter.vue";
import ThePagination from "../components/ThePagination.vue";
import {computed, onMounted, ref} from "vue";
import store from "../store";
import Paginate from 'vuejs-paginate-next'
import paginateModule from "../modules/paginate-vue-module";
import validateModule from "../modules/validate-module";
import actionsModule from "../modules/actions-module"
import filterModule from "../modules/filter-module";
import selectModule from "../modules/select-module";
export default {
    name: "Main",
    components: {TheLoader, TheAddForm, TheList, TheModal, Paginate, TheFilter, ThePagination},
    setup() {
        onMounted(() => {
            store.dispatch('getTasks')
        })
        const btnName = ref('')
        const eventType = ref('')
        const validate = validateModule(eventType)
        const actions = actionsModule(btnName, eventType, validate)

        return {
            ...filterModule(),
            ...selectModule(),
           // ...paginateModule(),
            ...validate,
            ...actions,
            btnName,
            tasks: computed(() => store.getters['getTasks'])
        }
    }
}
</script>

<style scoped>

</style>
