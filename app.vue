<script lang="ts" setup>
import type { LivePreviewQuery } from "@contentstack/delivery-sdk";

const route = useRoute();
const live_preview = route.query.live_preview;
const content_type_uid = route.query.content_type_uid;
const contentTypeUid = route.query.content_type_uid;

const { data: page, refresh } = await useGetPage("/", {
  live_preview,
  content_type_uid,
  contentTypeUid,
} as LivePreviewQuery);

onMounted(() => {
  const { $preview, $ContentstackLivePreview } = useNuxtApp();
  $preview && $ContentstackLivePreview.onEntryChange(refresh);
});
</script>
<template>
  <main class="max-w-screen-2xl mx-auto">
    <section class="p-4">
      <pre v-if="route.query" class="mb-8">{{ route.query }}</pre>
      <h1
        v-if="page?.title"
        class="text-4xl font-bold mb-4"
        v-bind="page?.$ && page?.$.title"
      >
        {{ page?.title }}
      </h1>

      <p
        v-if="page?.description"
        class="mb-4"
        v-bind="page?.$ && page?.$.description"
      >
        {{ page?.description }}
      </p>

      <img
        v-if="page?.image"
        class="mb-4"
        width="300"
        height="300"
        :src="page?.image.url"
        :alt="page?.image.title"
        v-bind="page?.image?.$ && page?.image?.$.url"
      />

      <div
        v-if="page?.rich_text"
        v-bind="page?.$ && page?.$.rich_text"
        v-html="page?.rich_text"
      />
    </section>
  </main>
</template>
