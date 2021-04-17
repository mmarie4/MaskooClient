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
        <j-editable :value="tool.label" @updated="updateToolLabel(tool.id, $event)" />
        <!-- TODO: tool value -->
    </div>

  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";

import JEditableText from "./base/JEditableText";

export default {
  components: {
    JEditableText,
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

    return { updateTitle, deleteToolbox };
  },
};
</script>