<template>

<div class="h-full grow flex flex-col justify-center items-center p-5">
        <p class="font-gabarito font-normal text-[16px] text-black">
        Novedades
      </p>
      <div :class="cn('grid', 'grid-cols-3', `grid-rows-${limit / 3}`,'w-full','h-full','gap-4')" >
<ProductoMini
          :key="index"
          :title="game.title"
          :description="game.description"
          :price="game.price"
          :rating="game.punctuation"
          class="flex-1 min-h-0 min-w-0"
          v-for="[index,game] of data?.games.entries()"
        />
      </div>
      <UiPagination v-slot="{ page }" :items-per-page="limit" :total="data.count" v-model:page="offset">
        <UiPaginationContent v-slot="{ items }">
          <UiPaginationPrevious></UiPaginationPrevious>
          <template v-for="(item, index) in items" :key="index"> 
          <UiPaginationItem 
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page">
            
          </UiPaginationItem>
        </template>

        <UiPaginationEllipsis :index="4"/>
        <UiPaginationNext /> 
        </UiPaginationContent>
      </UiPagination>
  </div>

</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';


const limit = ref(9)
const offset = ref(1)
const search = ref('')

const {data, refresh} = await useFetch('/api/games',{
    query: {limit,offset}
})

console.log(data)

</script>