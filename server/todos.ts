import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import { Todo } from "@/types";

const schemaPath = path.resolve(__dirname, "../schema.graphql");
const typeDefs = gql(fs.readFileSync(schemaPath, "utf-8"));

const todos: Todo[] = [
  {
    id: 1,
    text: "wake up",
    done: true
  },
  {
    id: 2,
    text: "drink coffee",
    done: false
  }
];

const getTodo = (id: number) => todos.find(v => v.id === id);

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_: Todo, { id }: Todo) => getTodo(id)
  },
  Mutation: {
    createTodo: (_: Todo, { text }: Todo) => {
      const newTodo: Todo = {
        text,
        done: false,
        id: todos.length + 1
      };

      todos.push(newTodo);

      return newTodo;
    },
    toggleTodo: (_: Todo, { id }: Todo) => {
      const todo = getTodo(id);

      if (!todo) return;

      todo.done = !todo.done;
      return todo;
    }
  }
};

export default new ApolloServer({ typeDefs, resolvers });
