<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  description?: string
  price?: string
  rating?: number
  image?: string
  class?: string,
  username: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Titulo',
  description: 'Descripcion',
  price: 'Gratuito',
  rating: 0,
  image: undefined,
})
</script>

<template>
  <NuxtLink
    :class="cn('flex flex-col h-[201px] items-start justify-between p-[10px] border border-[#d8d8d8] rounded', props.class)"
    :to="{name: 'userid-gameid', params: {userid: username, gameid: title}}"
  >
    <div class="flex flex-col gap-[10px] items-start w-full">
      <div
        class="bg-[#dadada] h-[100px] w-full rounded"
        :style="image ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
      />
      <div class="flex flex-col gap-[10px] items-start w-full">
        <div class="flex items-start justify-between w-full">
          <p class="font-gabarito font-normal text-[12px] text-black">
            {{ title }}
          </p>
          <div v-if="rating >= 0" class="flex gap-[2px] items-start">
            <Star
              v-for="i in 5"
              :key="i"
              :class="cn('size-[12px]', i <= rating ? 'fill-black text-black' : 'text-gray-300')"
            />
          </div>
        </div>
        <!--
        <p class="font-gabarito font-normal text-[#6b6b6b] text-[10px]">
          {{ price }}
        </p>-->
        <p class="font-gabarito font-normal text-[#bebebe] text-[12px]">
          {{ description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

