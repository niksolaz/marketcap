import { defineNuxtPlugin } from '#app'
import { useMarketCap } from '@/composables/useMarketCap'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { data, error } = await useMarketCap();
  if (error.value) {
    console.error('Failed to fetch market cap data:', error.value);
  } else {
    console.log('Market Cap Data:', data.value); 
    nuxtApp.provide('marketCap', data.value);
  }
});
