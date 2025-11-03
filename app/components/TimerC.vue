<template>
  <div class="border-solid border-2 rounded-md p-5 w-full h-full">
          <p class="sm:text-7xl max-sm:text-xl font-bold text-white text-center">{{ props.time }}</p>
          <Separator class="w-full my-4"/>
          <p class="text-white text-center">
            <slot>

          </slot>
          </p>
  </div>
</template>

<script lang="ts" setup>
import { Separator } from "./ui/separator"
const props = defineProps(['time'])
</script>
