import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import resetRouter  from '@/router'

const state:any = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state:any, token:string) => {
        state.token = token
    },
    SET_INTRODUCTION: (state:any, introduction:any) => {
        state.introduction = introduction
    },
    SET_NAME: (state:any, name:any) => {
        state.name = name
    },
    SET_AVATAR: (state:any, avatar:any) => {
        state.avatar = avatar
    },
    SET_ROLES: (state:any, roles:any) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    storeLogin({ commit }:any, userInfo:any) {
        // const { username, pass:password } = userInfo
        commit('SET_TOKEN', userInfo.token)
        setToken(userInfo.token)
        // return new Promise<void>((resolve, reject) => {
        //     login({ username: username.trim(), password: password }).then(response => {
        //         const { data } = response.data
        //         commit('SET_TOKEN', data.token)
        //         setToken(data.token)
        //         console.log('接口返回成功：',response);
        //         resolve()
        //     }).catch(error => {
        //         reject(error)
        //     })
        // })
    },

    // get user info
    getInfo({ commit, state }:any) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, name, avatar, introduction } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }:any) {
        return new Promise<void>((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }:any) {
        return new Promise<void>(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    async changeRoles({ commit, dispatch }:any, role:string) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes 版本升级:addRoutes=>addRoute
        router.addRoute(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

