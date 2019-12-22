import gql from "graphql-tag";

export const CREATE_TODO = gql`
  mutation createTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      done
    }
  }
`;
export const TOGGLE_TODO = gql`
  mutation toggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      # text
      done
    }
  }
`;
export const ALL_TODOS = gql`
  query todos {
    todos {
      id
      text
      done
    }
  }
`;
