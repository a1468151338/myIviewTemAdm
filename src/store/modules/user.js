import Cookies from 'js-cookie';

const user = {
    state: {
        token:""//访问token
    },
    getters:{
        token:function (state) {
            if(state.token==""){
                state.token = localStorage.getItem('token');
            }
            return state.token;//Cookies.get("token"):this.state.token;
        }
    },
    mutations: {
        logout (state, vm) {
            //Cookies.remove('token');
            localStorage.removeItem('token');
            state.token="";
        },
        saveToken(state,token){
            //Cookies.set("token",token);
            localStorage.setItem('token',token);
            state.token=token;
        }
    }
};

export default user;
