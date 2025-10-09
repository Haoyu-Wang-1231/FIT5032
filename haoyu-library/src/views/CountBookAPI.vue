<template>
    <pre>{{ jsondata }}</pre>

</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const jsondata = ref(null)
const error = ref(null)
const count = null;

onMounted(async()=>{
    await getBookCountAPI();
})

const getBookCountAPI= async()=>{
    try{
        const response = await axios.get('https://countbooks-yof7xvdqrq-uc.a.run.app');
        jsondata.value = response.data;
        error.value= null;
    }catch(e){
        console.log(e);
        error.value = e;
        count.value = null;
    }
}

</script>