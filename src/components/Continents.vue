<template>
  <div>
    <section>
      <h2>Continent</h2>
      <select v-model="continentCode">
        <option v-for="c in continents" :key="c.name" :value="c.code">
          {{ c.code }}: {{ c.name }}
        </option>
      </select>
    </section>

    <section>
      <h2>Country</h2>
      <select v-model="countryCode">
        <option v-for="c in countries" :key="c.name" :value="c.code">
          {{ c.code }}: {{ c.name }}
        </option>
      </select>

      <dl v-if="!$apollo.queries.countryInfo.loading">
        <dt>Name:</dt>
        <dd>{{ countryInfo.name }}</dd>
        <dt>Native:</dt>
        <dd>{{ countryInfo.native }}</dd>
        <dt>Currency:</dt>
        <dd>{{ countryInfo.currency }}</dd>
        <dt>Phone:</dt>
        <dd>{{ countryInfo.phone }}</dd>
      </dl>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

interface Continent {
  code: string;
  name: string;
  countries: Country[];
}

interface Language {
  code: string;
  name: string;
  native: string;
  rtl: number;
}

interface Country {
  code: string;
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  currency: string;
  languages: Language[];
  emoji: string;
  emojiU: string;
}

export default Vue.extend({
  name: "Continents",
  data: () => {
    return {
      countryCode: "JP",
      continentCode: "AS",
      continents: [] as Continent[]
    };
  },
  computed: {
    countries() {
      const currentContinent = this.continents.find(
        v => v.code === this.continentCode
      );
      return currentContinent && currentContinent.countries;
    }
  },
  apollo: {
    continents: gql`
      query Continents {
        continents {
          code
          name
          countries {
            code
            name
          }
        }
      }
    `,
    countryInfo: {
      query: gql`
        query Country($countryCode: String!) {
          countryInfo: country(code: $countryCode) {
            name
            native
            currency
            phone
          }
        }
      `,
      variables() {
        return {
          countryCode: this.countryCode
        };
      }
    }
  }
});
</script>

<style scoped>
section {
  margin: 0 auto;
  width: 20em;
  text-align: left;
  vertical-align: top;
}
dt {
  font-weight: 600;
}
dd {
  margin: 3px 0 0.5em;
}
</style>
