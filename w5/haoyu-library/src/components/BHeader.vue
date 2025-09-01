<template>
    <div class="container">
        <header class="d-flex justify-content-center py-3 ">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>

                </li>
                <li class="nav-item">
                    <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
                </li>

            </ul>
        </header>
    </div>
</template>
<script setup>
import { RouterLink, routerViewLocationKey } from 'vue-router';
</script>
<style scoped>
</style>