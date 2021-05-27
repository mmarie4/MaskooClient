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
    <div
      v-for="tool in toolbox.tools"
      :key="tool.id"
      class="flex justify-between py-1"
    >
      <div class="flex flex-1 justify-between pr-1">
        <j-editable-text
          :value="tool.label"
          @updated="updateToolLabel(tool.id, $event)"
        />
        <div class="text-xs rounded text-gray-600 bg-gray-400 px-2 leading-normal cursor-pointer w-full" @click="onClickToolValue">{{ tool.value }}</div>
      </div>
      <div class="text-xs text-gray-400 cursor-pointer" @click="deleteTool(id)">✕</div>
    </div>

    <!-- Create tool button -->
    <div class="flex w-full justify-end">
      <j-button
        size="xsmall"
        content="+ Add Tool"
        @click="showAddToolModal = true"
      />
    </div>

    <!-- Add tool modal -->
    <j-modal v-if="showAddToolModal" :title="'Add tool to ' + toolbox.label">
      <div class="p-2">
        <j-input-text label="Tool name" v-model="newToolName" />
        <j-input-text label="Tool value" v-model="newToolValue" />
        <div class="mt-4 flex justify-end"><j-button content="Save" @click="createTool" /></div>
      </div>
    </j-modal>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";
import parsers from "../utils/parsers.js";
import { ref } from "vue"

import JEditableText from "./base/JEditableText";
import JButton from "./base/JButton";
import JModal from "./base/JModal";
import JInputText from "./base/JInputText.vue";

export default {
  components: {
    JEditableText,
    JButton,
    JModal,
    JInputText,
  },

  props: {
    toolbox: {
      type: Object,
    },
  },

  setup(props, context) {
    let newToolName = ref("");
    let newToolValue = ref("");
    let showAddToolModal = ref(false);

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

    const createTool = () => {
      var body = { label: newToolName.value, value: newToolValue.value };
      axios
        .post(
          store.state.api + `/api/toolbox/${props.toolbox.id}/tools`,
          body,
          {
            headers: { Authorization: `Bearer ${store.state.user.token}` },
          }
        )
        .then(() => {
          showAddToolModal.value = false
          newToolName.value = ""
          newToolValue.value = ""
          context.emit("tool:added");
        })
        .catch((e) => {
          console.error(e);
          context.emit("error", parsers.error(e));
        });
    };

    const onClickToolValue = (e) => {
      console.log(e);
      /*
      e.srcElement.select();
      document.execCommand("copy");
      window.getSelection().empty();
      */
    };

    const deleteTool = (id) => {
      axios
        .delete(
          store.state.api + `/api/toolbox/${props.toolbox.id}/tools/${id}`,
          {
            headers: { Authorization: `Bearer ${store.state.user.token}` },
          }
        )
        .then(() => {
          context.emit("tool:deleted");
        })
        .catch((e) => {
          console.error(e);
          context.emit("error", parsers.error(e));
        });
    };

    return {
      newToolName,
      newToolValue,
      showAddToolModal,
      updateTitle,
      deleteToolbox,
      createTool,
      onClickToolValue,
      deleteTool,
    };
  },
};
</script>