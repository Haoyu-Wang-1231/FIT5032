<template>
  <div id="app">
    <h1>Get Books Count</h1>
    <button @click="getBookCount">get Book Count</button>
    <p v-if="count !== null">Total Books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios';

import { ref } from 'vue';

const count = ref(null);
const error = ref(null);
const getBookCount = async() => {
    try{
        const response = await axios.get("https://countbooks-yof7xvdqrq-uc.a.run.app");
        console.log(response.data);
        count.value = response.data.count;
        error.value = null;
    }catch(err){
        error.value = 'Error fetching book count';
        count.value = null;
    }
};
</script>

