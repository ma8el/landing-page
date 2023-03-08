<script setup lang="ts">
import Greeting from './components/Greeting.vue'
import AWS from 'aws-sdk';
import { ref, onMounted } from 'vue';

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
      ];

AWS.config.update({
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  },
    region: import.meta.env.VITE_REGION,
    s3BucketEndpoint: true,
});
const ep = new AWS.Endpoint(import.meta.env.VITE_S3_BUCKET_ENDPOINT);

const s3 = new AWS.S3({ signatureVersion: 'v4', endpoint: ep });
const bucketName = 'website-assets'

const objectKey = 'background.jpg';

const backgroundImage = ref('');

onMounted(async () => {
  try {
    const data = await s3.getObject({ Bucket: `${bucketName}`, Key: objectKey }).promise();
    const url = URL.createObjectURL(new Blob([data.Body as string], { type: data.ContentType }));
    backgroundImage.value = url;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div :style="{ backgroundImage: `url(${backgroundImage})` }">
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
  </div>
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
