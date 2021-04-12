<template>
  <div class="rounded bg-gray-500 text-gray-100 p-2">
    <!-- top bar -->
    <div class="flex justify-between text-xs">
      <div class="font-bold">{{ formattedDate }}</div>
      <div class="flex"></div>
    </div>

    <!-- content -->
    <j-text-area :value="day.content" @updated="onBlur" />
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";
import moment from "moment";
import JTextArea from "./JTextArea";

export default {
  components: {
    JTextArea,
  },

  props: {
    diaryId: {
      type: String,
    },
    day: {
      type: Object,
    },
  },

  setup(props, context) {
    const formattedDate = moment(props.day.date).format("DD/MM/YYYY");

    const onBlur = (e) => {
        console.log(e)
      const body = { date: props.day.date, content: e };
      axios
        .patch(`${store.state.api}/api/diary/${props.diaryId}/days`, body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    return {
      formattedDate,
      onBlur,
    };
  },
};
</script>