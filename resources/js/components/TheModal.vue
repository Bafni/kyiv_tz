<template>
    <div v-if="modal">
        <div @click.stop="closeModal"
             class="fixed top-0 right-0 left-0 bottom-0 bg-gray-900/60 ">
        </div>
        <div class="fixed top-28 sm:left-[calc(50%-401px)] md:w-[700px] z-[1000]">
            <div class="relative dark:bg-gray-900 rounded-lg shadow ">
                <div class="p-6 justify-center text-center">
                    <form>
                        <div class="mb-6">
                            <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline
                                date</label>
                            <input
                                v-model="deadline"
                                @blur="deadlineBlur"
                                type="date" id="date"
                                class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com">
                            <p v-if="deadlineE" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                class="font-medium">Oh, snapp!</span> {{ deadlineE }}.</p>

                        </div>
                        <div class="mb-6">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                task</label>
                            <textarea
                                v-model="title"
                                @blur="titleBlur"
                                id="message" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."></textarea>
                            <p v-if="titleE" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                class="font-medium">Oh, snapp!</span> {{ titleE }}.</p>

                        </div>
                        <button @click="onSubmit" type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {{ btnName }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import {ref, computed, watch} from 'vue'
import * as yup from "yup";
import {useForm, useField} from 'vee-validate'

export default {
    name: "TheModal",
    setup() {
        const {handleSubmit, resetField} = useForm()
        const event = computed(() => store.getters['getEvent'])
        const btnName = computed(() => store.getters['getBtnName'])
        const storeID = computed(() => store.getters['getId'])
        const storeTitle = computed(() => store.getters['getTitle'])
        const storeDeadline = computed(() => store.getters['getDeadline'])

        const {value: title, errorMessage: titleE, handleBlur: titleBlur} = useField('title',
            yup
                .string()
                .trim()
                .required()
        )
        watch(storeTitle, (O, N) => {
            title.value = O

            store.commit('setTitle', title.value)
        })

        const {value: deadline, errorMessage: deadlineE, handleBlur: deadlineBlur} = useField('deadline',
            yup
                .date()
                .required()
        )
        watch(storeDeadline, (O, N) => {
            deadline.value = O

        })
        const onSubmit = handleSubmit(async values => {
            if (storeID.value) {
                values.id = storeID.value
            }
            await store.dispatch(`${event.value}`, values)
            await store.commit('closeModal')
            resetField('title')
        })

        return {
            btnName,
            onSubmit,
            title,
            titleE, titleBlur,
            deadline, deadlineE, deadlineBlur,
            modal: computed(() => store.getters['getModal']),
            closeModal: () => store.commit('closeModal')
        }
    }
}
</script>

<style scoped>

</style>
