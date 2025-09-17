<template>
    <div class="container mt-5">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email"></p>
        <p><input type="text" placeholder="Password" v-model="password"></p>
        <p>
            <select id="role" v-model="role">
                <option value="Guest">Guest</option>
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
            </select>
        </p>
        <p><button @click="register">Register to Firebase</button></p>
    </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { auth, db } from '@/firebase'
import {
    collection,
    addDoc,
    setDoc,
    onSnapshot,
    query,
    serverTimestamp,
    where,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const email = ref("")
const password = ref("")
const role = ref("")
const router = useRouter()
// const auth = getAuth();

const register = async () => {
    try {
        console.log("email: "+email.value)
        // console.log(password.value)
        console.log("role: "+role.value)
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );
        console.log(userCredential.user)

        await setDoc(doc(db, 'user_role', userCredential.user.uid), {
            email: userCredential.user.email,
            role: role.value
        })
        console.log('registed!')
        router.push('/firebaseLogin')
    } catch (err) {
        console.log(err)
    }


};
</script>