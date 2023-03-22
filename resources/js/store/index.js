import {createStore}  from 'vuex'
import axios from "axios";

const store = createStore({
    modules : {
    },
    state() {
        return {
            modal: false,
            tasks: [],
            task: {
                id: '',
                deadline: '',
                title: '',
                event: '',
                btName: '',
            }
        }
    },
    getters: {
        getTasks(state) {
           return  state.tasks
        },
        getModal(state) {
            return state.modal
        },
        getId(state) {
            return state.task.id
        },
        getTitle(state) {
            return state.task.title
        },
        getDeadline(state) {
            return state.task.deadline
        },
        getEvent(state) {
            return state.task.event
        },
        getBtnName(state) {
            return state.task.btName
        }
    },
    mutations: {
        removeTask(state, payload) {
            state.tasks = state.tasks.filter(task => task.id !== payload)
            console.log(state.tasks)
        },
        editTasks(state, payload) {
            state.tasks =  state.tasks.map(task => {
                if(task.id === payload.id) {
                    task = payload
                }
                return task
            })
            console.log(state.tasks)

        },
        addTask(state, payload) {
            state.tasks.push(payload)
        },
        setTasks(state, payload) {
            state.tasks = payload
        },
        setId(state, payload) {
            state.task.id = payload
        },
        setBtnName(state, payload) {
            state.task.btName = payload
        },
        setEvent(state, payload) {
            state.task.event = payload
        },
        setTitle(state, payload) {
            state.task.title = payload
        },
        setDeadline(state, payload) {
            state.task.deadline = payload
        },
        closeModal(state) {
            state.modal = false
        },
        openModal(state) {
            state.modal = true
        }
    },
    actions: {
        async createTask({commit}, payload) {
            console.log('111')
          const {data} = await axios.post('/api/task/store', payload )
            await commit('addTask', data.data)
            console.log(await data)
        },
        async getTasks({commit}) {
            const {data} = await axios.get('/api/task')
            await commit('setTasks',data.data )
            console.log(await data.data)
        },
        async getTasksFilter({commit}, payload ) {
            const {data} = await axios.get(`/api/task/${payload}`)
            await commit('setTasks',data.data )
            console.log(await data.data)
        },
        async editTask({commit}, payload) {
            console.log(payload)
            const {data} = await axios.post(`/api/task/${payload.id}/update`, payload)
            await commit('editTasks', data.data)
            console.log(await data.data)
        },
        async deleteTask({commit}, payload) {
            const {data} = await axios.delete(`/api/task/${payload}`, payload)
            await commit('removeTask', payload)
        }

    }
})
export default store
