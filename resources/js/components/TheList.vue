<template>
    <div v-if="!loader"
         v-for="task of tasks"
         :key="task.id"
         class="container md:mx-auto px-3 py-3">
        <div class="md:flex flex-row p-3 rounded bg-gray-800">
            <div class="basis-3/4 md:flex justify-between space-x-5">
                <div class="md:mt-4">
                    <div class="flex items-center space-x-3">
                        <input
                            @change="changeText(task.id, $event)"
                            :key="task.id"
                            id="checked-checkbox" type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <div :id="task.id" class="flex items-center"><p>{{ task.title }}</p></div>
                    </div>
                </div>

            </div>
            <div class="basis-1/4 md:flex md:justify-between justify-center md:space-x-5 ">
                <!---->
                <div class="flex-initial  mt-2">
                    <div
                        :class="statusType(task.status)[0]"
                        class="flex-initial text-white font-medium rounded-full text-sm px-4 py-3 text-center mr-2 mb-2 ">
                        {{ statusType(task.status)[1] }}
                    </div>
                </div>
                <!-- -->
                <!-- deadline -->
                <div
                    :class="deadlineType(task.deadline).border"
                    class="h-11 w-[140px] mx-auto mt-2 border p-2 rounded space-x-2 flex-none">
                    <svg fill="none"
                         :class="deadlineType(task.deadline).text"
                         class="inline w-6 h-6 " stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p
                        :class="deadlineType(task.deadline).text"
                        class="inline h-6 text-left">{{ task.deadline }}</p>
                </div>
                <!-- deadline end -->
                <div class="w-full mt-2 md:mt-0  md:w-auto">
                    <div class="flex justify-between space-x-6 ">
                        <!--edit start-->
                        <div class="w-full flex justify-end ">
                            <svg @click="editTask(task)" fill="none"
                                 class="cursor-pointer  w-6 h-6 text-gray-500 dark:text-blue-300" stroke="currentColor"
                                 stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                 aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <!--edit end-->
                        <!--delete start-->
                        <div class="flex justify-end">
                            <svg @click="deleteTask(task)" fill="none" stroke="currentColor"
                                 class="cursor-pointer w-6 h-6 text-gray-500 dark:text-red-300" stroke-width="1.5"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            </svg>
                        </div>
                    </div>
                    <!--delete end-->
                    <!-- date of publication start-->
                    <div class="md:w-[145px] text-right space-x-2 mt-2 ">
                        <svg fill="none" stroke="currentColor"
                             class="inline-block w-5 h-5 text-gray-500 dark:text-gray-500" stroke-width="1.5"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                        </svg>
                        <p class="inline-block">{{ task.humansDate }}</p>
                    </div>
                    <!-- date of publication end-->
                </div>
            </div>
        </div>
    </div>
    <div v-else class="container text-center mx-auto px-3 py-3">
        <the-loader/>
    </div>
    <div v-if="tasks.length === 0" class="container text-sm text-center md:mx-full px-3 py-3">
        <h1>Потрібно добавити собі трішки тасків =)</h1>
    </div>

</template>
<script>
import TheLoader from "./TheLoader.vue";
import store from "../store";
import {ref, computed, watch} from "vue";
import deadlineTypeUtility from "../utils/deadline-utility";
import statusTypeUtility from "../utils/statusType-utility";
import changeTextUtility from "../utils/changeText-utility";

export default {
    name: "TheList",
    props: ['tasks',],
    emits: ['editTask', 'deleteTask'],
    components: {TheLoader},

    setup(props, {emit}) {

        const editTask = task => {
            emit('editTask', task)
        }
        const deleteTask = task => {

            emit('deleteTask', task)
        }
        return {
            deadlineType: deadlineTypeUtility,
            statusType: statusTypeUtility,
            changeText: changeTextUtility,
            loader: computed(() => store.getters['getLoader']),
            editTask, deleteTask,
        }
    }
}
</script>

<style scoped>

</style>
