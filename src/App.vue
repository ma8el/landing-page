<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import meImg from '@/assets/images/me.jpg'

interface Button {
  name: string;
  href: string;
  icon: string;
  color: string;
}
const buttons = ref<Button[]>([]);

onMounted(async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const jwtToken = import.meta.env.VITE_JWT_TOKEN;
    const response = await axios.get<Button[]>(`${apiUrl}/socials`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    buttons.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="background">
    <v-container class="bg-surface-variant">
      <v-row align="center" justify="center" class="ma-2 pa-2" no-gutters>
          <v-avatar size="250" rounded>
            <img alt="Profile pic" :src="meImg" width="250" height="250" />
          </v-avatar>
      </v-row>
      <v-row align="center" justify="center" class="ma-2 pa-2" no-gutters>
        <v-col cols="3">
          <div class="greetings">
            <h1 class="green">Hi, I'm Markus</h1>
            <h3>
              I like Software Engineering
            </h3>
          </div>

        </v-col>
      </v-row>
      <v-row 
        align="center"
        justify="center"
        no-gutters
        v-for="button in buttons">
        <v-col cols="3" class="pa-1 ma-1">
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
 </div>
</template>

<style scoped>

@media (min-width: 1024px) {
.v-btn:hover,
.v-btn:focus {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
  color: rgba(0, 0, 0, 0.3);
}
}

.background{
  background-image: url("assets/images/background.jpg");
  background-size: 100% 100%;
  opacity: 1;
  height: 100vh;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
