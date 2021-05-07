<template>
  <div class="bg-gray-600 flex-col flex-1 sm:flex sm:flex-row">
    <side-menu />

    <div v-if="isFetched" class="flex-1 p-4">
      <!-- header -->
      <div class="flex justify-between items-center mb-4">
        <j-input-text
          class="w-8/12 text-sm"
          v-model="searchTerm"
          placeholder="Search by note title..."
          @input="onSearch"
          @keyup:enter="fetchNotes"
        />
        <j-button @click="createNote" size="small" content="Add Note" />
      </div>

      <!-- Notes -->
      <div v-for="note in notes" :key="note.id + '-' + note.key">
        <note-box
          :note="note"
          class="mb-2"
          @error="handleError"
          @delete:success="fetchNotes"
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

import JButton from "../components/base/JButton";
import JInputText from "../components/base/JInputText";
import JSpinner from "../components/base/JSpinner";
import NoteBox from "../components/NoteBox";
import SideMenu from "../components/SideMenu";

export default {
  components: {
    SideMenu,
    JButton,
    NoteBox,
    JInputText,
    JSpinner,
  },

  setup() {
    if (!store.state?.user?.token) router.push("/");

    let errorMsg = ref();
    let notes = ref([]);
    let isFetched = ref(false);
    let searchTerm = ref("");

    // Methods
    const fetchNotes = () => {
      axios
        .get(
          store.state.api +
            `/api/notes${
              searchTerm.value ? "?search_term=" + searchTerm.value : ""
            }`,
          {
            headers: { Authorization: `Bearer ${store.state.user.token}` },
          }
        )
        .then((r) => {
          ({ data: notes.value, errorMsg: errorMsg.value } = parsers.data(r));
          isFetched.value = true;
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

    const debounce = builders.debounce();

    const onSearch = (e) => {
      debounce(() => {
        searchTerm.value = e.target.value;
        fetchNotes();
      });
    };

    const handleError = (e) => {
      console.error(e);
      errorMsg.value = parsers.error(e);
    };

    const createNote = () => {
      var body = { title: "New Note", content: "" };
      isFetched.value = false;
      axios
        .post(store.state.api + "/api/notes", body, {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
        })
        .then(() => {
          fetchNotes();
        })
        .catch((e) => {
          console.error(e);
          errorMsg.value = parsers.error(e);
        });
    };

    // Hooks
    onMounted(fetchNotes);

    return {
      searchTerm,
      notes,
      errorMsg,
      fetchNotes,
      handleError,
      createNote,
      isFetched,
      onSearch,
    };
  },
};
</script>