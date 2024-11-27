<script setup>
import { RouterLink, RouterView } from "vue-router";
import HeaderPage from "./components/HeaderPage.vue";
</script>

<template>
  <div>
    <HeaderPage />
    <RouterView />
  </div>
</template>
