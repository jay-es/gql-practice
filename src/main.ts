import Vue from "vue";
import VueCompositionApi, { provide } from "@vue/composition-api";
import ApolloClient from "apollo-boost";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  apolloProvider: createProvider(),
  setup: (() => {
    provide(
      DefaultApolloClient,
      new ApolloClient({ uri: "http://localhost:4000/graphql" })
    );
  }) as any,
  render: h => h(App)
}).$mount("#app");
