<script setup lang="ts">
import Greeting from './components/Greeting.vue'

const buttons = [
            {
              name: "Website",
              icon: "fa-regular fa-user",
              href: "https://github.com",
              color: "#cccccc"
            },
            {
              name: "Blog",
              icon: "fa-brands fa-blogger",
              href: "https://github.com",
              color: "#cccccc"
            },

            {
              name: "Github",
              icon: "fa-brands fa-github",
              href: "https://github.com",
              color: "#ffffff"
            },
            {
              name: "Twitter",
              icon: "fa-brands fa-twitter",
              href: "https://twitter.com",
              color: "#1DA1F2"
            },
            {
              name: "LinkedIn",
              icon: "fa-brands fa-linkedin",
              href: "https://linkedin.com",
              color: "#0077B5"
            },
            {
              name: "Mail",
              icon: "fa-solid fa-envelope",
              href: "https://github.com",
              color: "#DB4437"
            },
            {
              name: "Xing",
              icon: "fa-brands fa-xing",
              href: "https://xing.com",
              color: "#026466"
            }
      ]
        
</script>

<template>
  <v-container class="bg-surface-variant">
    <v-row align="center" justify="center" class="ma-4 pa-4" no-gutters>
        <img alt="Vue logo" src="./assets/logo.svg" width="125" height="125" />
    </v-row>
    <v-row align="center" justify="center" class="ma-2 pa-2" no-gutters>
      <v-col cols="4">
        <Greeting msg="Hello I'm Foo Bar" />
      </v-col>
    </v-row>
    <v-row 
      align="center"
      justify="center"
      no-gutters
      v-for="button in buttons">
      <v-col cols="4" class="pa-1 ma-1">
        <v-btn
          class="v-btn mx-1 px-6"
          block
          :color="button.color"
          :href="button.href">
          <v-icon :icon="button.icon" class="ma-1" />
            {{ button.name }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container> 
</template>

<style scoped>

@media (min-width: 1024px) {
  .logo {
    margin-left: 50%;
  }

.v-btn:hover,
.v-btn:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  color: rgba(0, 0, 0, 0.3);
}
}
</style>
