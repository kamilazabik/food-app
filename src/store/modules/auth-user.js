import axios from '../../axios-auth';
import globalAxios from 'axios';
// import { routes } from '../../router';
import router from '../../router'

const state = {
    idToken: null,
    userId: null,
    user:null,
    iUser: null,
    idUserDb: null,
    oneUser: []

}

const mutations = {
    authUser(state, userData){
        state.idToken = userData.token
        state.userId = userData.userId
    },
    storeUser(state, user){
        state.user = user
    },
    clearAuthData(state){
        state.idToken = null,
        state.userId = null
    }
}

const actions = {
    setLogoutTimer({commit}, expirationTime){
        setTimeout(() => {
            commit('clearAuthData')
        }, expirationTime * 1000)
    },
    signup({commit, dispatch}, authData){
        axios.post('/signupNewUser?key=AIzaSyAQWC9D-OMe-9CV11HBNAFEo56z8aot4Hc', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                console.log(res)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userEmail', res.data.email)
                dispatch('storeUser', authData)
                dispatch('setLogoutTimer', res.data.expiresIn)
            })
            .catch(error => console.log(error))
    },
    login({commit, dispatch}, authData){
        axios.post('/verifyPassword?key=AIzaSyAQWC9D-OMe-9CV11HBNAFEo56z8aot4Hc', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                console.log(res)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                })
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token',res.data.idToken )
                localStorage.setItem('userId',res.data.localId )
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userEmail', res.data.email)
                dispatch('setLogoutTimer', res.data.expiresIn)
                dispatch('fetchUser')

            })
            .catch(error => console.log(error))
    },
    tryAutoLogin({commit}){
        const token = localStorage.getItem('token')
        if(!token){
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if(now >= expirationDate){
            return
        }
        const userId = localStorage.getItem('userId')
        commit('authUser', {
            token: token,
            userId: userId
        })

    },
    logout({commit}){
        commit('clearAuthData');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        router.replace('./signin')
    },
    storeUser({commit, state}, userData){
        if(!state.idToken){
            return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(res=> console.log(res))
            .catch(error => console.log(error))
    },
    fetchUser({commit, state}){
        if(!state.idToken){
            return
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(res => {
                console.log(res)
                const data = res.data
                const users = []
                console.log(users)
                const userEmail = localStorage.getItem('userEmail')
                for(let key in data){
                    const user = data[key]
                    user.id = key
                    users.push(user)
                }

                users.forEach(function (e,i) {
                    for(let k in e){
                        if(e[k] === userEmail){
                            state.iUser = i
                            state.oneUser = users[i]
                        }
                    }
                });


                state.idUserDb = users[state.iUser].id;
                console.log(state.idUserDb);
                console.log(state.oneUser);

                commit('storeUser', users[state.iUser])
                }
            )
            .catch(error => console.log(error))
    },

}

const getters = {
    user(state){
        return state.user
    },
    isAuthenticated(state){
        return state.idToken !==null
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}