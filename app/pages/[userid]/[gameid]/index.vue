<template>
  <form @submit.prevent="uploadFile">
    <label>Upload a file: <input type="file" name="file"></label>
    <button type="submit">
      Upload
    </button>
  </form>

  <div class="bg-amber-100 ">
  <form @submit.prevent="uploadtest" class="grid">
    TESTO 2
    <label>Upload a file: <input type="file" name="file"/></label>
    
    <label>Upload images: <input type="file"  name="images" multiple/></label>
    
    <label>Upload a title: <input type="text" name="title"/></label>
     
    <button type="submit">
      Upload
    </button>
</form>
  </div>
</template>

<script lang="ts" setup>
const router = useRoute()

async function uploadFile(e: Event) {
  const form = e.target as HTMLFormElement

  await $fetch(`/api/${router.params.userid}/${router.params.gameid}/files`, {
    method: 'POST',
    body: new FormData(form)
  }).catch((err) => alert('Failed to upload file:\n'+ err.data?.message))

  form.reset()
}

async function uploadtest(e: Event){
   const form = e.target as HTMLFormElement

  await $fetch(`/api/${router.params.userid}/juego/nuevo`, {
    method: 'POST',
    body: new FormData(form)
  }).catch((err) => alert('Failed to upload file:\n'+ err.data?.message))

  form.reset()
}
</script>