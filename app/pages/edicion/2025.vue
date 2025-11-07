<template>
  <div class="w-full h-full">
    <img src="/edicion/2025/Portada2_v3.png" class="w-full h-[70vh] shadow-lg object-scale-down"/>

    <UiTabs default-value="descripcion" class="w-full [&>*]:w-full">
    <UiTabsList>
      <UiTabsTrigger value="descripcion">
        Descripcion
      </UiTabsTrigger>
      <UiTabsTrigger value="juegos" disabled>
        Juegos
      </UiTabsTrigger>
      <UiTabsTrigger value="ganador" disabled>
        Ganador
      </UiTabsTrigger>
      <UiTabsTrigger value="evaluadores">
        Evaluadores
      </UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent value="descripcion">
       <UiCard>
    <UiCardHeader>
      ¿Que es Juego Jalea?
    </UiCardHeader>
    <UiCardContent>
      Juego Jalea son competencias que realizamos un grupo pequeño de alumnos de la E.E.S.T N°2, en esta edicion se
      invita a todo el que quiera participar
      y se estrena una nueva tienda virtual para almacenar todos los Juegos Jaleas habidos y por haber, aun que hay
      algunos que no sobrevivieron el paso del tiempo.
      <br></br>
      Esta competencia consiste en crear un videojuego en un corto periodo de tiempo con una tematica especifica que se
      comunica al inicio de la competencia.
      Mayormente se evalua quien fue mas creativo o quien lo hizo mejor teniendo en cuenta el periodo de tiempo provisto
      (Ver <NuxtLink :to="{name: 'about-requisitos'}" class="text-purple-800">Requisitos</NuxtLink>).
      <br></br>
      En esta edicion, el ganador sera presentado en la pagina principal junto a su proyecto.
    </UiCardContent>
  </UiCard>

  <UiCard>
    <UiCardHeader>
      Requisitos
    </UiCardHeader>
    <UiCardContent>
      Los requisitos son los siguientes:
      <br />
      <ul class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>Los videojuegos se pueden presentar hasta las 00:00 horas del 17, a su vez se va a evaluar en directo el 17
          a las 6:00 pm</li>
        <li>El videojuego debe estar inspirado/basado/relacionado al tema provisto</li>
        <li>Deben ser entregados como un ejecutable (O Zip que contenga el ejecutable) ya sea para Windows o Linux</li>
        <li>Esta edicion es individual, aun que se permiten compartir ideas y ofrecer apoyo</li>
      </ul>
      <br />
      Algo para notar, los videojuegos se pueden subir y pueden estar en cualquier forma y formato, a lo que se refiere:
      <br />
      <ul class="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>Puede estar incompleto/con errores</li>
        <li>Se pueden realizar con cualquier programa, lenguaje, engine, herramienta, etc.</li>
        <li>Pueden ser entregados fuera de fecha, pero no seran considerados en el Juego Jalea</li>
      </ul>
      <br />
    </UiCardContent>
  </UiCard>


    </UiTabsContent>
    <UiTabsContent value="evaluadores">
       <UiButton asChild variant="outline" class="w-fit">
        Gabriel Solotorevsky:
      <NuxtLink to="https://github.com/Gonanf" target="_blank" class="gap-5 flex items-center">
          <Icon name="lucide:github" size="1.5rem"></Icon>
          <span>Gonanf</span>
      </NuxtLink>
      </UiButton>
    </UiTabsContent>
  </UiTabs>
  </div>
  
</template>

<script lang="ts" setup>

</script>
