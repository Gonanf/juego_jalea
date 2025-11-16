<template>
    <div class="h-full grow flex flex-col justify-center items-center p-5">
        <p class="font-gabarito font-normal text-[16px] text-black">
        Mis Juegos
      </p>
      <div :class="cn('grid', 'grid-cols-3', `grid-rows-${limit / 3}`,'w-full','h-full','gap-4')" >
<ProductoMini
          :key="index"
          :title="game.title"
          :description="game.description"
          :price="game.price"
          :image="game.cover"
          :rating="game.punctuation?? 0"
          :username="data.nickname"
          class="flex-1 min-h-0 min-w-0 h-full w-full"
          v-for="[index,game] of data?.games.entries()"
        />
      </div>
  </div>

</template>

<script setup lang="ts">
import { cn } from '~/lib/utils';
//TODO: Complete this

const route = useRoute()
/* SESSION */
const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
    if (!session.value.isPending) {
        if (await isTheUserOwner(session, route.params.userid)) unwatch();
    }
});


const {data} = await useFetch(`/api/${route.params.userid}`);

</script>
