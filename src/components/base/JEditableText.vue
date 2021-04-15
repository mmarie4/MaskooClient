<template>
  <input
    class="font-bold bg-gray-500 text-xs w-full outline-none"
    @keyup.enter="submit"
    @blur="submit"
    v-model="textInput"
  />
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    value: {
      type: String,
    },
  },

  setup(props, context) {
    let textInput = ref(props.value || "")

    const submit = () => {
      if (textInput.value != props.value) context.emit("updated", textInput.value)
    }


    return { submit, textInput };
  },
};
</script>