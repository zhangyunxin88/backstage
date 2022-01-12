import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        validTime: localStorage.getItem('valid_time')
    },
    mutations: {
        setToken(state, $token){
            localStorage.removeItem('token');
            localStorage.removeItem('valid_time');
            state.validTime = new Date().getTime() + 5*60*60*1000;
            localStorage.setItem('valid_time', state.validTime);
            state.token = $token;
            localStorage.setItem('token', $token);
            axios.defaults.headers.common['Authorization'] = state.token;
        }
    },
    actions: {
        setToken(context, $token){
            context.commit('setToken', $token);
        }
    }
})
