import { createStore } from "vuex" 

const store = createStore({

   state:{
       api: "http://51.38.68.118:7000"
   },

   mutations: {
      setUser(state, user) {
         state.user = user
      }
   }
})

export default store