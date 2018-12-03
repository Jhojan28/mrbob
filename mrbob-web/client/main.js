'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import routes from ''

import EventBus from './plugins/event-bus'
import Http from './plugins/http'

Vue.use(VueRouter)
Vue.use(EventBus)
Vue.use(Http)
// eslint-disable-next-line no-unused-vars

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
	el: '#app',
	render: h => h(App),
	router
})