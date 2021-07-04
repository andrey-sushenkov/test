import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home from '../pages/Home'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
        },
    ],
})
