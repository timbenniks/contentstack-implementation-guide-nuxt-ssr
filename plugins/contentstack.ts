import contentstack, { Region } from "@contentstack/delivery-sdk"
import type { Stack } from "@contentstack/delivery-sdk/dist/types/src/lib/stack";
import ContentstackLivePreview, { type IStackSdk } from "@contentstack/live-preview-utils";

export default defineNuxtPlugin((nuxtApp) => {
  const {
    apiKey,
    deliveryToken,
    previewToken,
    region,
    environment,
    preview
  } = nuxtApp.$config.public;

  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: region === 'EU' ? Region.EU : Region.US,
    live_preview: {
      enable: preview ? true : false,
      preview_token: previewToken,
      host: region === 'EU' ? "eu-rest-preview.contentstack.com" : "rest-preview.contentstack.com",
    }
  });

  if (preview) {
    ContentstackLivePreview.init({
      ssr: true,
      enable: preview ? true : false,
      stackSdk: (stack as Stack).config as IStackSdk,
      stackDetails: {
        apiKey: apiKey,
        environment: environment,
      },
      clientUrlParams: {
        host: region === "EU" ? "eu-app.contentstack.com" : "app.contentstack.com",
      },
      editButton: {
        enable: true,
      }
    });
  }

  return {
    provide: {
      stack,
      preview,
      ContentstackLivePreview
    },
  };
});