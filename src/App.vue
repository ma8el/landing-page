<script setup lang="ts">
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
/*            {
              name: "Twitter",
              icon: "fa-brands fa-twitter",
              href: "https://twitter.com",
              color: "#1DA1F2"
            },
            */
            {
              name: "LinkedIn",
              icon: "fa-brands fa-linkedin",
              href: "https://linkedin.com",
              color: "#0077B5"
            },
            {
              name: "Xing",
              icon: "fa-brands fa-xing",
              href: "https://xing.com",
              color: "#026466"
            },
            {
              name: "Mail",
              icon: "fa-solid fa-envelope",
              href: "https://github.com",
              color: "#DB4437"
            },
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

const backgroundImage = ref('');
const logoImage = ref('');
const favicon = ref('');

async function getS3ImageUrl(objectKey: string): Promise<string> {
  const bucketName = 'website-assets'
  const imageData = await s3.getObject({ Bucket: `${bucketName}`, Key: objectKey }).promise();
  return URL.createObjectURL(new Blob([imageData.Body as string], { type: imageData.ContentType }));
}

onMounted(async () => {
  try {
    const bgObjectKey = 'background.jpg';
    backgroundImage.value = await getS3ImageUrl(bgObjectKey);

    const logoObjectKey = 'me.jpg';
    logoImage.value = await getS3ImageUrl(logoObjectKey);

    const faviconObjectKey = 'favicon.ico';
    favicon.value = await getS3ImageUrl(faviconObjectKey);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
<!--  <div class="background" :style="{ backgroundImage: `url(${backgroundImage})` }"> -->
    <v-container class="bg-surface-variant">
      <v-row align="center" justify="center" class="ma-2 pa-2" no-gutters>
          <v-avatar size="250" rounded>
            <img alt="Profile pic" :src="logoImage" width="250" height="250" />
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
    <link rel="shortcut icon" :href="favicon" type="image/x-icon" />
<!-- </div> -->
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
