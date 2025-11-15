<template>
    
</template>

<script setupt lang="ts">
//TODO: Complete this
const response = await fetch(`/api/users/${useRoute().params.userId}/games`);
const data = await response.json();
const games = data;
</script>
