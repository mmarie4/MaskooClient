<template>
    <div>
        <div v-if="label" class="mt-4 text-xs text-gray-100"> {{label}} </div>
        <input class="w-full rounded px-1 outline-none bg-gray-300 text-gray-600 px-2 py-1"
               :type="type"
               :value="modelValue"
               :name="name"
               :placeholder="placeholder"
               @input="onInput"
               @keyup.enter="onEnter"/>
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
        },
        placeholder: {
            type: String
        }
    },

    setup(props, context) {

        const onInput = (e) => {
            context.emit('update:modelValue', e.currentTarget.value)
        }

        const onEnter = () => {
            context.emit('keyup:enter')
        }

        return { onInput, onEnter }
    }
}
</script>
