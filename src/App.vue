<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
  body {
    background-color: #212121;
  }

  .table {
    padding: 10px 30px;
  }

  section h1 {
    color: white;
    padding-left: 40px;
    padding-top: 30px;
  }

  a {
    text-decoration: none;
    color: rgb(192, 192, 192);
  }

  .no-search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .no-search img {
    height: 80px;
    width: auto;
  }
</style>