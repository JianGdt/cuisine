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
          <p class="text-sm leading-none text-black line-clamp-3">
            {{ category.strCategoryDescription }}
          </p>
        </li>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const { categories } = defineProps(['categories'])
const emit = defineEmits(['selectCategory'])

const selectedCategory = ref<string | null>(null)

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
