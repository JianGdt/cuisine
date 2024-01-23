import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url: string) {
  const data = ref<string | null>(null);
  const error = ref<Error | null>(null);

  const fetchData = () => {
    data.value = null;
    error.value = null;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
