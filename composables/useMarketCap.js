import { useFetch } from '#imports'

export const useMarketCap = async () => {
  const { data, error } = await useFetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': "307ee3a7-f270-449b-aaf3-4233bee4651e"
    },
    params: {
      start: 1,
      limit: 100,
      convert: 'USD'
    }
  });

  return { data, error };
}
