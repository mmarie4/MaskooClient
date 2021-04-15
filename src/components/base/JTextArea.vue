<template>
  <textarea
    ref="contentTextArea"
    class="mt-4 bg-gray-500 resize-none text-xs w-full outline-none"
    @blur="onBlur"
    v-model="textInput"
  />
</template>

<script>
import { ref, watch, onMounted } from "vue"

export default {
  props: {
    value: {
      type: String,
    },
  },

  setup(props, context) {
    let contentTextArea = ref([])
    let textInput = ref(props.value || "")

    const onBlur = () => {
      context.emit("updated", textInput.value)
    }

    const resize = () => {
      if (contentTextArea.value) {
        if (textInput.value.length === 0) return;
        const styles = window.getComputedStyle(contentTextArea.value);
        const paddingTop = parseInt(styles.paddingTop);
        const paddingBottom = parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        //const currentHeight = parseInt(styles.height) - padding;
        const initialHeight =
          (parseInt(styles.height) - padding) / contentTextArea.value.rows;
        const scrollHeight = contentTextArea.value.scrollHeight - padding;
        const newRows = Math.ceil(scrollHeight / initialHeight);
        contentTextArea.value.rows = newRows;
      }
    };

    watch(textInput, resize);

    onMounted(resize);

    return { onBlur, textInput, contentTextArea };
  },
};
</script>