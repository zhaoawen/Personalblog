import { createStore } from 'vuex';
import { reqGetPassage, reqGetPassageDetail } from '@/request/api/home.js';
import { reqGetEditPassage, reqGetEditPassageFinished ,reqEditPassage} from '@/request/api/edit';
export default createStore({
  state: {
    passageList:[],
    showList:[],
    // 用户信息
    userMessage:{},
    // 当前文章信息
    currentPassage:{},
    // 编辑页文章信息
    editPassage:{}
  },
  getters: {
  },
  mutations: {
    GETPASSAGE(state,value){
      state.passageList = value.result2;
      state.showList = value.result2;
      state.userMessage = value.result1[0];
    },
    GETPASSAGEDETAIL(state,value){
      state.currentPassage = value;
    },
    GETPASSAGEEDIT(state,value){
      state.editPassage = value;
    }
  },
  actions: {
      // 获取首页文章
      getPassage:async function(context){
        let res = await reqGetPassage();
        if(res){
          context.commit("GETPASSAGE",res.data.message);
        }else{
          return Promise.reject(new Error('faile'));
        }
      },
      // 获取某篇文章信息
      getPassageDetail:async function(context,data){
        let res =await reqGetPassageDetail(data);
        if(res){
          context.commit("GETPASSAGEDETAIL",res.data.message[0]);
        }else{
          return Promise.reject(new Error('faile'));
        }
      },
      // 获取编辑页信息
      getPassageEdit:async function(context,data){
        let res = await reqGetEditPassage(data);
        if(res){
          context.commit("GETPASSAGEEDIT",res.data.message[0]);
        }else{
          return Promise.reject(new Error('faile'));
        }
      },
      // 修改文章信息
      getEditPassageFinished:async function(context,data){
        await reqGetEditPassageFinished(data);
      },
      // 编辑文章信息
      getEditPassage:async function(context,data){
        await reqEditPassage(data);
      }
  },
  modules: {
  }
})
