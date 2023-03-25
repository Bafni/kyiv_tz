<template>
    <the-add-form
        v-model:title="title"
        @actionModal="actionAdd"
    />
    <the-select/>
    <the-list
        v-if="tasks.length !== 0"
        :tasks="request(tasks)"
        @editTask="editTask"
        @deleteTask="deleteTask"
    />

    <div v-if="tasks.length !== 0" class="container text-center md:mx-full px-3 py-3">
        <nav aria-label="Page navigation ">
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
                :page-link-class="'px-3 py-2 hidden md:block cursor-pointer leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
"
                :prev-link-class="'px-3 py-2 ml-0 cursor-pointer  leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                :next-link-class="'px-3 py-2 cursor-pointer leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'"
                :prev-text="'Prev'"
                :next-text="'Next'"
            />
        </nav>
    </div>

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
import TheSelect from "../components/TheSelect.vue";
import TheList from "../components/TheList.vue";
import TheModal from "../components/TheModal.vue";
import TheLoader from "../components/TheLoader.vue";
import {ref, computed, onMounted} from "vue";
import {useField, useForm} from 'vee-validate'
import store from "../store";
import * as yup from "yup";
import Paginate from 'vuejs-paginate-next'
import {useRoute, useRouter} from "vue-router"

export default {
    name: "Main",
    components: {
        TheLoader,
        TheAddForm, TheSelect, TheList, TheModal, Paginate
    },
    setup() {

        onMounted(() => {
            store.dispatch('getTasks')
        })


        const page = ref(1)
        const pageRange = ref(5)
        const margiPage = ref(5)

        const pageCount = computed(() => Math.ceil(tasks.value.length / pageRange.value))

        const router = useRouter()

        const request = (items) => {
            if (page.value !== 1) {
                return items.slice((pageRange.value * page.value) - pageRange.value, (pageRange.value * page.value))
            }

            return items.slice(0, 5)
        }

        const clickCallback = num => {
            page.value = num
            router.replace(`/?page=${num}`)
            if (num === 1) {
                router.replace('/')
            }

        }

        const tasks = computed(() => store.getters['getTasks'])

        const {handleSubmit, resetField} = useForm()

        const {value: title, errorMessage: titleE, handleBlur: titleBlur} = useField('title',
            yup.string().trim().required()
        )
        const {value: deadline, errorMessage: deadlineE, handleBlur: deadlineBlur} = useField('deadline',
            yup.date().required(),
        )
        const {value: id} = useField('id')

        const {value: status} = useField('status')

        const btnName = ref('')

        const eventType = ref('')

        const actionAdd = () => {
            btnName.value = 'Create Task'
            eventType.value = 'createTask'
            store.commit('openModal')
        }
        const editTask = task => {
            btnName.value = 'Edit Task'
            eventType.value = 'editTask'
            id.value = task.id
            title.value = task.title
            deadline.value = task.deadline
            status.value = task.status
            store.commit('setIsEdit', true)
            store.commit('openModal')
        }
        const deleteTask = task => {
            store.dispatch('deleteTask', task.id)
        }
        const onSubmit = handleSubmit(async values => {

            await store.dispatch(`${eventType.value}`, values)
            const e = await store.getters['getValidateE']
            if (!e) {
                resetField('title')
                resetField('deadline')
            }
        })

        return {
            page, pageRange, pageCount, margiPage, clickCallback,
            request,

            deleteTask,
            editTask,
            onSubmit,
            btnName,
            actionAdd,
            status,
            title, titleE, titleBlur,
            deadline, deadlineE, deadlineBlur,
            tasks,
        }
    }
}
</script>

<style scoped>

</style>
