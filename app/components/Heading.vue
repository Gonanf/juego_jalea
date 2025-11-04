<script setup lang="ts">
import {Button} from "./ui/button";
const auth = useAuth();
console.log(auth.status)


</script>

<template>
    <header class="w-full p-5 flex justify-between shadow-md items-center bg-amber-100" >
    <NuxtLink to="/">
      <NuxtImg src="/logo.svg" class="w-[2rem] h-[2rem]" placeholder  />
    </NuxtLink>
        <div class="flex gap-5">
            <Button asChild variant="ghost" disabled>
                <NuxtLink :to="{name: 'index'}">
                    Tienda
                </NuxtLink>
            </Button>
            <Button asChild variant="ghost">
                <NuxtLink :to="{name: 'about'}">
                    Acerca
                </NuxtLink>
            </Button>
            <Button variant="ghost" @click="auth.signIn('auth0')">
              Iniciar Sesion
            </Button>
        </div>
</header>
</template>