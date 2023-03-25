<template>
    <div v-if="modal">
        <div @click.stop="closeModal"
             class="fixed top-0 right-0 left-0 bottom-0 bg-gray-900/60 ">
        </div>
        <div v-if="!message" class="fixed w-[280px] top-8 left-[calc(13%-1px)] md:top-28 md:left-[calc(12%-1px)] lg:left-[calc(28%-1px)] sm:left-[calc(30%-1px)] md:w-[700px] z-[1000]">
            <div class="relative dark:bg-gray-900 rounded-lg shadow ">
                <div class="p-6 justify-center text-center">
                    <form  @submit.prevent="$emit('onSubmit', $event.target.click)" >
                        <div v-if="isEdit" class="mb-6">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Status</label>
                            <select
                                :value="status"
                                @change="$emit('update:status', $event.target.value)"
                                id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="active">Active</option>
                                <option value="done">Done</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline
                                date</label>

                            <input
                                :value="deadline"
                                :min="minDate"
                                @change="$emit('update:deadline', $event.target.value)"
                                @blur="$emit('deadlineBlur', $event.target.blur)"
                                type="date" id="date"
                                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com">
                            <p v-if="deadlineE" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                class="font-medium">Oh, snapp!</span> {{ deadlineE }}.</p>

                        </div>
                        <div class="mb-6">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                task</label>
                            <textarea
                                :value="title"
                                @input="$emit('update:title', $event.target.value)"
                                @blur="$emit('titleBlur', $event.target.blur)"
                                id="message" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write your thoughts here..."></textarea>
                            <p v-if="titleE || validateE" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                                class="font-medium">Oh, snapp!</span> {{ titleE || validateE }}.</p>

                        </div>
                        <button type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {{ btnName }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div v-else class="fixed left-1/3 sm:left-[calc(50%-1px)] md:left-[calc(40%-1px)] top-1/3 w-auto z-[1000]">
            <div class="relative dark:bg-gray-700 rounded-lg shadow ">
                <div class="p-6 justify-center text-center md:w-80">
                    <h3
                        :class="['mb-5', 'font-semibold', 'italic', 'text-2xl', 'font-normal', 'light:text-gray-500' ]">{{ message }}</h3>
                    <button @click="closeModal" type="button"
                            class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Ok
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import {computed, ref} from 'vue'

export default {
    name: "TheModal",
    props:['title', 'titleBlur', 'titleE', 'deadline', 'deadlineE','deadlineBlur','btnName','status' ],
    emits:['update:title', 'update:deadline', 'onSubmit','titleBlur', 'deadlineBlur', 'update:status'],
    setup(props, {emit}) {
        const closeModal = ()  => {
            store.commit('setIsEdit', false)
            store.commit('closeModal')
            store.commit('setMessage', '')
            emit('update:title', '')
        }
        function addZero(num) {
            if (num >= 0 && num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        }
        const date = new Date()
        const minDate  = ref(addZero(date.getFullYear())+'-' + addZero(date.getMonth() +1 )+ '-' + addZero(date.getDate()))
        return {
            minDate,
            validateE: computed(()=> store.getters['getValidateE']),
            message: computed(()=> store.getters['getMessage']),
            isEdit: computed(() => store.getters['isEdit']),
            modal: computed(() => store.getters['getModal']),
            closeModal
        }
    }
}
</script>

<style scoped>

</style>
