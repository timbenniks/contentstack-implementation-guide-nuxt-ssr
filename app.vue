<script lang="ts" setup>
import VB_EmptyBlockParentClass from "@contentstack/live-preview-utils";
const { data: page } = await useGetPage("/");
</script>
<template>
  <main class="max-w-screen-md mx-auto">
    <section class="p-4">
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
        width="768"
        height="414"
        :src="page?.image.url"
        :alt="page?.image.title"
        v-bind="page?.image?.$ && page?.image?.$.url"
      />

      <div
        v-if="page?.rich_text"
        v-bind="page?.$ && page?.$.rich_text"
        v-html="page?.rich_text"
      />

      <div
        :class="[
          'space-y-8 max-w-full mt-4',
          !page?.blocks || page.blocks.length === 0
            ? VB_EmptyBlockParentClass
            : '',
        ]"
        v-bind="page?.$ && page?.$.blocks"
      >
        <div
          v-for="(item, index) in page?.blocks"
          :key="item.block._metadata.uid"
          v-bind="page?.$ && page?.$[`blocks__${index}`]"
          :class="[
            'flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-white',
            item.block.layout === 'image_left'
              ? 'md:flex-row'
              : 'md:flex-row-reverse',
          ]"
        >
          <div class="w-full md:w-1/2">
            <img
              v-if="item.block.image"
              :src="item.block.image.url"
              :alt="item.block.image.title"
              width="200"
              height="112"
              class="w-full"
              v-bind="item.block.$ && item.block.$.image"
            />
          </div>
          <div class="w-full md:w-1/2 p-4">
            <h2
              v-if="item.block.title"
              class="text-2xl font-bold"
              v-bind="item.block.$ && item.block.$.title"
            >
              {{ item.block.title }}
            </h2>
            <div
              v-if="item.block.copy"
              v-html="item.block.copy"
              class="prose"
              v-bind="item.block.$ && item.block.$.copy"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
body {
  background: #e9e9e9;
}

a {
  text-decoration: underline;
}
</style>
