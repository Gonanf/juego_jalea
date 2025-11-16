<template>

  <div class="h-full grow flex flex-col justify-center items-center p-5">
    <p class="font-gabarito font-normal text-lg text-black">
      Ganadores
    </p>
    <UiSeparator></UiSeparator>

    <UiEmpty v-if="data && !data.games.length">
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <XCircle></XCircle>
        </UiEmptyMedia>
        <UiEmptyTitle>Sin juegos</UiEmptyTitle>
        <UiEmptyDescription>No hay juegos ganadores</UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="destructive" asChild v-if="session.data">
          <NuxtLink :to="{ name: 'userid-juego-nuevo', params: { userid: session.data.user.nickname } }">
            Enviar submicion
          </NuxtLink>
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>

    <div :class="cn('grid', 'grid-cols-3', `grid-rows-${limit / 3}`, 'w-full', 'h-full', 'gap-4')">
      <ProductoSkeleton v-for="value in 9" class="flex-1 min-h-0 min-w-0 h-full w-full" v-if="status === 'pending'" />
      <ProductoMini :key="index" :title="game.game.title" :description="game.game.description" :price="game.game.price"
        :image="game.game.cover" :rating="game.game.punctuation ?? 0" :username="game.game.user.nickname"
        class="flex-1 min-h-0 min-w-0 h-full w-full" v-else v-for="[index, game] of data?.games.entries()" />
    </div>
    <UiPagination v-slot="{ page }" :items-per-page="limit" :total="data.count" v-model:page="offset" v-if="data">
      <UiPaginationContent v-slot="{ items }">
        <UiPaginationPrevious></UiPaginationPrevious>
        <template v-for="(item, index) in items" :key="index">
          <UiPaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">

          </UiPaginationItem>
        </template>

        <UiPaginationEllipsis :index="4" />
        <UiPaginationNext />
      </UiPaginationContent>
    </UiPagination>
  </div>

</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';
import { cn } from '~/lib/utils';
import { XCircle } from 'lucide-vue-next';


const limit = ref(9)
const offset = ref(1)
const search = ref('')

const { data, status, error, refresh } = await useFetch('/api/games/winners', {
  query: { limit, offset, search },
  lazy: true
})

const session = await useAuth().useSession();

watch(status, (s) => {
  if (s === 'error')
    toast('Error obteniendo juegos', { description: error.value?.data })
})


console.log(data)

</script>