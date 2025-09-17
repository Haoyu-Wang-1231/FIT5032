<template>
    <div class="container mt-5">
        <h1>Sign in</h1>
        <p><input type="text" placeholder="Email" v-model="email"></p>
        <p><input type="password" placeholder="Password" v-model="password"></p>
        <p><button @click="login">Sign in via Firebase</button></p>
    </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { auth, db } from '@/firebase'
import { useUserStore } from '@/store/user';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    serverTimestamp,
    where,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
} from 'firebase/firestore';
const email = ref("")
const password = ref("")
const router = useRouter()
// const auth = getAuth();

const userStore = useUserStore()

const login = async () => {
    try {
        const data = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )
        console.log("Firebase Logged in")
        console.log(data.user)

        const snap = await getDoc(doc(db, 'user_role', data.user.uid))
        if(snap.exists()){
            console.log('snap')
            console.log(snap.data())

            userStore.setUser(data.user.uid, snap.data().email, snap.data().role)
            router.push('/logout')
        }else{
            console.log('no role')
        }

    } catch (err) {
        console.log(err)
    }
};
</script>