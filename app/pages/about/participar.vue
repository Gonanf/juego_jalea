<template>
  <UiCard>
    <UiCardHeader>
      Como participar
    </UiCardHeader>
    <UiCardContent>
      Una vez iniciado sesion, podras ir a la seccion de <NuxtLink :to="{name: 'edicion-2025'}" class="text-purple-800">Competicion</NuxtLink> para ver los temas y requisitos.
      <br/>
      Una vez teniendo un juego a subir, al apretar el boton de "Añadir" en la pagina de <NuxtLink :to="{name: 'edicion-2025'}" class="text-purple-800">Competicion</NuxtLink>  podras preparar la pagina de tu proyecto y añadir los archivos correspondientes. 
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
const last = 2025

</script>