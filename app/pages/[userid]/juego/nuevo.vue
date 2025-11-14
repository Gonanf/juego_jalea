<template>
    <div class="w-full max-w-6xl mx-auto p-6 space-y-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
            <div class="flex gap-4 items-start">
                <!-- PORTADA -->
                <FormField v-slot="{ componentField }" name="cover">
                    <FormItem class="shrink-0">
                        <FormControl>
                            <label class="relative cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    class="hidden"
                                    @change="
                                        (event: Event) =>
                                            handleCoverChange(
                                                event,
                                                componentField.onChange,
                                            )
                                    "
                                />
                                <div
                                    class="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors overflow-hidden"
                                >
                                    <Plus
                                        v-if="!coverPreview"
                                        class="w-8 h-8 text-gray-400"
                                    />
                                    <img
                                        v-else
                                        :src="coverPreview"
                                        alt="Portada"
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                            </label>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- TITULO -->
                <div class="flex-1 space-y-2">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem>
                            <FormControl>
                                <UiInput
                                    type="text"
                                    v-bind="componentField"
                                    placeholder="Titulo"
                                    class="text-xl font-semibold"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- INFO -->

                    <div class="text-sm text-gray-600 space-y-1">
                        <div>> Por: {{ route.params.userid || "Usuario" }}</div>
                        <div v-if="selectedEventName">
                            > Para: {{ selectedEventName }}
                        </div>
                        <div>> Fecha de creacion: {{ creationDate }}</div>
                    </div>

                    <!-- EVENTO -->

                    <FormField
                        v-slot="{ componentField }"
                        name="event_id"
                        class="mt-3"
                    >
                        <FormItem>
                            <FormControl>
                                <UiSelect v-bind="componentField">
                                    <UiSelectTrigger class="w-full max-w-xs">
                                        <UiSelectValue
                                            placeholder="Selecciona un evento"
                                        />
                                    </UiSelectTrigger>
                                    <UiSelectContent>
                                        <UiSelectItem
                                            v-for="event in events"
                                            :key="event.id"
                                            :value="event.id"
                                        >
                                            {{ event.name }}
                                        </UiSelectItem>
                                    </UiSelectContent>
                                </UiSelect>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
            </div>

            <!-- PRECIO -->
            <FormField v-slot="{ componentField }" name="price" class="hidden">
                <FormItem>
                    <FormLabel class="text-base font-medium mb-2 h-fit"
                        >Precio</FormLabel
                    >
                    <FormControl>
                        <UiInput type="number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!-- DESCRIPCION -->
            <div class="flex gap-4 grow">
                <FormField v-slot="{ componentField }" name="description">
                    <FormItem class="w-full flex flex-col">
                        <FormLabel class="text-base font-medium mb-2 h-fit"
                            >Descripcion</FormLabel
                        >
                        <FormControl>
                            <UiTextarea
                                v-bind="componentField"
                                placeholder="Escribe la descripción del juego..."
                                class="min-h-32 resize-none h-full"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- FOTOS -->

                <FormField v-slot="{ componentField }" name="pictures">
                    <FormItem
                        class="shrink-0 flex flex-col items-center justify-center"
                    >
                        <FormControl>
                            <div
                                class="relative transition-transform duration-300 ease-in-out hover:scale-110"
                                v-for="[index, picture] of pictures.entries()"
                            >
                                <img
                                    :src="picture.image"
                                    :key="index"
                                    class="size-32 rounded-md border-2 border-gray-300 object-cover"
                                />
                                <UiButton
                                    variant="destructive"
                                    class="absolute top-0 right-0 rounded-full"
                                    size="icon"
                                    type="button"
                                    @click="removePicture(index)"
                                >
                                    <X class="w-4 h-4" />
                                </UiButton>
                            </div>

                            <UiButton
                                type="button"
                                variant="outline"
                                size="icon"
                                class="w-12 h-12 rounded-full"
                                asChild
                            >
                                <label class="relative cursor-pointer">
                                    <UiInput
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        class="hidden"
                                        @change="
                                            (event: Event) =>
                                                handlePicturesChange(
                                                    event,
                                                    componentField.onChange,
                                                )
                                        "
                                    />

                                    <Plus class="w-5 h-5" />
                                </label>
                            </UiButton>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>

            <!-- ARCHIVOS -->
            <div class="space-y-4">
                <h3 class="text-base font-medium">Archivos</h3>
                <div class="space-y-4">
                    <div
                        v-for="(fileItem, index) in fileItems"
                        :key="index"
                        class="flex gap-3 items-end"
                    >
                        <FormField
                            v-slot="{ componentField }"
                            name="files"
                            class="flex-1"
                        >
                            <FormItem>
                                <FormLabel
                                    class="text-sm font-medium mb-1 block"
                                    >Plataforma</FormLabel
                                >
                                <FormControl>
                                    <UiSelect v-model="fileItems[index]!.type">
                                        <UiSelectTrigger>
                                            <UiSelectValue
                                                placeholder="Selecciona plataforma"
                                            />
                                        </UiSelectTrigger>
                                        <UiSelectContent>
                                            <UiSelectItem value="windows"
                                                >Windows</UiSelectItem
                                            >
                                            <UiSelectItem value="linux"
                                                >Linux</UiSelectItem
                                            >
                                            <UiSelectItem value="source"
                                                >Source</UiSelectItem
                                            >
                                        </UiSelectContent>
                                    </UiSelect>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField
                            v-slot="{ componentField }"
                            name="files"
                            class="flex-1"
                        >
                            <FormItem>
                                <FormLabel
                                    class="text-sm font-medium mb-1 block"
                                    >Nombre</FormLabel
                                >
                                <FormControl>
                                    <UiInput
                                        type="text"
                                        v-model="fileItems[index]!.name"
                                        placeholder="Nombre del archivo"
                                        maxlength="50"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField
                            v-slot="{ componentField }"
                            name="files"
                            class="flex-1"
                        >
                            <!-- AÑADIR ARCHIVO -->
                            <FormItem>
                                <FormLabel
                                    class="text-sm font-medium mb-1 block"
                                    >Archivo</FormLabel
                                >
                                <FormControl>
                                    <UiButton
                                        type="button"
                                        variant="outline"
                                        class="w-full"
                                        asChild
                                    >
                                        <label class="relative cursor-pointer">
                                            <input
                                                type="file"
                                                class="hidden"
                                                @change="
                                                    (event: Event) =>
                                                        handleFileChange(
                                                            event,
                                                            index,
                                                            componentField.onChange,
                                                        )
                                                "
                                            />

                                            <Download class="w-4 h-4 mr-2" />
                                            Seleccionar archivo
                                        </label>
                                    </UiButton>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <UiButton
                            type="button"
                            variant="ghost"
                            size="icon"
                            @click="removeFileItem(index)"
                            :disabled="fileItems.length <= 1"
                            class="mb-0"
                        >
                            <X class="w-4 h-4" />
                        </UiButton>
                    </div>

                    <UiButton
                        type="button"
                        variant="outline"
                        @click="addFileItem"
                        :disabled="fileItems.length >= 5"
                        class="w-full"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Agregar Archivo
                    </UiButton>
                </div>
            </div>

            <!-- CATEGORIAS -->
            <FormField v-slot="{ componentField }" name="categories">
                <FormItem class="w-full">
                    <FormLabel class="text-base font-medium mb-2 block"
                        >Categorias</FormLabel
                    >
                    <FormControl>
                        <UiCombobox>
                            <UiComboboxAnchor asChild>
                                <UiTagsInput
                                    :model-value="
                                        componentField.modelValue || []
                                    "
                                    @update:model-value="
                                        componentField['onUpdate:modelValue']
                                    "
                                >
                                    <UiTagsInputItem
                                        v-for="item of componentField.modelValue ||
                                        []"
                                        :key="item"
                                        :value="item"
                                    >
                                        {{ getCategoryName(item) }}
                                        <UiTagsInputItemDelete></UiTagsInputItemDelete>
                                    </UiTagsInputItem>

                                    <UiComboboxInput
                                        placeholder="Buscar categorías..."
                                    >
                                        <UiTagsInputInput />
                                    </UiComboboxInput>
                                </UiTagsInput>
                            </UiComboboxAnchor>

                            <UiComboboxList>
                                <UiComboboxViewport>
                                    <UiComboboxEmpty
                                        >No se encontraron
                                        categorías</UiComboboxEmpty
                                    >
                                    <UiComboboxGroup>
                                        <UiComboboxItem
                                            v-for="category of categories"
                                            :key="category.id"
                                            :value="category.id"
                                            @select.prevent="
                                                (ev: any) => {
                                                    const value = ev.detail
                                                        ?.value as string;
                                                    if (
                                                        value &&
                                                        !componentField.modelValue?.includes(
                                                            value,
                                                        )
                                                    ) {
                                                        const current =
                                                            componentField.modelValue ||
                                                            [];
                                                        componentField[
                                                            'onUpdate:modelValue'
                                                        ]?.([
                                                            ...current,
                                                            value,
                                                        ]);
                                                    }
                                                }
                                            "
                                        >
                                            {{ category.name }}
                                        </UiComboboxItem>
                                    </UiComboboxGroup>
                                </UiComboboxViewport>
                            </UiComboboxList>
                        </UiCombobox>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="flex justify-end pt-4">
                <UiButton type="submit" size="lg"> Crear Juego </UiButton>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "vue-sonner";
import { Plus, Download, X } from "lucide-vue-next";

/* SETUP(INITIAL FETCH) */
const categories = ref();
const events = ref();
try {
    const { data: cat_data } = await useFetch("/api/category");
    categories.value = cat_data.value;

    const { data: ev_data } = await useFetch("/api/event");
    events.value = ev_data.value;
} catch (err) {
    toast.error("Error cargando datos:", {
        description: err.message || "Unknown error",
    });
}
const route = useRoute();

/* SESSION */
const session = await useAuth().useSession();
const unwatch = watch(session, async () => {
    if (!session.value.isPending) {
        if (await isTheUserOwner(session, useRoute().params.userid)) unwatch();
    }
});

/* SCHEMA/FORM */
const schema = toTypedSchema(
    z.object({
        cover: z
            .file({ error: "Debe estar completo" })
            .max(1024 * 1024)
            .optional(),
        pictures: z
            .array(z.file({ error: "Debe estar completo" }).max(2048 * 2048))
            .optional(),
        categories: z.array(z.string()).optional(),
        files: z
            .array(
                z.file({ error: "Debe estar completo" }).max(1000000000).min(1),
            )
            .max(5)
            .optional(),
        file_types: z.array(z.enum(["windows", "linux", "source"])).optional(),
        file_names: z.array(z.string().max(50)).optional(),
        title: z.string({ error: "Debe estar completo" }).min(1).max(128),
        description: z.string({ error: "Debe estar completo" }).min(1).max(512),
        price: z.number().min(0).max(60).optional(),
        user_id: z.string({ error: "Debe estar completo" }).optional(), //Because it gets set with userid
        event_id: z.string({ error: "Debe estar completo" }).optional(),
    }),
);

const form = useForm({
    validationSchema: schema,
});

form.setFieldValue("user_id", String(route.params.userid));

/* FIELDS */

const categorySearch = ref("");
const coverPreview = ref<string | null>(null);
const creationDate = computed(() => {
    const now = new Date();
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    return `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
});

const selectedEventName = computed(() => {
    const eventId = form.values.event_id;
    if (!eventId) return null;

    const event = events.value.find((e) => {
        return e.id === eventId;
    });

    return event ? event.name : null;
});

/*  HELPERS   */
const getCategoryName = (id: string) => {
    const cat = categories.value.find((cat) => {
        return cat.id === id;
    });
    console.log("CATO", cat);
    return cat ? cat.name : id;
};

const fileItems = ref<
    {
        file: File | null;
        type: "windows" | "linux" | "source" | "";
        name: string;
    }[]
>([{ file: null, type: "", name: "" }]);

const addFileItem = () => {
    if (fileItems.value.length < 5) {
        fileItems.value.push({ file: null, type: "", name: "" });
    }
};

const removeFileItem = (index: number) => {
    if (fileItems.value.length > 1) {
        fileItems.value.splice(index, 1);
    }
};

const handleFileChange = (
    event: Event,
    index: number,
    onChange: (value: File[]) => void,
) => {
    const target = event.target as HTMLInputElement;
    if (target?.files && target.files.length > 0 && fileItems.value[index]) {
        const file = target.files[0];
        if (file) {
            fileItems.value[index].file = file;
            const files = fileItems.value
                .filter((item) => item.file !== null)
                .map((item) => item.file!);
            onChange(files);
        }
    }
};

watch(
    () => form.values.files,
    (files) => {
        if (!files || files.length === 0) {
            fileItems.value = [{ file: null, type: "", name: "" }];
        }
    },
    { deep: true },
);

const handleCoverChange = (
    event: Event,
    onChange: (value: File | undefined) => void,
) => {
    const target = event.target as HTMLInputElement;
    if (target?.files && target.files.length > 0) {
        const file = target.files[0];
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                coverPreview.value = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    } else {
        onChange(undefined);
        coverPreview.value = null;
    }
};

const pictures = ref<{ image: string; file: File }[]>([]);

const handlePicturesChange = (
    event: Event,
    onChange: (value: File[]) => void,
) => {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
        const images = Array.from(target?.files).map((file) => {
            return {
                image: URL.createObjectURL(file),
                file: file as File,
            };
        });
        pictures.value.push(...images);
        onChange(pictures.value.map((item) => item.file));
    } else {
        onChange([]);
    }
};

const onSubmit = form.handleSubmit(async (values) => {
    try {
        // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
        console.log("👷 - values:", values);

        const form_data = new FormData();

        // This took a lot of time to figure out
        type FormValues = typeof values;
        for (const key in values) {
            const value = values[key as keyof FormValues];
            if (Array.isArray(value) && value[0] instanceof File) {
                for (const item of value) {
                    form_data.append(key, item as File);
                }
                console.log("Array of files:", key, value);
                //Why does it take it as a string?
            } else if (key === "cover" && value instanceof File) {
                form_data.append(key, value as File);
            } else if (value !== undefined && value !== null) {
                form_data.append(key, String(value));
            }
        }

        const validFileItems = fileItems.value.filter(
            (item) =>
                item.file !== null && item.type !== "" && item.name !== "",
        );

        for (const fileItem of validFileItems) {
            if (fileItem.file) {
                form_data.append("files", fileItem.file);
                form_data.append("file_types", fileItem.type);
                form_data.append("file_names", fileItem.name);
            }
        }

        // TODO: ⚠️ DEBUG LOG, DELETE AFTER DEBUGGING
        console.log("👷 - form_data entries:", Array.from(form_data.entries()));

        await $fetch(`/api/${route.params.userid}/${values.title}`, {
            method: "POST",
            body: form_data,
        });

        toast({ title: "Juego creado exitosamente!" });
        form.resetForm();
        await navigateTo({
            name: "userid-gameid",
            params: { userid: route.params.userid, gameid: values.title },
        });
    } catch (err) {
        console.error("Submit error:", err);
        toast({
            title: "Error al enviar peticion:\n",
            description: (err as any).message || "Error desconocido",
        });
    }
});
</script>
