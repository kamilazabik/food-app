import axios from '../../axios-auth';
import globalAxios from 'axios';
// import { routes } from '../../router';
import router from '../../router'
import * as types from '../types';

const state = {
    idToken: null,
    userId: null,
    user:null,
    iUser: null,
    idUserDb: null,
    oneUser: []
};

const mutations = {
    [types.MUTATE_AUTH_USER](state, userData){
        state.idToken = userData.token
        state.userId = userData.userId
    },
    [types.MUTATE_STORE_USER](state, user){
        state.user = user
    },
    [types.MUTATE_CLEAR_AUTH_DATA](state){
        state.idToken = null
        state.userId = null
    }
};

const actions = {
    [types.ACT_SET_LOGOUT_TIMER]({commit}, expirationTime){
        setTimeout(() => {
            commit(types.MUTATE_CLEAR_AUTH_DATA)
        }, expirationTime * 1000)
    },

    [types.ACT_SIGN_UP]({commit, dispatch}, authData){
        axios.post('/signupNewUser?key=AIzaSyAQWC9D-OMe-9CV11HBNAFEo56z8aot4Hc', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                commit(types.MUTATE_AUTH_USER, {
                    token: res.data.idToken,
                    userId: res.data.localId
                });
                const now = new Date();
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userEmail', res.data.email);
                dispatch(types.ACT_STORE_USER, authData);
                dispatch(types.ACT_SET_LOGOUT_TIMER, res.data.expiresIn)
            })
            .catch(error => console.log(error))
    },

    [types.ACT_LOGIN]({commit, dispatch}, authData){
        axios.post('/verifyPassword?key=AIzaSyAQWC9D-OMe-9CV11HBNAFEo56z8aot4Hc', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                console.log(res);
                commit(types.MUTATE_AUTH_USER, {
                    token: res.data.idToken,
                    userId: res.data.localId,
                });
                const now = new Date();
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token',res.data.idToken );
                localStorage.setItem('userId',res.data.localId );
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userEmail', res.data.email);
                dispatch(types.ACT_SET_LOGOUT_TIMER, res.data.expiresIn);
                dispatch(types.ACT_FETCH_USER)

            })
            .catch(error => console.log(error))
    },

    [types.ACT_TRY_AUTO_LOGIN]({commit}){
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if(now >= expirationDate){
            return
        }
        const userId = localStorage.getItem('userId');
        commit(types.MUTATE_AUTH_USER, {
            token: token,
            userId: userId
        })
    },

    [types.ACT_LOGOUT]({commit}){
        commit(types.MUTATE_CLEAR_AUTH_DATA);
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        router.replace('./signin')
    },

    [types.ACT_STORE_USER]({commit, state}, userData){
        if(!state.idToken){
            return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res=> console.log(res))
            .catch(error => console.log(error))
    },

    [types.ACT_FETCH_USER]({commit, state}){
        if(!state.idToken){
            return
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                console.log(res);
                const data = res.data;
                const users = [];
                const userEmail = localStorage.getItem('userEmail');
                for(let key in data){
                    const user = data[key];
                    user.id = key;
                    users.push(user)
                }

                users.forEach(function (e,i) {
                    for(let k in e){
                        if(e[k] === userEmail){
                            state.iUser = i;
                            state.oneUser = users[i]
                        }
                    }
                });

                state.idUserDb = users[state.iUser].id;
                commit(types.MUTATE_STORE_USER, users[state.iUser])
                }
            )
            .catch(error => console.log(error))
    },
};

const getters = {
    [types.GET_USER](state){
        return state.user
    },
    [types.GET_IS_AUTHENTICATED](state){
        return state.idToken !==null
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}