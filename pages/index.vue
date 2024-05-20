<template>
  <div>
    <h1>Il valore di Bitcoin è ${{formatCurrency(BTC)}}</h1>
    <p>La cryptovaluta con maggior Market Cap dopo Bitcoin è Ethereum con valore ${{ formatCurrency(ETH) }}</p>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="marketCap && marketCap.data.length">
      <AppTable :data="marketCap.data" />
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useNuxtApp } from '#app';
import AppTable from '~/components/AppTable.vue';

const nuxtApp = useNuxtApp();
const marketCap = ref(null);
const error = ref(null);
const BTC = ref(0);
const ETH = ref(0);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

async function getData() {
  if (nuxtApp.$marketCap) {
    marketCap.value = nuxtApp.$marketCap;
    if (!nuxtApp.$marketCap.data.length) {
      error.value = 'No data available';
    }
  } else {
    error.value = 'Failed to fetch data';
  }
  BTC.value = marketCap.value.data[0].quote.USD.price;
  ETH.value = marketCap.value.data[1].quote.USD.price;

}

watchEffect(async () => {
  await getData()
});
</script>