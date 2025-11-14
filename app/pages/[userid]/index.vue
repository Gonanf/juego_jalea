<template>
    <UiCard>
        <UiCardHeader class="flex justify-between items-center">
            Informacion de usuario
            <UiButton variant="ghost" @click="auth.signOut">
                <Icon name="lucide:log-out" size="1.5rem"></Icon>
            </UiButton>
        </UiCardHeader>
        <UiCardContent>
            <div class="flex w-full gap-5" v-if="session.isPending">
                <div class="grow gap-5 grid">
                    <UiSkeleton class="w-full h-[50px]"></UiSkeleton>
                    <UiSkeleton class="w-full h-[50px]"></UiSkeleton>
                    <UiSkeleton class="w-full h-[50px]"></UiSkeleton>
                </div>

                <UiSkeleton class="w-[300px]"></UiSkeleton>
            </div>
            <div class="flex w-full gap-5" v-else>
                <div class="grow">
                    <UiItem variant="outline">
                        <UiItemContent>
                            <UiItemTitle>Nombre</UiItemTitle>
                            <UiItemDescription>{{
                                session.data.user.name
                            }}</UiItemDescription>
                        </UiItemContent>
                    </UiItem>

                    <UiItem variant="outline">
                        <UiItemContent>
                            <UiItemTitle>Apodo</UiItemTitle>
                            <UiItemDescription>{{
                                session.data.user.nickname ?? "Sin apodo"
                            }}</UiItemDescription>
                        </UiItemContent>
                    </UiItem>

                    <UiItem variant="outline">
                        <UiItemContent>
                            <UiItemTitle>Email</UiItemTitle>
                            <UiItemDescription>{{
                                session.data.user.email
                            }}</UiItemDescription>
                        </UiItemContent>
                    </UiItem>
                </div>

                <img
                    :src="session.data.user.image!"
                    alt="usuario"
                    referrerPolicy="no-referrer"
                    class="object-cover w-[15%] rounded-md shadow-lg"
                />
            </div>
        </UiCardContent>
    </UiCard>
</template>

<script lang="ts" setup>
const route = useRoute();
const auth = useAuth();
const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
    if (!session.value.isPending) {
        if (await isTheUserOwner(session, useRoute().params.userid)) unwatch();
    }
});
</script>
