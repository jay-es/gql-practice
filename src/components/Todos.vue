<template>
  <div class="todos">
    <input type="text" v-model="inputText" />
    <button :disabled="!inputText" @click="create">Add</button>

    <ul>
      <li v-for="t in todos" :key="t.id">
        <label :class="{ 'is-done': t.done }">
          <input type="checkbox" :checked="t.done" @change="toggle(t.id)" />
          {{ t.text }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ALL_TODOS, CREATE_TODO, TOGGLE_TODO } from "./graphql";
import { Todo } from "@/types";

export default Vue.extend({
  name: "Todos",
  data: () => ({
    inputText: "",
    todos: [] as Todo[]
  }),
  methods: {
    async create() {
      const res = await this.$apollo.mutate<{ createTodo: Todo }>({
        mutation: CREATE_TODO,
        variables: {
          text: this.inputText
        }
      });

      if (res.data) {
        this.todos.push(res.data.createTodo);
        this.inputText = "";
      }
    },
    toggle(id: number) {
      this.$apollo.mutate({
        mutation: TOGGLE_TODO,
        variables: {
          id
        }
      });
    }
  },
  apollo: {
    todos: ALL_TODOS
  }
});
</script>

<style scoped>
.todos {
  display: inline-block;
  width: 220px;
  margin: 0 auto;
  padding: 0 10px;
  text-align: left;
}
ul {
  padding: 0;
  list-style: none;
  user-select: none;
}
.is-done {
  text-decoration: line-through;
}
</style>
