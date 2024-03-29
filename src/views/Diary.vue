<template>
  <div class="bg-gray-600 flex-col flex-1 sm:flex sm:flex-row">
    <side-menu />

    <!-- Diary -->
    <div v-if="isFetched" class="flex-1 p-4">
      <!-- top bar -->
      <div class="w-full flex justify-between items-center pb-4">
        <div class="flex items-center">
          <img src="@/assets/arrow-left.png" class="w-4 cursor-pointer" @click="previousWeek" />
          <div class="text-xs text-gray-100 px-2 font-bold">{{getWeekDisplayName(days[0].date)}}</div>
          <img src="@/assets/arrow-right.png" class="w-4 cursor-pointer" @click="nextWeek" />
        </div>
      </div>

      <!-- days -->
      <div v-for="day in days" :key="day.date + '-' + day.key">
        <day-box :day="day" :diaryId="data.id" class="mb-2" />
      </div>
    </div>

    <div class="flex-1 flex justify-center p-8" v-else>
      <j-spinner/>
    </div>    

    <!-- Error msg -->
    <j-toast :message="errorMsg" type="error" />

  </div>
</template>

<script>
import parsers from "../utils/parsers.js";
import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref, onMounted } from "vue";
import moment from "moment";

import SideMenu from "../components/SideMenu";
import DayBox from "../components/DayBox";
import JSpinner from "../components/base/JSpinner";
import JToast from "../components/base/JToast";

export default {
  components: {
    SideMenu,
    DayBox,
    JSpinner,
    JToast
  },

  setup() {
    if (!store.state?.user?.token) router.push("/");

    // Data
    const now = moment();
    let isFetched = ref(false)
    let days = ref([
      {
        date: now.clone().weekday(1), content: "", key: 0
      },
      {
        date: now.clone().weekday(2), content: "", key: 0
      },
      {
        date: now.clone().weekday(3), content: "", key: 0
      },
      {
        date: now.clone().weekday(4), content: "", key: 0
      },
      {
        date: now.clone().weekday(5), content: "", key: 0
      },
      {
        date: now.clone().weekday(6), content: "", key: 0
      },
      {
        date: now.clone().weekday(7), content: "", key: 0
      },
    ]);
    let data = ref({ days: [] });
    let errorMsg = ref();

    // Methods
    const fetchDiary = () => {
      isFetched.value = false
      axios
        .get(store.state.api + "/api/diary", {
          headers: { Authorization: `Bearer ${store.state.user.token}` },
          params: {
              from: days.value[0].date.toISOString(),
              to: days.value[0].date.clone().add(7, "days").toISOString()
          }
        })
        .then((r) => {
          ({ data: data.value, errorMsg: errorMsg.value } = parsers.data(r));
          data.value.days.forEach(x => {
              let day = days.value
                .find(d => d.date.format("DDMMYYYY") === moment(x.date).format("DDMMYYYY"))
              if(day) day.content = x.content
          })
          days.value.forEach(d => d.key++)
          isFetched.value = true
        })
        .catch((e) => {
          console.error(e)
          errorMsg.value = parsers.error(e);
        });
    };

    const handleError = (e) => {
      console.error(e);
      errorMsg.value = parsers.error(e);
    };

    const previousWeek = () => {
      days.value.forEach(d => {
        d.content = ""
        d.date.subtract(7, "days")
      })
      fetchDiary()
    }

    const nextWeek = () => {
      days.value.forEach(d => {
        d.content = ""
        d.date.add(7, "days")
      })
      fetchDiary()
    }

    const getWeekDisplayName = (firstDay) => {
      var date = moment(firstDay)
      var firstDayOfThisWeek = now.clone().weekday(1)
      if (date.isSame(firstDayOfThisWeek, "day")) return "Current week"
      if (date.isSame(firstDayOfThisWeek.clone().add(1, "week"), "day")) return "Next week"
      if (date.isSame(firstDayOfThisWeek.clone().subtract(1, "week"), "day")) return "Last week"
      return `${date.format("DD/MM")} to ${date.clone().add(1, "week").format("DD/MM")}`
    }

    // Hooks
    onMounted(fetchDiary);

    return {
      isFetched,
      days,
      data,
      errorMsg,
      fetchDiary,
      handleError,
      previousWeek,
      nextWeek,
      getWeekDisplayName
    };
  },
};
</script>