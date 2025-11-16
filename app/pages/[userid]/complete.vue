<template>
  <div class="w-full h-full flex justify-center items-center">
  <UiCard class="min-w-[50%] min-h-[50%]">
    <UiCardHeader>
      <UiCardTitle>
        Completa tu cuenta
      </UiCardTitle>
      <UiCardDescription>
        Solo queda un ultimo paso, definir tu nombre de usuario.
      </UiCardDescription>
    </UiCardHeader>
    <UiSeparator/>
    <UiCardContent>
      <form @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="nickname">
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormDescription>
                Los jugadores te podran identificar por este nombre de usuario
              </FormDescription>
              <FormControl>
                <UiInput v-bind="componentField"></UiInput>
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          </FormField>
    <UiSeparator class="m-5"/>
      <UiButton type="submit">
        Guardar
      </UiButton>
      </form>

      
    </UiCardContent>

  </UiCard>
  </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'vue-sonner'

const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
  if (!session.value.isPending){
    if (await isTheUserOwner(session,useRoute().params.userid)) unwatch()
  }
})

const schema = toTypedSchema(z.object(
  {
      nickname: z.string({error: "Debe completarse"}).min(1).max(25)
  }
))

const route = useRoute()

const form = useForm({
  validationSchema: schema,
})

const onSubmit = form.handleSubmit(async (values) => {
    const {data, error, status} = await useFetch(`/api/${route.params.userid}`,{
      method: "PUT",
      body: JSON.stringify(values)
    })

    if (status.value === "error"){
      toast('No se pudo actualizar el nombre de usuario', {
        description: error.value,
      })
      form.resetForm()
      return;
    }

    return navigateTo({name: 'userid', params: {userid: route.params.userid}})
})

</script>
