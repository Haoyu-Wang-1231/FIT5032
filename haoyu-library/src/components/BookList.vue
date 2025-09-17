<script setup>
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { auth, db } from '@/firebase'

const books = ref([])
const orderedBooks = ref([])
const limitedBooks = ref([])

const fetchBooks = async () => {
    try {
        const q = query(collection(db, 'books'), where('isbn', '>', 100));
        const querySnapshot = await getDocs(q);

        const booksArray = [];
        querySnapshot.forEach(element => {
            booksArray.push({ id: element.id, ...element.data() })
        });
        console.log(booksArray)
        books.value = booksArray;
    } catch (err) {
        console.log(err)
    }
}

const fetchOrderedBooks = async () => {
    try {
        const q = query(collection(db, 'books'), where('isbn', '>', 100), orderBy('isbn', 'desc'));
        const querySnapshot = await getDocs(q);

        const booksArray = [];
        querySnapshot.forEach(element => {
            booksArray.push({ id: element.id, ...element.data() })
        });
        console.log(booksArray)
        orderedBooks.value = booksArray;
    } catch (err) {
        console.log(err)
    }
}

const fetchLimitedBooks = async () => {
    try {
        const q = query(collection(db, 'books'), where('isbn', '>', 100), limit(3));
        const querySnapshot = await getDocs(q);

        const booksArray = [];
        querySnapshot.forEach(element => {
            booksArray.push({ id: element.id, ...element.data() })
        });
        console.log(booksArray)
        limitedBooks.value = booksArray;
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    fetchBooks();
    fetchOrderedBooks();
    fetchLimitedBooks();
})




</script>

<template>
    <div>
        <h1>books with ISBN > 1000</h1>
        <ul>
            <li v-for="book in books" :key="book.id">
                ISBN: {{ book.isbn }}-{{ book.name }}
            </li>
        </ul>
    </div>

    <div>
        <h1>books with ISBN > 1000 (ordered)</h1>
        <ul>
            <li v-for="book in orderedBooks" :key="book.id">
                ISBN: {{ book.isbn }}-{{ book.name }}
            </li>
        </ul>
    </div>

    <div>
        <h1>books with ISBN > 1000 (only shown 3)</h1>
        <ul>
            <li v-for="book in limitedBooks" :key="book.id">
                ISBN: {{ book.isbn }}-{{ book.name }} </li>
        </ul>
    </div>
</template>
