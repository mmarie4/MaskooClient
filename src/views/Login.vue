<template>
  <div class="w-full flex-1 bg-gray-600 flex items-center justify-center">
    <div class=w-6/12>
      <div class="w-full bg-gray-700 p-8 rounded shadow">
        <div class="text-xs text-gray-100">Email</div>
        <input class="w-full rounded" type="email" name="email" />
        <div class="mt-4 text-xs text-gray-100">Password</div>
        <input class="w-full rounded" type="password" name="password" />
        <div class="flex justify-center">
        <j-button class="mt-8" @click="login" size="normal" content="Login"/>
        </div>
      </div>
      <div class="text-right m-1 text-xs text-gray-200 text-light cursor-pointer">Not a member yet? Sign up for free</div>
    </div>
  </div>
</template>

<script>
import router from "../router";
//import store from "../store/store";

import JButton from "../components/JButton";

export default {
  components: {
    JButton,
  },

  setup() {
    const login = () => {
      router.push({ name: "Diary" });
    };

    return { login };
  },
};
</script>