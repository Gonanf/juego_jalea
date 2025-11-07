<template>
 <div>
  
 </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const auth = useAuth()
const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
  if (!session.value.isPending){
    if (await isTheUserOwner(session,useRoute().params.userid)) unwatch()
  }
})


</script>
