<template>
  <div class="rounded bg-gray-500 text-gray-100 p-2">
    <!-- Top bar -->
    <div class="flex justify-between text-xs pb-2">
      <j-editable-text :value="toolbox.label" @updated="updateTitle" />
      <div
        class="text-gray-900 font-bold text-xs cursor-pointer"
        @click="deleteToolbox"
      >
        ✕
      </div>
    </div>

    <!-- Tools -->
    <div v-for="tool in toolbox.tools" :key="tool.id" class="flex justify-between p-2">
        <j-editable-text :value="tool.label" @updated="updateToolLabel(tool.id, $event)" />
        <div @click="onClickToolValue">{{tool.value}}</div>
    </div>

    <!-- Create tool button -->
    <div class="flex w-full justify-end">
      <j-button size="xsmall" content="+ Add Tool" @click="createTool(toolbox.id)"/>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";
import parsers from "../utils/parsers.js"

import JEditableText from "./base/JEditableText";
import JButton from "./base/JButton";

export default {
  components: {
    JEditableText,
    JButton
  },

  props: {
    toolbox: {
      type: Object,
    },
  },

  setup(props, context) {

    const updateTitle = (e) => {
      const body = { name: e };
      axios
        .put(`${store.state.api}/api/toolbox/${props.toolbox.id}`, body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("update:success");
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    const deleteToolbox = () => {
      axios
        .delete(`${store.state.api}/api/toolbox/${props.toolbox.id}`, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("delete:success");
        })
        .catch((e) => {
          context.emit("error", e);
        });
    };

    const createTool = (toolboxId) => {
      var body = { label: "New Tool", value: "" };
      axios
        .post(store.state.api + `/api/toolbox/${toolboxId}/tools`, body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          context.emit("tool:added");
        })
        .catch((e) => {
          console.error(e);
          context.emit("error", parsers.error(e));
        });
    }

    const onClickToolValue = (e) => {
      console.log(e)
      /*
      e.srcElement.select();
      document.execCommand("copy");
      window.getSelection().empty();
      */
    }

    return { updateTitle, deleteToolbox, createTool, onClickToolValue };
  },
};
</script>