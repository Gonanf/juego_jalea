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
      <UiItem v-for="item of users.data.value">
        <UiItem class="grid grid-cols-4 items-center w-full justify-center" variant="outline">
          <img :src="item.image" alt="" class="rounded-full">
          <p>{{ item.nickname ?? item.name }}</p>
          <p>{{  item.email }}</p>
          <div class="w-full flex justify-center" v-if="item.banned">
          <UiButton variant="destructive"  @click="unban(item.id)" class="w-fit">Unban</UiButton>
          </div>
        <UiDialog v-else>
        <UiDialogTrigger>
          <UiButton variant="destructive" >Ban</UiButton>
        </UiDialogTrigger>
      <UiDialogContent>
        <UiInput v-model="banreason.reason" placeholder="Ingresar razon" />
        <UiInput v-model="banreason.time" placeholder="Ingresar dias" type="number" />
        <UiButton variant="destructive" @click="ban(item.id)">confirm</UiButton>
      </UiDialogContent>
      </UiDialog>
        </UiItem>
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="categories">
      <p>Status: {{ categories.status }}</p>
      <p v-if="users.error">Error: {{ categories.error }}</p>
      <UiItem v-for="item of categories.data.value">
        {{ item }}
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="events">
      <p>Status: {{ events.status }}</p>
      <p v-if="users.error">Error: {{ events.error }}</p>
      <UiItem v-for="item of events.data.value">
        {{ item }}
      </UiItem>
    </UiTabsContent>
    <UiTabsContent value="games">
      <p>Status: {{ games.status }}</p>
      <p v-if="users.error">Error: {{ games.error }}</p>
      <UiItem v-for="item of games.data.value">
        {{ item }}
      </UiItem>
    </UiTabsContent>
  </UiTabs>
</template>

<script lang="ts" setup>

const session = useAuth().useSession()
const unwatch = watch(session, async () => {
  if (!session.value.isPending){
    if (session.value.data?.user.role === 'admin') unwatch()
    else throw createError('Not an admin')
  }
})

const users = await useFetch('/api/admin/users',{lazy: true}) 
const categories = await useFetch('/api/admin/users',{lazy: true, immediate: false}) 
const events = await useFetch('/api/admin/users',{lazy: true, immediate: false}) 
const games = await useFetch('/api/admin/users',{lazy: true, immediate: false}) 

const banreason = ref<{reason: string, time: number}>({reason: '', time: 7})

async function ban(userid: string){
  banreason.value.time = banreason.value.time * (60*60*24)
  await useFetch(`/api/admin/users/${userid}/ban`,{method: "POST",
    body: banreason
  });
  banreason.value = {reason: '', time: 7}
}

async function unban(userid: string){
  await useFetch(`/api/admin/users/${userid}/unban`,{method: "POST"});
}
</script>
