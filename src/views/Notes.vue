<template>
  <div class="w-full bg-gray-600 flex-1 flex">
    <side-menu />
  </div>
</template>

<script>
import parsers from "../utils/parsers.js";
import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref, onMounted } from "vue";

import SideMenu from "../components/SideMenu";

export default {
  components: {
    SideMenu,
  },

  setup() {
    if (!store.state?.user?.token) router.push("/");

    let errorMsg = ref()
    let data = ref()
    let notes = ref([])

    // Methods
    const fetchNotes = () => {
      axios
        .get(store.state.api + "/api/notes", {
          headers: { Authorization: `Bearer ${store.state.user.token}` }
        })
        .then((r) => {
          ({ data: data.value, errorMsg: errorMsg.value } = parsers.data(r));
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

        const handleError = (e) => {
      console.error(e);
      errorMsg.value = parsers.error(e);
    };

        // Hooks
    onMounted(fetchNotes);

        return {
      notes,
      data,
      errorMsg,
      fetchNotes,
      handleError
    };
  },
};
</script>