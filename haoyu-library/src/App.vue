<script setup>
import { computed } from 'vue';
import BHeader from './components/BHeader.vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const showheader = computed(()=>{
  return route.name !== 'CountBookAPI';
})

</script>

<template>
  <!-- <header>
    <RouterLink></RouterLink>
  </header> -->
  
  <div class="main-container">
    <header v-if="showheader">
      <BHeader></BHeader>
      
    </header>
    <main class="main-box">
      <RouterView></RouterView>
      <!-- <HomeView></HomeView> -->

    </main>

  </div>


</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
