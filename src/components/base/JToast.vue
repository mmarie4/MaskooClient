<template>
    <div
      v-if="displayedMessage"
      class="rounded p-2 absolute text-xs opacity-50"
      :class="dynamicClass"
      style="bottom: 20px; right: 20px"
    >
      {{ displayedMessage }}
    </div>
</template>

<script>
import { watch, ref } from "vue";

export default {
    
    props: {
        message: {
            type: String
        },
        type: {
            type: String,
            default: "info"
        },
        duration: {
            type: Number,
            default: 2000
        }
    },

    setup(props) {

        let displayedMessage = ref("")

        let dynamicClass = ref("")
        switch(props.type) {
            case "info":
                dynamicClass.value = "bg-gray-200 text-gray-600"
                break
            case "warning":
                dynamicClass.value = "bg-yellow-800 text-yellow-200"
                break
            case "error":
                dynamicClass.value = "bg-red-800 text-red-200"
                break
                                
        }

        watch(() => props.message, (currentValue) => {
            if (currentValue) {
                displayedMessage.value = currentValue
                setTimeout(() => {
                    if (displayedMessage.value == currentValue)
                        displayedMessage.value = ""
                }, props.duration)
            }
        })

        return { displayedMessage, dynamicClass }

    },


}
</script>