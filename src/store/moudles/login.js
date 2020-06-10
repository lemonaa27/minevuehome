import { login, logout, getInfo, register } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'
import store from '@/store'
import JSEncrypt from 'jsencrypt'
const state = {
    id: null,
    name: '',
    token:'',
    avatar: '',
    introduction: '',
    roles: [],
    serviceNum: window.localStorage.userId
}
const mutations = {
    SET_ID:(state,id)=>{
        state.id = id
    },
    SET_NAME:(state,name)=>{
        state.name = name
    },
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_AVATAR:(state,avatar)=>{
        state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_SERVICE_NUM: (state, serviceNum) => {
        state.serviceNum = serviceNum
    }
}
const actions = {
    login({ commit }, userInfo) {
        const { username, password, captcha, key } = userInfo
        const pubKey = `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrbHV0TeLDwupZmsJlIG6xZh1/
        6xBxDVqkbFo0gtJP6Q7k8MinkAAEzUAZu7ZKbNIZ49tWRtU5QjBYg5R2LC843AGZ
        CJi+ox64NVMWFoTOZliPgAKp7E6Ir5c+3FgjjRdYpZbYC5r2GYZcqxew1waasw7B
        jhxmCmeoX3dyQLBKKwIDAQAB
        -----END PUBLIC KEY-----` // ES6 模板字符串 引用 rsa 公钥
        const encryptStr = new JSEncrypt()
        encryptStr.setPublicKey(pubKey) // 设置 加密公钥
        const psd = encryptStr.encrypt(password.toString()) // 进行加密
        return new Promise((resolve, reject) => {
          login({ username: username.trim(), password: psd, captcha: captcha, key: key })
            .then(response => {
              window.localStorage.userId = response.data.id
              commit('SET_SERVICE_NUM', response.data.id)
              commit('SET_TOKEN', response.data.token)
              setToken(response.data.token)
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
    },
}
export default {
    state,
    mutations,
    actions
};