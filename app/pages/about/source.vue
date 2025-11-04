<template>
  <UiCard>
    <UiCardHeader>
      Codigo fuente
    </UiCardHeader>
    <UiCardContent>
      El codigo fuente de la pagina de Juego Jalea esta disponible en:
      <br/>
      <UiButton asChild variant="outline" class="w-fit">
      <NuxtLink to="https://github.com/Gonanf/juego_jalea" target="_blank" class="gap-5 flex items-center">
          <Icon name="lucide:github" size="1.5rem"></Icon>
          <span>Gonanf/juego_jalea</span>
      </NuxtLink>
      </UiButton>
    </UiCardContent>
  </UiCard>
</template>