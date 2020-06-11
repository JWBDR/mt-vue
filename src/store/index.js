import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    position: {},
    userName:''
}
const mutations = {
    setPosition(state, val) {
        state.position = val;//当前城市变更为categroy.vue中changeCity选择的那个城市       
    },
    setUserName(state,val){
        state.userName = val;
    }
}
const actions = {
    setPosition({ commit }, val) { //state里的commit
        //请求数据
        commit("setPosition", val)//提交这个Mutations

        // window.navigator.geolocation.getCurrentPosition(position => {
        //      //定位
        //     commit(position, val)//提交这个Mutations
        // }, () => {
        //     console.log("获取失败");
        //     commit("setPosition", val)//提交这个Mutations
        // })
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})









