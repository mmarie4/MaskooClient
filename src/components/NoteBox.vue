<template>
  <div class="rounded bg-gray-500 text-gray-100 p-2">
    <!-- top bar -->
    <div class="flex justify-between text-xs pb-2">
      <note-title :value="note.title" @updated="updateTitle" />
      <div
        class="text-gray-900 font-bold text-xs cursor-pointer"
        @click="deleteNote"
      >
        ✕
      </div>
    </div>

    <!-- content -->
    <j-text-area :value="note.content" @updated="updateContent" />

    <div
      class="w-full text-right text-xs text-gray-400"
      style="font-size: 10px"
    >
      {{ formattedDate }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";
import moment from "moment";

import JTextArea from "./JTextArea";
import NoteTitle from "../components/NoteTitle";

export default {
  components: {
    JTextArea,
    NoteTitle,
  },

  props: {
    note: {
      type: Object,
    },
  },

  setup(props, context) {
    const formattedDate = moment(props.note.updated_at).format(
      "DD/MM/YYYY HH:mm"
    );

    const updateContent = (e) => {
      const body = { title: props.note.title, content: e };
      axios
        .put(`${store.state.api}/api/notes/${props.note.id}`, body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("update:success");
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    const updateTitle = (e) => {
      const body = { title: e, content: props.note.content };
      axios
        .put(`${store.state.api}/api/notes/${props.note.id}`, body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("update:success");
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    const deleteNote = () => {
      axios
        .delete(`${store.state.api}/api/notes/${props.note.id}`, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("delete:success");
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    return { formattedDate, updateContent, updateTitle, deleteNote };
  },
};
</script>