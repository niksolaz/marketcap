<template>
  <table class="market-cap-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Circulating Supply</th>
        <th>Last Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="crypto in data" :key="crypto.id">
        <td>{{ crypto.name }}</td>
        <td>{{ crypto.symbol }}</td>
        <td :style="{ color: crypto.symbol === 'BTC' && isBitcoinPriceChanged ? 'red' : 'inherit' }">
          {{ formatCurrency(crypto.quote.USD.price) }}
        </td>

        <td>{{ crypto.circulating_supply.toLocaleString() }}</td>
        <td>{{ formatDate(crypto.last_updated) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { defineProps } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const isBitcoinPriceChanged = ref(false);

const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

watchEffect(() => {
  const bitcoin = props.data.find(crypto => crypto.symbol === 'BTC');

  if (bitcoin) {
    const currentBitcoinPrice = bitcoin.quote.USD.price;
    const previousBitcoinPrice = parseFloat(useLocalStorage('bitcoinPrice'));

    if (!isNaN(previousBitcoinPrice) && currentBitcoinPrice !== previousBitcoinPrice) {
      isBitcoinPriceChanged.value = true;
    }

    useLocalStorage('bitcoinPrice', currentBitcoinPrice.toString());
  }
});
</script>

<style scoped>
.market-cap-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}
.market-cap-table th,
.market-cap-table td {
  padding: 12px 15px;
}
.market-cap-table thead tr {
  background-color: #1e3d59;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}
.market-cap-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.market-cap-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.market-cap-table tbody tr:last-of-type {
  border-bottom: 2px solid #1e3d59;
}
</style>
