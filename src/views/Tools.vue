<template>
  <div class="bg-gray-600 flex-col flex-1 sm:flex sm:flex-row">
    <side-menu />

    <div v-if="isFetched" class="flex-1 p-4">
      <!-- header -->
      <div class="flex justify-between items-center mb-4">
        <j-input-text
          class="w-8/12 text-sm"
          v-model="searchTerm"
          placeholder="Search by toolbox title..."
          @input="onSearch"
          @keyup:enter="fetchAll"
        />
        <j-button @click="createToolbox" size="small" content="Add Toolbox" />
      </div>

      <!-- Toolboxes -->
      <!-- TODO: Fetch only toolbox after tool:added and tool:deleted -->
      <div v-for="toolbox in toolboxes" :key="toolbox.id + '-' + toolbox.key">
        <toolbox-box
          :toolbox="toolbox"
          class="mb-2"
          @error="handleError"
          @delete:success="fetchAll"
          @tool:added="fetchAll"
          @tool:deleted="fetchAll"
        />
      </div>
    </div>

    <!-- Loader -->
    <div class="flex-1 flex justify-center p-8" v-else>
      <j-spinner />
    </div>

    <!-- Error msg -->
    <div
      v-if="errorMsg"
      class="rounded bg-red-500 text-gray-300 p-2 absolute text-xs cursor-pointer"
      style="bottom: 20px; right: 20px"
      @click="errorMsg = null"
    >
      {{ errorMsg }}
    </div>
  </div>
</template>

<script>
import parsers from "../utils/parsers.js";
import builders from "../utils/builders.js";

import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref, onMounted } from "vue";

import JInputText from "../components/base/JInputText";
import JButton from "../components/base/JButton";
import JSpinner from "../components/base/JSpinner";
import SideMenu from "../components/SideMenu";
import ToolboxBox from "../components/ToolboxBox";

export default {
  components: {
    JInputText,
    JButton,
    JSpinner,
    SideMenu,
    ToolboxBox,
  },

  setup() {
    if (!store.state?.user?.token) router.push("/");

    let errorMsg = ref();
    let toolboxes = ref([]);
    let isFetched = ref(false);
    let searchTerm = ref("")

    // Methods
    const debounce = builders.debounce();

    const handleError = (e) => {
      console.error(e);
      errorMsg.value = parsers.error(e);
    };

    const fetchAll = () => {
      axios
        .get(
          store.state.api +
            `/api/toolbox${
              searchTerm.value ? "?search_term=" + searchTerm.value : ""
            }`,
          {
            headers: { Authorization: `Bearer ${store.state.user.token}` },
          }
        )
        .then((r) => {
          ({ data: toolboxes.value, errorMsg: errorMsg.value } = parsers.data(
            r
          ));
          isFetched.value = true;
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

    const onSearch = (e) => {
      debounce(() => {
        searchTerm.value = e.target.value;
        fetchAll();
      });
    };

    const fetchOne = (id) => {
      axios
        .get(store.state.api + `/api/toolbox/${id}`, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then((r) => {
          let res;
          ({ data: res, errorMsg: errorMsg.value } = parsers.data(r));
          return res;
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

    const createToolbox = () => {
      var body = { name: "New Toolbox" };
      isFetched.value = false;
      axios
        .post(store.state.api + "/api/toolbox", body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          fetchAll();
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

    onMounted(fetchAll);

    return {
      isFetched,
      searchTerm,
      errorMsg,
      toolboxes,
      onSearch,
      fetchAll,
      fetchOne,
      createToolbox,
      handleError,
    };
  },
};
</script>