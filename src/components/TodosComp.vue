<template>
  <div class="todos">
    <input type="text" v-model="inputText" />
    <button :disabled="!inputText" @click="create">
      Add
    </button>

    <ul>
      <li v-for="t in todos" :key="t.id">
        <label :class="{ 'is-done': t.done }">
          <input
            type="checkbox"
            :checked="t.done"
            @change="toggle({ id: t.id })"
          />
          {{ t.text }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from "@vue/composition-api";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import { ALL_TODOS, CREATE_TODO, TOGGLE_TODO } from "./graphql";
import { Todo } from "@/types";

export default createComponent({
  name: "Todos",
  setup() {
    // todos
    const { result } = useQuery<{ todos: Todo[] }>(ALL_TODOS);
    const todos = useResult(result, [] as Todo[], v => v.todos);

    // toggle
    const { mutate: toggle } = useMutation<{ toggleTodo: Todo }>(TOGGLE_TODO, {
      update: (_, { data }) => {
        if (!data) return;

        const { id } = data.toggleTodo;
        const todo = todos.value.find(v => v.id === id)!;
        todo.done = !todo.done;
      }
    });

    // add
    const inputText = ref("");
    const { mutate: create } = useMutation<{ createTodo: Todo }>(
      CREATE_TODO,
      () => ({
        variables: { text: inputText.value },
        update: (_, { data }) => {
          inputText.value = "";

          if (!data) return;
          result.value.todos.push(data.createTodo);
        }
      })
    );

    return {
      create,
      inputText,
      todos,
      toggle
    };
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
