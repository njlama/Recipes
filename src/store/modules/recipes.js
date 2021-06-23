import axios from 'axios';

const state = {
    recipesList : [],
    recipesDetails : [],
    errorMessage: "",
    detailError: ""
};

const getters = {
    recipes(state){
        return state.recipesList;
    },
    recipesDetails(state){
        return state.recipesDetails;
    },
    errorMessage(state){
        return state.errorMessage;
    },
    detailError(state){
        return state.detailError;
    }
};

const actions = {
    fetchRecipes({ commit }, payload){
        let type, subparam;

        console.log("helo",payload)
        if(payload.type == "cuisine"){
            type = payload.type;
            subparam = payload.subparam;
            axios.get("https://api.spoonacular.com/recipes/complexSearch?"+type+"="+subparam+"&apiKey=b33b0eb62296455b9ef76d966678c06d")
            .then(response => {
                commit("storeRecipes", response.data.results)
                return response;
            })
            .catch(error => {
                commit("storeError", error.response.data.message)
            })
        }

        if(payload.type == "ingredients"){
            subparam = payload.subparam;
            axios.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients="+subparam+"&apiKey=b33b0eb62296455b9ef76d966678c06d")
            .then(response => {
                commit("storeRecipes", response.data)
                return response;
            })
            .catch(error => {
                commit("storeError", error.response.data.message)
            })
        }    
    },
    fetchRecipesByExcludeIntolerance({ commit }, payload){
        let type1="", type2="", subparam1="", subparam2="";
        type1 = payload[0].type + "=";
        subparam1 = payload[0].subparam;
        if(payload.length > 1){
            type2 = "&"+payload[1].type + "=";
            subparam2 = payload[1].subparam;
        }

        axios.get("https://api.spoonacular.com/recipes/complexSearch?"+type1+subparam1+type2+subparam2+"&apiKey=b33b0eb62296455b9ef76d966678c06d")
            .then(response => {
                commit("storeRecipes", response.data.results)
                return response;
            })
            .catch(error => {
                commit("storeError", error.response.data.message)
            })
    },
    fetchRecipesDetails({ commit }, payload){
        axios.get(`https://api.spoonacular.com/recipes/${payload}/information?apiKey=b33b0eb62296455b9ef76d966678c06d`)
            .then(response => {
                commit("storeRecipesDetails", response.data)
                return response;
            })   
            .catch(error => {
                commit("storeDetailPageError", error.response.data.message)
            })
    }
};

const mutations = {
    storeRecipes(state, data){
        state.recipesList = data;
    },
    storeRecipesDetails(state, data){
        state.recipesDetails = data;
    },
    storeError(state, data){
        state.errorMessage = data;
    },
    storeDetailPageError(state, data){
        state.detailError = data;
    }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
