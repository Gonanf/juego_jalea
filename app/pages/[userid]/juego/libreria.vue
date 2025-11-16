<template>
    <div class="flex flex-end w-full justify-end">
        <UiButton variant="destructive" class="rounded-bl-full pl-5" asChild>
            <NuxtLink :to="{name: 'userid-juego-nuevo', params: {userid: route.params.userid}}">
            Subir juego
            </NuxtLink>
        </UiButton>
    </div>
    <div class="h-full grow flex flex-col justify-center items-center p-5">
        <p class="font-gabarito font-normal text-lg text-black">
        Mis Juegos
      </p>
      <UiSeparator></UiSeparator>
      <UiEmpty v-if="data && !data.games.length">
            <UiEmptyHeader>
                <UiEmptyMedia variant="icon">
                <XCircle></XCircle>
                </UiEmptyMedia>
                <UiEmptyTitle>Sin juegos</UiEmptyTitle>
                <UiEmptyDescription>No creaste ningun juego, apreta el boton de "Crear juego" para hacer uno</UiEmptyDescription>
            </UiEmptyHeader>
      </UiEmpty>



      <div :class="cn('grid', 'grid-cols-3', `grid-rows-${limit / 3}`,'w-full','h-full','gap-4')" >
        <ProductoSkeleton v-for="value in 9" class="flex-1 min-h-0 min-w-0 h-full w-full" v-if="status === 'pending'"/>
        
<LazyProductoMini
          :key="index"
          :title="game.title"
          :description="game.description"
          :price="game.price"
          :image="game.cover"
          :rating="game.punctuation?? 0"
          :username="data.nickname"
          class="flex-1 min-h-0 min-w-0 h-full w-full"
          v-else
          v-for="[index,game] of data?.games.entries()"
        />
      </div>
  </div>

</template>

<script setup lang="ts">
import { watchPausable } from '@vueuse/core';
import { cn } from '~/lib/utils';
import { XCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const route = useRoute()
/* SESSION */
const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
    if (!session.value.isPending) {
        if (await isTheUserOwner(session, route.params.userid)) unwatch();
    }
});


const {data, status, error} = await useFetch(`/api/${route.params.userid}`, {lazy: true});

watch(status, (s) => {
    if (s === 'error')
    toast('Error obteniendo juegos del usuario', {description: error.value?.data})
})

</script>
