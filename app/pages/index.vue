<script setup lang="ts">
import { Separator } from '~/components/ui/separator'
const fecha_final = new Date("2025-11-07T00:00:00Z")
const diff = ref(fecha_final - new Date());
const ahora = diff.value < 0
console.log(diff.value)

const hours = ref(diff.value / 3.6e6 | 0)
const mins = ref(diff.value % 3.6e6 / 6e4 | 0)
const secs = ref(Math.round(diff.value % 6e4 / 1e3))
setInterval(() => {
  diff.value = fecha_final - new Date();
  hours.value = diff.value / 3.6e6 | 0
  mins.value = diff.value % 3.6e6 / 6e4 | 0
  secs.value = Math.round(diff.value % 6e4 / 1e3)
}, 1000)


</script>

<template>
  
  <div class="h-full w-full bg-[url(/pexels-chokniti-khongchum-1197604-2679968.jpg)] flex items-center justify-center max-lg:flex-col">
    <div class="w-full flex flex-col items-center gap-5">
      <NuxtLink to="/">
        <NuxtImg src="/logo.svg" class="w-[2rem] h-[2rem]" placeholder />
      </NuxtLink>
      <p class="text-5xl text-amber-800 duration-500 font-serif animate-pulse">PRONTO</p>
      <p class="text-white text-center">¡Participa de la competencia de creacion de videojuegos y unete a la plataforma!</p>
    </div>
    <Separator class="mx-4 max-lg:hidden" orientation="vertical"></Separator>
    <div class="w-full flex flex-col items-center gap-5">
      <p class="text-white">El sitio web estara disponible en:</p>
      <div class="gap-5 grid grid-cols-4 w-full">
        <TimerC :time="Math.round(hours/24)">
          Dias
        </TimerC>

        <TimerC :time="hours%24">
          Horas
        </TimerC>

        <TimerC :time="mins">
          Minutos
        </TimerC>

        <TimerC :time="secs">
          Segundos
        </TimerC>

      </div>
      <p class="text-white">Del 7 al 16 de noviembre</p>
    </div>
    
  </div>
</template>
