<template>
    <div>
        <div v-if="label" class="mt-4 text-xs text-gray-100"> {{label}} </div>
        <input class="w-full rounded px-1"
               :type="type"
               :value="modelValue"
               :name="name"
               @input="onInput" />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        },
        modelValue: {
            type: String
        },
        type: {
            type: String
        },
        name: {
            type: String
        }
    },

    setup(props, context) {

        const onInput = (e) => {
            context.emit('update:modelValue', e.currentTarget.value)
        }

        return { onInput }
    }
}
</script>
