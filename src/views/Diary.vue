<template>
<div class="bg-gray-600 flex-1 flex">
    <side-menu/>

    <!-- Diary -->
    <div v-if="data && data.days" class="flex-1 p-4">
        <div v-for="day in data.days"
             :key="day.id">
             <day-box :day="day" :diaryId="data.id"/>
        </div>
    </div>

    <!-- Error msg -->
    <div v-if="errorMsg"
         class="rounded bg-red-500 text-gray-300 p-2 absolute text-xs cursor-pointer"
         style="bottom: 20px; right: 20px;"
         @click="errorMsg = null"
         @error="handleError"> {{errorMsg}} </div>

</div>
</template>

<script>
import parsers from "../utils/parsers.js"
import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref, onMounted } from "vue"

import SideMenu from "../components/SideMenu"
import DayBox from "../components/DayBox"

export default {
    components: {
        SideMenu,
        DayBox
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

        const handleError = (e) => {
            console.log("error received:", e)
            errorMsg.value = parsers.error(e)
        }

        // Hooks
        onMounted(fetchDiary)

        return {
            data,
            errorMsg,
            fetchDiary,
            handleError
        }

    }

}
</script>