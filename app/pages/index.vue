<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductoMini from '@/components/ProductoMini.vue'
import RatingCard from '@/components/RatingCard.vue'

const {data: currentEvent} = await useFetch(`/api/event/2025`)

console.log(currentEvent)


const newsGames = [
  {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
  {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 5,
  },
  {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
    {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
    {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
    {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
    {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },
    {
    title: 'Titulo',
    description: 'Descripcion',
    price: 'Gratuito/?$',
    rating: 4,
  },

]
</script>

<template>
  <div class="flex gap-[10px] items-start w-full h-full bg-white">
    <div class="flex flex-1 flex-col gap-[10px] h-full items-center justify-end min-h-0 min-w-0">
      <!-- Header Image -->
      <div class="border border-[#dadada] h-[25%] rounded-[10px] w-full overflow-hidden">
        <div class="flex flex-col gap-[10px] h-full items-start overflow-hidden rounded-[inherit] w-full">
          <div class="flex-1 min-h-0 min-w-0 w-full relative">
             <NuxtLink :to="{name: 'edicion-2025'}" class="h-full"><img src="/edicion/2025/Portada.png" class="w-full h-full shadow-lg object-cover"/></NuxtLink> 
          </div>
        </div>
      </div>

      <!-- Winner Section -->
       <div class="h-full grow flex flex-col justify-center items-center" v-if="currentEvent?.winners.length">
      <p class="font-gabarito font-normal text-[16px] text-black">
        Ganador del Juego Jalea 2025
      </p>
      <div class="flex flex-1 gap-[10px] items-center justify-center min-h-0 min-w-0 overflow-hidden p-[10px] w-full" >
        <RatingCard :rating="currentEvent?.winners[0]?.game.punctuation" label="Publico" />
        <ProductoMini
        :description="currentEvent?.winners[0]?.game.description!"
        :image="currentEvent?.winners[0]?.game.cover!"
        :title="currentEvent?.winners[0]?.game.title!"
        :key="0"
        :price="currentEvent?.winners[0]?.game.price!"
          class="h-[201px] w-[264.667px]"
        />
        <RatingCard :rating="currentEvent?.winners[0]?.game.evaluation" label="Evaluadores" />
      </div>
       </div>


      <!-- News Section -->
      <div class="h-full grow flex flex-col justify-center items-center">
        <p class="font-gabarito font-normal text-[16px] text-black">
        Novedades
      </p>
      <UiCarousel class="w-[90%]">
          <UiCarouselPrevious />
          <UiCarouselContent>
            <UiCarouselItem v-for="(game, index) in newsGames" :key="index" class=" md:basis-1/3 ">
<ProductoMini
          :key="index"
          :title="game.title"
          :description="game.description"
          :price="game.price"
          :rating="game.punctuation"
          class="flex-1 min-h-0 min-w-0"
        />
            </UiCarouselItem>
            
          </UiCarouselContent>
          <UiCarouselNext />
      </UiCarousel>
      </div>
    </div>
  </div>
</template>
