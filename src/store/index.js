import Vue from "vue";
import Vuex from "vuex";


import recipes from "./modules/recipes";

Vue.config.devtools = true;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		recipes,
	}
});
