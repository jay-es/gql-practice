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
import gql from "graphql-tag";
import { Todo } from "@/types";

const createTodo = gql`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      done
    }
  }
`;
const toggleTodo = gql`
  mutation toggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      # text
      done
    }
  }
`;
const allTodos = gql`
  query todos {
    todos {
      id
      text
      done
    }
  }
`;

export default Vue.extend({
  name: "Todos",
  data: () => ({
    inputText: "",
    todos: [] as Todo[]
  }),
  methods: {
    async create() {
      const res = await this.$apollo.mutate<{ createTodo: Todo }>({
        mutation: createTodo,
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
        mutation: toggleTodo,
        variables: {
          id
        }
      });
    }
  },
  apollo: {
    todos: allTodos
  }
});
</script>

<style scoped>
.todos {
  width: 220px;
  margin: 0 auto;
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
