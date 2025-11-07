<script setup lang="ts">
</script>

<template>
  
  <NuxtLink :to="{name: 'edicion-2025'}" class="h-[25%]"><img src="/edicion/2025/Portada.png" class="w-full h-full shadow-lg object-cover"/></NuxtLink>

  <UiEmpty>
    <UiEmptyHeader>
      <UiEmptyMedia variant="icon">
        <UiAvatar class="h-8 w-8 rounded-lg">
            <UiAvatarImage src="/logo.svg"/>
            <UiAvatarFallback>
              JJ
            </UiAvatarFallback>
          </UiAvatar>
      </UiEmptyMedia>
      <UiEmptyTitle>Sin submiciones</UiEmptyTitle>
      <UiEmptyDescription>Actualmente no estan habilitadas las submiciones</UiEmptyDescription>
    </UiEmptyHeader>
  </UiEmpty>
</template>
