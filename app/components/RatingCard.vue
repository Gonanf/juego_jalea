<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  rating: number
  label: string
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('bg-[#f3f3f3] border border-[#dadada] rounded-[25px] size-[100px] flex flex-col gap-[10px] items-center p-[10px] shadow-md', props.class)"
  >
      <div class="flex flex-1 items-center justify-center w-full">
        <div class="flex items-center gap-1">
          <span class="font-fjalla-one text-[32px] text-black leading-none">{{ rating }}</span>
          <Star class="size-[32px] fill-black text-black" />
        </div>
      </div>
      <div class="bg-[#cecece] h-px w-full" />
      <p class="font-gabarito font-normal text-[#bebebe] text-[16px]">
        {{ label }}
      </p>
  </div>
</template>

