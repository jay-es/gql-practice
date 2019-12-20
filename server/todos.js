const fs = require("fs");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server-express");

const schemaPath = path.resolve(__dirname, "../schema.graphql");
const typeDefs = gql(fs.readFileSync(schemaPath, "utf-8"));

const todos = [
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

const getTodo = id => todos.find(v => v.id === id);

const resolvers = {
  Query: {
    todos: () => todos,
    todo: (_, { id }) => getTodo(id)
  },
  Mutation: {
    createTodo: (_, { text }) => {
      const newTodo = {
        text,
        done: false,
        id: todos.length + 1
      };

      todos.push(newTodo);

      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = getTodo(id);

      if (!todo) return;

      todo.done = !todo.done;
      return todo;
    }
  }
};

module.exports = new ApolloServer({ typeDefs, resolvers });
