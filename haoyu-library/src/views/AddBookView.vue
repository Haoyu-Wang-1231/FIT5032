<script setup>
import { ref } from 'vue'
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
    updateDoc,
} from 'firebase/firestore';
import { auth, db } from '@/firebase'
import BookList from '@/components/BookList.vue';

const formData = ref({
    isbn: null,
    name: null
})

const updateform = ref({
    isbn: null,
    name: null
})

const deleteisbn = ref(null);


const submitForm = async () => {
    console.log(formData.value.isbn)
    console.log(formData.value.name)

    try {
        const isbnNumber = Number(formData.value.isbn)
        if (isNaN(isbnNumber)) {
            alert("ISBN is invalid")
            return
        }

        await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: formData.value.name
        })
        formData.value.isbn = null
        formData.value.name = null

    } catch (err) {
        console.log(err)
    }
    window.location.reload()

}

const updateForm = async () => {
    console.log(updateform.value.isbn)
    console.log(updateform.value.name)
    try {
        const isbnNumber = Number(updateform.value.isbn)
        if (isNaN(isbnNumber)) {
            alert("ISBN is invalid")
            return
        }
        
        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        if (querySnapshot.empty){
            alert("No book have the ISBN with"+ isbnNumber)
            return
        }
        querySnapshot.forEach(async (element) => {
            const bookref = element.ref;
            await updateDoc(bookref, {
                name: updateform.value.name
            })
        });
        updateform.value.isbn = null
        updateform.value.name = null

    } catch (err) {
        console.log(err)
    }
    window.location.reload()


}

const deleteForm = async () => {
    // const isbnNumber = Number(deleteForm.value)
    try {
        const isbnNumber = Number(deleteisbn.value)
        if (isNaN(isbnNumber)) {
            alert("ISBN is invalid")
            return
        }
        
        const q = query(collection(db, 'books'), where('isbn', '==', isbnNumber));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty){
            alert("No book have the ISBN with"+ isbnNumber)
            return
        }
        
        await Promise.all(querySnapshot.docs.map(d => deleteDoc(d.ref)));
        deleteisbn.value= null
    } catch (err) {
        console.log(err)
    }
    window.location.reload()

}

</script>


<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-10 col-md-8 offset-md-1 col-lg-10">
                <h1 class="text-center">Add Books</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="isbn" class="form-label">ISBN</label>
                            <input type="text" class="form-control" id="username" v-model="formData.isbn">
                            <!-- <div v-if="errors.username" class="text-danger">{{ errors.username }}</div> -->
                        </div>
                        <div class="col-md-6">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="username" v-model="formData.name">
                            <!-- <div v-if="errors.username" class="text-danger">{{ errors.username }}</div> -->
                            <!-- <div v-if="errors.gender" class="text-danger">{{ errors.gender }} </div> -->
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary me-2" @click="clearForm">Clear</button>
                        <!-- <button type="button" class="btn btn-danger" @click="clearAll">Clear All</button> -->
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-10 col-md-8 offset-md-1 col-lg-10">
                <h1 class="text-center">update Books</h1>
                <form @submit.prevent="updateForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="isbn" class="form-label">ISBN</label>
                            <input type="text" class="form-control" id="username" v-model="updateform.isbn">
                        </div>
                        <div class="col-md-6">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="username" v-model="updateform.name">

                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary me-2" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-10 col-md-8 offset-md-1 col-lg-10">
                <h1 class="text-center">Delete Books</h1>
                <form @submit.prevent="deleteForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6">
                            <label for="isbn" class="form-label">ISBN</label>
                            <input type="text" class="form-control" id="username" v-model="deleteisbn">
                            <!-- <div v-if="errors.username" class="text-danger">{{ errors.username }}</div> -->
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary me-2" @click="clearForm">Clear</button>
                        <!-- <button type="button" class="btn btn-danger" @click="clearAll">Clear All</button> -->
                    </div>
                </form>
            </div>
        </div>
        <BookList></BookList>

    </div>
</template>
