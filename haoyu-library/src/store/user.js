import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state(){
        return {
            uid: null,
            email: null,
            role: null
        }
    },
    actions: {
        setUser(uid, email, role){
            this.uid = uid
            this.email = email
            this.role = role
        },
        cleanUser(){
            this.uid = null
            this.email = null
            this.role = null
        }
    }

})