<template>
<div class="bg-gray-600 flex-1 flex">

    <side-menu/>

    <!-- Diary -->
    <div v-if="data && data.days" class="flex-1 p-4">

        <!-- top bar -->
        <div class="w-full flex justify-between items-center pb-4">
            <div class="flex items-center">
                <img src="@/assets/arrow-left.png" class="w-4" />
                <div class="text-xs text-gray-100 px-2"> Current week </div>
                <img src="@/assets/arrow-right.png" class="w-4" />
            </div>
            <j-button @click="createDay" content="ADD"/>
        </div>

        <!-- days -->
        <div v-for="day in data.days"
             :key="day.id">
             <day-box :day="day" :diaryId="data.id" class="mb-2"/>
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
import moment from "moment"

import SideMenu from "../components/SideMenu"
import DayBox from "../components/DayBox"
import JButton from "../components/JButton"

export default {
    components: {
        SideMenu,
        DayBox,
        JButton
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

        const createDay = () => {
            const body = { date: moment().format(), content: "" }
            axios
                .post(`${store.state.api}/api/diary/${data.value.id}/days`,
                    body,
                    { headers: { Authorization: `Bearer ${store.state.user.token}` } })
                .then(() => {
                    fetchDiary()
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
            fetchDiary,
            handleError,
            createDay
        }

    }

}
</script>