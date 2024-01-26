<template>
  <h1 class="py-3 text-4xl text-dark">Choose Your Categories</h1>
  <div class="flex items-center justify-center h-full bg-primary">
    <Swiper :options="swiperOptions" :slidesPerView="3" :spaceBetween="20" :centeredSlides="false">
      <SwiperSlide v-for="category in categories" :key="category.idCategory">
        <li
          @click="selectCategory(category.strCategory)"
          :class="{ selected: category.strCategory === selectedCategory }"
          class="h-auto p-4 m-4 bg-gray-100 rounded-lg shadow-md swiper-slide"
        >
          <h3 class="px-12 text-sm font-bold text-black lg:text-lg">{{ category.strCategory }}</h3>
          <img
            :src="category.strCategoryThumb"
            :alt="category.strCategory"
            class="object-cover cursor-pointer"
          />
        </li>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useFetch } from '@/composables/useFetch'

const { data: categoriesData, error: categoriesError } = useFetch(
  'https://www.themealdb.com/api/json/v1/1/categories.php'
)

type Category = {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

const categories = ref<Category[]>([])
const selectedCategory = ref<string | null>(null)
const emit = defineEmits(['selectCategory'])

watch(categoriesData, () => {
  if (categoriesData.value) {
    categories.value = categoriesData.value.categories
  }
})

watch(categoriesError, (err) => {
  console.log(err)
})

const selectCategory = (category: string) => {
  selectedCategory.value = category
  emit('selectCategory', category)
}

const swiperOptions = ref({
  navigation: true
})
</script>

<style scoped lang="scss">
.selected {
  font-weight: bold;
  color: #1e90ff;
}

.swiper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }
}
</style>
