<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductoMini from '@/components/ProductoMini.vue'
import RatingCard from '@/components/RatingCard.vue'
import { toast } from 'vue-sonner'

const {data: currentEvent, status: event_status, error: event_error} = await useFetch(`/api/event/2025`, {lazy: true})

console.log(currentEvent)


const session = await useAuth().useSession();

watch(event_status, (s) => {
  if (s === 'error')
    toast('Error obteniendo datos del evento', { description: event_error.value?.data })
})


const {data: newsGames, status: new_status, error: new_error} = await useFetch('/api/games?limit=9&offset=1', {lazy: true})

watch(new_status, (s) => {
  if (s === 'error')
    toast('Error obteniendo nuevos juegos', { description: new_error.value?.data })
})

console.log(newsGames)
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
       <div class="flex flex-col justify-center items-center w-full" v-if="event_status === 'pending' || currentEvent" >
      <p class="font-gabarito font-normal text-[16px] text-black">
        Ganador del Juego Jalea 2025
      </p>
      <ProductoSkeleton class="flex-1 min-h-0 min-w-0 h-96 w-full" v-if="event_status === 'pending'"/>
      <div class="flex flex-1 gap-[10px] items-center justify-center min-h-0 min-w-0 overflow-hidden p-[10px] w-full" v-else-if="currentEvent && currentEvent?.winners.length">
        <RatingCard :rating="currentEvent?.winners[0]?.game.puntuation ?? 0" label="Publico" />
        <ProductoMini
        :description="currentEvent?.winners[0]?.game.description!"
        :image="currentEvent?.winners[0]?.game.cover!"
        :title="currentEvent?.winners[0]?.game.title!"
        :rating="currentEvent?.winners[0]?.game.puntuation"
        :key="0"
        :price="currentEvent?.winners[0]?.game.price!"
        :username="currentEvent?.winners[0]?.game.user.nickname"
        />
        <RatingCard :rating="currentEvent?.winners[0]?.game.evaluation ?? 0" label="Evaluadores" />
      </div>
      <UiSeparator class="my-8" />
       </div>


      <!-- News Section -->
      <div class="h-full flex flex-col items-center">
        <p class="font-gabarito font-normal text-[16px] text-black">
        Novedades
      </p>

          <UiEmpty v-if="newsGames && !newsGames.games.length">
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <XCircle></XCircle>
        </UiEmptyMedia>
        <UiEmptyTitle>Sin juegos</UiEmptyTitle>
        <UiEmptyDescription>No hay juegos</UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="destructive" asChild v-if="session.data">
          <NuxtLink :to="{ name: 'userid-juego-nuevo', params: { userid: session.data.user.nickname } }">
            Crear uno
          </NuxtLink>
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>


      <UiCarousel>
          <UiCarouselContent >
            <UiCarouselItem v-for="i of 3" :key="i" class=" md:basis-1/3 "  v-if="new_status === 'pending'">
          <ProductoSkeleton class="flex-1 min-h-0 min-w-0 h-48 w-48" />
          </UiCarouselItem>  
          <UiCarouselItem v-for="[index, game] of newsGames?.games.entries()" :key="index" class=" md:basis-1/3 " v-else>
<LazyProductoMini
          :key="index"
          :title="game.title"
          :description="game.description"
          :image="game.cover"
          :price="game.price"
          :rating="game.punctuation"
          :username="game.user.nickname"
          class="flex-1 min-h-0 min-w-0"
        />
            </UiCarouselItem>
            
          </UiCarouselContent>
          <UiCarouselPrevious v-if="newsGames && newsGames.games.length"/>
          <UiCarouselNext  v-if="newsGames && newsGames.games.length"/>
      </UiCarousel>
      <div v-if="newsGames && newsGames.games.length">
      <UiSeparator class="my-8"></UiSeparator>
      <UiButton asChild >
        <NuxtLink :to="{name: 'novedades'}">
          Ver mas
        </NuxtLink>
      </UiButton>
  </div>
    </div>
    </div>
  </div>
</template>
