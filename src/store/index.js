import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas:[],
    tarea: {
      tarea: '',
      completada: false,
      edit: false,
  }
  },
  getters:{
    tareas: state => state.tareas,
    tarea: state => state.tarea
  },
  mutations: {
    setTareas(state, data){
      state.tareas.push(data)
    },
    setTarea(state, data){
      state.tarea = data
    },

  },
  actions: {
  },
  modules: {
  }
})
