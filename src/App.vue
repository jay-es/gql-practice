<template>
  <div id="app">
    <Todos />
    <TodosComp />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todos from "./components/Todos.vue";
import TodosComp from "./components/TodosComp.vue";

export default Vue.extend({
  name: "app",
  components: {
    Todos,
    TodosComp
  }
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
