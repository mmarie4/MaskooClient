<template>
    <button :class="buttonClass">{{content}}</button>
</template>

<script>
export default {
    props: {
        content: {
            type: String
        },
        size: {
            type: String,
            default: "small"
        }
    },

    setup(props) {

        let buttonClass = ""
        if (props.size === "normal") {
            buttonClass = "rounded bg-blue-600 px-4 py-2 text-md text-gray-200 hover:bg-blue-700 font-bold"
        }
        else if (props.size === "small") {
            buttonClass = "rounded bg-blue-600 p-2 text-xs text-gray-200 font-bold"
        }

        return { buttonClass }
    }
}
</script>