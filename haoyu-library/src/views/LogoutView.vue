<template>
    <div class="container mt-5">
        <h1>Log out</h1>
        <div>email: {{ email }}</div>
        <div>role: {{ role }}</div>
        <button @click="logout">Logout</button>
    </div>
</template>


<script setup>
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { auth, db } from '@/firebase'
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
import { useUserStore } from '@/store/user';

const router = useRouter()
// const auth = getAuth();
const userStore = useUserStore()
const email = ref(null)
const role = ref(null)

onMounted(() => {
    email.value = userStore.email
    role.value = userStore.role

})


const logout = async () => {
    try {
        await auth.signOut()
        console.log("logout!")
        userStore.cleanUser()
        router.replace('/firebaseLogin')
    } catch (err) {
        console.log(err)
    }
}




</script>