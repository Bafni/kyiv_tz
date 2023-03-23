<template>
    <div v-if="!loader"
        v-for="task in tasks"
        :key="task.id"
        class="container md:mx-auto px-3 py-3">
        <div class="md:flex flex-row p-3 rounded bg-gray-800">
            <div class="basis-3/4 md:flex justify-between space-x-5">
                <div class="md:mt-5">
                    <div class="flex items-center space-x-3">
                        <input
                            @change="clickToggle(task.id, $event)"
                            :key="task.id"
                            id="checked-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <div :id="task.id" class="flex items-center"><p>{{ task.title }}</p></div>
                    </div>
                </div>

                <div class="  my-3 md:mb-0 flex flex-initial">

                        <div
                            :class="statusType(task.status)[0]"
                            class="flex-initial text-white font-medium rounded-full text-sm px-4 py-3 text-center mr-2 mb-2 ">{{statusType(task.status)[1]}}</div>
                </div>
            </div>
            <div class="basis-1/4  md:flex md:justify-end justify-start md:space-x-5">
                <!--                       Блок часу-->
                <div class=" md:w-auto md:mr-0 flex  md:justify-end p-2 md:text-right rounded border border-yellow-300 ">

                    <svg fill="none" class="w-8 h-8 text-gray-500 dark:text-yellow-300" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="w-full h-6 text-left mx-2 my-1  ">{{ task.deadline }}</p>

                </div>
                <!--                       Блок часу енд-->

                <div class="w-full md:w-auto md:my-0 my-3">
                    <div class="flex justify-between space-x-6 ">
                        <!--Блок Edit старт-->
                        <div class="w-full flex justify-end ">
                            <svg @click="editTask(task)" fill="none" class="cursor-pointer  w-6 h-6 text-gray-500 dark:text-blue-300" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <!--Блок Edit енд-->
                        <!--Блок Delete старт-->
                        <div  class="flex justify-end">
                            <svg @click="deleteTask(task)" fill="none" stroke="currentColor" class="cursor-pointer w-6 h-6 text-gray-500 dark:text-red-300" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            </svg>
                        </div>
                    </div>
                    <!--Блок Delete енд-->
                    <!-- Дата публікації старт-->
                    <div class="w-full md:w-auto flex justify-end space-x-3 mt-2 ">
                        <svg fill="none" stroke="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-500" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                        </svg>
                        <p class="">{{task.humansDate}}</p>
                    </div>
                    <!-- Дата публікації енд-->
                </div>

            </div>

        </div>

    </div>
    <div v-else class="container text-center md:mx-full px-3 py-3">

        <the-loader/>
    </div>
</template>

<script>
import TheLoader from "./TheLoader.vue";
import store from "../store";
import {ref, computed} from "vue";

export default {
    name: "TheList",
    props: ['tasks'],
    emits:['editTask', 'deleteTask' ],
    components:{TheLoader},

    setup(props, {emit}){
        function statusType(type) {
            const status = {
                active : ['dark:bg-green-600', 'active'],
                done: ['dark:bg-yellow-600', 'done'],
                canceled:  ['dark:bg-red-600', 'canceled']
            }
            return status[type]
        }
        const date = new Date()

        const editTask = task => {
            emit('editTask', task )
        }
        const deleteTask = task => {

            emit('deleteTask', task )
        }
        const lineThrough = ref('line-through')

        const clickToggle = (id, event) => {
            const el = document.querySelector(`div[id="${id}"]`)
            let aClass = el.getAttribute('class')
            let attrs = aClass.split(' ')
            if(attrs.includes('line-through')){
                attrs =  attrs.filter(e => e !== 'line-through')
            }else {
                attrs.push('line-through')
            }
            el.setAttribute('class', attrs.join(' ') )
        }

        return {
            clickToggle,lineThrough,
            loader: computed(()=> store.getters['getLoader']),
            statusType,
            editTask, deleteTask,

        }
}
}
</script>

<style scoped>

</style>
