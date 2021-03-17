<template>
  <div class="rounded bg-gray-500 text-gray-100 p-2">

    <!-- top bar -->
    <div class="flex justify-between text-xs">
      <div class="font-bold">{{ formattedDate }}</div>
      <div class="flex">
      </div>
    </div>

    <!-- content -->
    <textarea ref="contentTextArea"
              class="mt-4 bg-gray-500 resize-none text-xs w-full outline-none"
              @blur="onBlur"
              v-model="textInput"/>

  </div>

</template>

<script>
import axios from "axios";
import store from "../store/store";
import { ref, watch, onMounted } from "vue"
import moment from "moment"

export default {
    props: {
        diaryId: {
            type: String
        },
        day: {
            type: Object
        }
    },

    setup(props, context) {

        let contentTextArea = ref([]);
        let textInput = ref(props.day.content || '')

        const formattedDate = moment(props.day.date).format("DD/MM/YYYY") 

        const onBlur = () => {
            const body = { date: props.day.date, content: textInput.value } 
            axios
                .patch(`${store.state.api}/api/diary/${props.diaryId}/days`,
                    body,
                    { headers: { Authorization: `Bearer ${store.state.user.token}` } })
                .then((response) => {
                    console.log(response)
                })
                .catch((e) => {
                    context.emit('error', e)
                });
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
        }

        const deleteDay = () => {
            axios
                .delete(`${store.state.api}/api/diary/${props.diaryId}/days/${props.day.id}`,
                    { headers: { Authorization: `Bearer ${store.state.user.token}` } })
                .then((response) => {
                    console.log(response)
                })
                .catch((e) => {
                    context.emit('error', e)
                });
        }

        watch(textInput, resize);

        onMounted(resize)

        return {
            formattedDate,
            contentTextArea,
            textInput,
            onBlur,
            deleteDay
        }
    }
}
</script>