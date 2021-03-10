<template>
<div class="w-full bg-gray-600 flex-1 flex">
    <side-menu/>

    <!-- Diary -->
    <div v-if="data && data.days" class="w-full p-4">
        <div v-for="day in data.days"
             :key="day.id"
             class="rounded bg-gray-500 text-gray-100 w-full p-4">
             <div class="flex justify-between text-sm">
                <div class="font-bold">{{day.date}}</div>
                <div class="flex">
                    <div class="mr-2 cursor-pointer">DEL</div>
                    <div class="cursor-pointer">EDIT</div>
                </div>
             </div>
        </div>
    </div>

    <!-- Error msg -->
    <div v-if="errorMsg"
         class="rounded bg-red-500 text-gray-300 p-2 absolute text-xs cursor-pointer"
         style="bottom: 20px; right: 20px;"
         @click="errorMsg = null"> {{errorMsg}} </div>

</div>
</template>

<script>
import parsers from "../utils/parsers.js"
import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref, onMounted } from "vue"

import SideMenu from "../components/SideMenu"

export default {
    components: {
        SideMenu
    },

    setup() {

        if (!store.state?.user?.token) router.push("/")

        // Data
        let data = ref({days: []})
        let errorMsg = ref()

        // Methods
        const fetchDiary = () => {
            axios
                .get(store.state.api + "/api/diary", { headers: { Authorization: `Bearer ${store.state.user.token}` } })
                .then((r) => {
                    ({ data: data.value, errorMsg: errorMsg.value } = parsers.data(r))
                })
                .catch((e) => {
                    errorMsg.value = parsers.error(e)
                });
        }

        // Hooks
        onMounted(fetchDiary)

        return {
            data,
            errorMsg,
            fetchDiary
        }

    }

}
</script>