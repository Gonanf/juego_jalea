<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductoMini from '@/components/ProductoMini.vue'
import RatingCard from '@/components/RatingCard.vue'

// Local image path
const imgPortada1 = '/figma-assets/portada1.jpg'

// Sample data - replace with real data from your API
const winnerGame = {
  title: 'Titulo',
  description: 'Descripcion',
  price: 'Gratuito/?$',
  rating: 5,
  publicRating: 5,
  evaluatorRating: 5,
}

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
]
</script>

<template>
  <div class="flex gap-[10px] items-start w-full h-full bg-white">
    <div class="flex flex-1 flex-col gap-[10px] h-full items-center justify-end min-h-0 min-w-0">
      <!-- Header Image -->
      <div class="border border-[#dadada] h-[200px] rounded-[10px] w-full overflow-hidden">
        <div class="flex flex-col gap-[10px] h-[200px] items-start overflow-hidden rounded-[inherit] w-full">
          <div class="flex-1 min-h-0 min-w-0 w-full relative">
             <NuxtLink :to="{name: 'edicion-2025'}" class="h-[25%]"><img src="/edicion/2025/Portada.png" class="w-full h-full shadow-lg object-cover"/></NuxtLink> 
          </div>
        </div>
      </div>

      <!-- Winner Section -->
      <p class="font-gabarito font-normal text-[16px] text-black">
        Ganador del Juego Jalea 2025
      </p>
      <div class="flex flex-1 gap-[10px] items-center justify-center min-h-0 min-w-0 overflow-hidden p-[10px] w-full">
        <RatingCard :rating="winnerGame.publicRating" label="Publico" />
        <ProductoMini
          :title="winnerGame.title"
          :description="winnerGame.description"
          :price="winnerGame.price"
          :rating="winnerGame.rating"
          class="h-[201px] w-[264.667px]"
        />
        <RatingCard :rating="winnerGame.evaluatorRating" label="Evaluadores" />
      </div>

      <!-- News Section -->
      <p class="font-gabarito font-normal text-[16px] text-black">
        Novedades
      </p>
      <div class="flex flex-1 gap-[10px] items-center justify-center min-h-0 min-w-0 overflow-hidden p-[10px] w-full">
        <button
          class="overflow-hidden relative shrink-0 size-[48px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft class="size-6" />
        </button>
        <ProductoMini
          v-for="(game, index) in newsGames"
          :key="index"
          :title="game.title"
          :description="game.description"
          :price="game.price"
          :rating="game.rating"
          class="flex-1 h-full min-h-0 min-w-0"
        />
        <button
          class="overflow-hidden relative shrink-0 size-[48px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight class="size-6" />
        </button>
      </div>
    </div>
  </div>
</template>
