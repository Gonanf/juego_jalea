<template>
  <UiTabs class="w-full" default-value="users">
    <UiTabsList class="w-full">
      <UiTabsTrigger value="users">
        Users
      </UiTabsTrigger>
      <UiTabsTrigger value="categories" @click="categories.execute">
        Categories
      </UiTabsTrigger>
      <UiTabsTrigger value="events" @click="events.execute">
        Events
      </UiTabsTrigger>
      <UiTabsTrigger value="games" @click="games.execute">
        Games
      </UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent value="users">
      <p>Status: {{ users.status }}</p>
      <p v-if="users.error">Error: {{ users.error }}</p>
      <UiItem v-for="item of users.data.value" variant="outline">
        <div class="grid grid-cols-5 items-center w-full justify-center" >
          <img :src="item.image" alt="" class="rounded-full" referrerPolicy="no-referrer">
          <p>{{ item.nickname ?? item.name }}</p>
          <p>{{ item.email }}</p>
          <div class="w-full flex justify-center" v-if="item.banned">
            <UiButton variant="destructive" @click="unban(item.id)" class="w-fit">Unban</UiButton>
          </div>
          <UiDialog v-else>
            <UiDialogTrigger>
              <UiButton variant="destructive">Ban</UiButton>
            </UiDialogTrigger>
            <UiDialogContent>
              <UiInput v-model="banreason.reason" placeholder="Ingresar razon" />
              <UiInput v-model="banreason.time" placeholder="Ingresar dias" type="number" />
              <UiButton variant="destructive" @click="ban(item.id)">confirmar</UiButton>
            </UiDialogContent>
          </UiDialog>
        <UiDialog>
            <UiDialogTrigger>
              <UiButton variant="default" class="bg-yellow-500"><Icon name="lucide:edit" /></UiButton>
            </UiDialogTrigger>
            <UiDialogContent>
              <UiInput v-model="nickname" placeholder="Ingresar nombre de usuario" />
              <UiDialogClose variant="destructive" @click="editUsuario(item.id)">confirmar</UiDialogClose>
            </UiDialogContent>
          </UiDialog>
        </div>
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="categories">
      <p>Status: {{ categories.status }}</p>
      <p v-if="categories.error">Error: {{ categories.error }}</p>
      <UiDialog>
            <UiDialogTrigger>
      <UiButton class="bg-yellow-500"><Icon name="lucide:plus"></Icon></UiButton>
            </UiDialogTrigger>
            <UiDialogContent>
              <UiInput v-model="nickname" placeholder="Ingresar nombre de usuario" />
              <UiDialogClose variant="destructive" @click="addCategory">confirmar</UiDialogClose>
            </UiDialogContent>
          </UiDialog>
      <UiItem v-for="item of categories.data.value" class="grid grid-cols-2" variant="outline">
        <p>{{ item.name }}</p>
        <p>{{ item.createdAt }}</p>
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="events">
      <p>Status: {{ events.status }}</p>
      <p v-if="events.error">Error: {{ events.error }}</p>
      <UiDialog>
            <UiDialogTrigger>
      <UiButton class="bg-yellow-500"><Icon name="lucide:plus"></Icon></UiButton>
            </UiDialogTrigger>
            <UiDialogContent>
              <UiInput v-model="nickname" placeholder="Ingresar nombre de usuario" />
              <UiDialogClose variant="destructive" @click="addEvent">confirmar</UiDialogClose>
            </UiDialogContent>
          </UiDialog>
      <UiItem v-for="item of events.data.value" class="grid grid-cols-2" variant="outline">
        <p>{{ item.name }}</p>
        <p>{{ item.createdAt }}</p>
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="games">
      <p>Status: {{ games.status }}</p>
      <p v-if="users.error">Error: {{ games.error }}</p>
      <UiItem v-for="item of games.data.value" class="grid grid-cols-3">
        {{ item.user.nickname?? item.user.name }}
        {{ item.title }}
        <UiButton asChild class="bg-yellow-500 w-fit"><NuxtLink :to="{name: 'userid-juego-nuevo',params: {userid: item.user.nickname},query: {edit: item.title}}"><Icon name="lucide:edit"></Icon></NuxtLink></UiButton>
      </UiItem>
    </UiTabsContent>
  </UiTabs>
</template>

<script lang="ts" setup>
import { param } from 'drizzle-orm'
import { toast } from 'vue-sonner'


const session = useAuth().useSession()
const unwatch = watch(session, async () => {
  if (!session.value.isPending) {
    if (session.value.data?.user.role === 'admin') unwatch()
    else throw createError('Not an admin')
  }
})

const users = await useFetch('/api/admin/users', { lazy: true })
const categories = await useFetch('/api/admin/categories', { lazy: true, immediate: false })
const events = await useFetch('/api/admin/events', { lazy: true, immediate: false })
const games = await useFetch('/api/admin/games', { lazy: true, immediate: false })

const banreason = ref<{ reason: string, time: number }>({ reason: '', time: 7 })

async function ban(userid: string) {
  banreason.value.time = banreason.value.time * (60 * 60 * 24)
  const {status, error} = await useFetch(`/api/admin/users/${userid}/ban`, {
    method: "POST",
    body: banreason
  });
    if (status.value === 'error'){
    toast('Error al banear usuario',{description: error.value.data})
   }
   else{
    toast('Usuario baneado correctamente')
    users.refresh
      banreason.value = { reason: '', time: 7 }
   }
}

const nickname = ref('')

async function unban(userid: string) {
  const {status, error} = await useFetch(`/api/admin/users/${userid}/unban`, { method: "POST" });
  if (status.value === 'error'){
    toast('Error al desbanear usuario',{description: error.value.data})
   }
   else{
    toast('Usuario desbaneado correctamente')
    users.refresh()
   }
}

async function editUsuario(userid: string){
  const {status, error} = await useFetch(`/api/${userid}`, { method: "PUT",
    body: {nickname}
   });
  console.log("STATUS",status.value,"ERROR:",error.value)
   if (status.value === 'error'){
    toast('Error al editar usuario',{description: error.value.data})
   }
   else{
    toast('Usuario editado correctamente')
    users.refresh()
    nickname.value = ''
   }
}

async function addCategory(){
    const {status, error} = await useFetch(`/api/admin/categories/${nickname.value}`, { method: "POST" });
  console.log("STATUS",status.value,"ERROR:",error.value)
   if (status.value === 'error'){
    toast('Error al añadir categoria',{description: error.value.data})
   }
   else{
    toast('categoria añadida correctamente')
    categories.refresh()
    nickname.value = ''
   }
}

async function addEvent(){
    const {status, error} = await useFetch(`/api/admin/events/${nickname.value}`, { method: "POST" });
  console.log("STATUS",status.value,"ERROR:",error.value)
   if (status.value === 'error'){
    toast('Error al añadir evento',{description: error.value.data})
   }
   else{
    toast('Evento añadido correctamente')
    events.refresh()
    nickname.value = ''
   }
}
</script>
