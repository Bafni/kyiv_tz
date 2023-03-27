import {createStore} from 'vuex'
import axios from "axios";
const store = createStore({
    modules: {},
    state() {
        return {
            validateE: '',
            modal: false,
            loader: false,
            message: '',
            isEdit: false,
            tasks: [],
            sort: 'all',
            page: 1,
            pagination: []
        }
    },
    getters: {
        getPagination(state) {
            return state.pagination
        },
        getValidateE(state) {
            return state.validateE
        },
        getLoader(state) {
            return state.loader
        },
        isEdit(state) {
            return state.isEdit;
        },
        getTasks(state) {
            return state.tasks
        },
        getModal(state) {
            return state.modal
        },
        getMessage(state) {
            return state.message
        }
    },
    mutations: {
        setPagination(state,  payload) {
           state.pagination = payload
        },
        setPage(state, payload){
            state.page = payload
        },
        setSort(state, payload){
            state.sort = payload
        },
        setValidateE(state, payload) {
            state.validateE = payload
        },
        setMessage(state, payload) {
            state.message = payload
        },
        setLoader(state) {
            state.loader = !state.loader
        },
        setIsEdit(state, payload) {
            state.isEdit = payload
        },
        removeTask(state, payload) {
            state.tasks = state.tasks.filter(task => task.id !== payload)
        },
        editTasks(state, payload) {
            state.tasks = state.tasks.map(task => {
                if (task.id === payload.id) {
                    task = payload
                }
                return task
            })
        },
        addTask(state, payload) {
            state.tasks.push(payload)
        },
        setTasks(state, payload) {
            state.tasks = payload
        },
        closeModal(state) {
            state.modal = false
        },
        openModal(state) {
            state.modal = true
        }
    },
    actions: {
        async getTasks({state, commit}) {
            try {
                commit('setLoader')
                const {data} = await axios.post('/api/task', {
                    status: state.status,
                    sort: state.sort,
                    page: state.page,
                } )
                await commit('setPagination', data.meta)
                await commit('setTasks', data.data)
                commit('setLoader')
            } catch (e) {
                commit('openModal')
                commit('setMessage', 'Failed to load task list')
            }
        },
        async createTask({commit}, payload) {
            try {
                const {data} = await axios.post('/api/task/store', payload)
                if (data.message) {
                    const validaE = Object.keys(data.data).map(key => {
                        return data.data[key][0]
                    })
                    commit('setValidateE', validaE[0] )
                }else {
                    await commit('addTask', data.data)
                    await commit('closeModal')
                }
            } catch (e) {
                commit('openModal')
                commit('setMessage', 'Failed to create Task')
            }
        },
        async editTask({commit}, payload) {
            try {
                const {data} = await axios.post(`/api/task/${payload.id}/update`, payload)
                if(data.message) {
                    const validaE = Object.keys(data.data).map(key => {
                        return data.data[key][0]
                    })
                    commit('setValidateE', validaE[0] )
                }else {
                    await commit('editTasks', data.data)
                    await commit('closeModal')
                    await commit('setIsEdit', false)
                }
            }catch (e) {
                commit('openModal')
                commit('setMessage', 'Failed to Update Task')
            }
        },
        async deleteTask({commit}, payload) {
            try {
                const {data} = await axios.delete(`/api/task/${payload}`, payload)
                await commit('removeTask', payload)
            }catch (e) {
                commit('openModal')
                commit('setMessage', 'Failed to Delete Task')
            }
        }
    }
})
export default store
