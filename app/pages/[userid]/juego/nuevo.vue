<template>
  <form @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField, handleChange, handleBlur }" name="cover">
      <FormItem>
        <FormLabel>Portada</FormLabel>
        <FormControl >
          <UiInput type="file" accept="image/*" v-bind="componentField" @change="handleChange" @blur="handleBlur"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField, handleChange, handleBlur }" name="pictures">
      <FormItem>
        <FormLabel>Imagenes</FormLabel>
        <FormControl >
          <UiInput type="file" multiple accept="image/*" v-bind="componentField" @change="handleChange" @blur="handleBlur"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Titulo</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Descripcion</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>   

    <FormField v-slot="{ componentField }" name="event_id">
      <FormItem>
        <FormLabel>Evento</FormLabel>
        <FormControl >
          <UiInput type="text" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> 

    <FormField v-slot="{ componentField }" name="price">
      <FormItem>
        <FormLabel>Precio</FormLabel>
        <FormControl >
          <UiInput type="number" v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> 

    <UiButton type="submit">
      Submit
    </UiButton> 
  </form>
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

const schema = toTypedSchema(z.object(
  {
      cover: z.file({error: "Debe estar completo"}).max(1024*1024).optional(),
      pictures: z.array(z.file({error: "Debe estar completo"}).max(2048*2048)).optional(),
    // categories: TODO: Later
      title: z.string({error: "Debe estar completo"}).min(1).max(128),
      description: z.string({error: "Debe estar completo"}).min(1).max(512),
      price: z.number({error: "Debe estar completo"}).min(0).max(60),
      user_id: z.string({error: "Debe estar completo"}).optional(), //Because it gets set with userid
      event_id: z.string({error: "Debe estar completo"}).optional()
  }
))

const route = useRoute()

const form = useForm({
  validationSchema: schema,

})

form.setFieldValue("user_id",route.params.userid as string)



const onSubmit = form.handleSubmit((values) => {

// TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
console.log('👷 - values:', values);

var form_data = new FormData();



for ( var key in values ) {
    if (values[key]?.constructor?.name === "Array"){
      for (const i of values[key]){
        form_data.append(key, i);
      }
      continue;
    }
    form_data.append(key, values[key]);
}

// TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
console.log('👷 - form_data:', form_data);

  const fetch = useFetch(`/api/${route.params.userid}/juego/nuevo`,{
    method: "POST",
    body: form_data
  }).catch((err) => alert('Error al enviar peticion:\n'+ err.data?.message))
})
</script>
