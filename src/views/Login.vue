<template>
  <div class="w-full flex-1 bg-gray-600 flex items-center justify-center">

    <!-- Login -->
    <div v-if="view === 'login'" class=w-6/12>
      <div class="w-full bg-gray-700 p-8 rounded shadow">
        <div class="text-lg text-gray-100 pb-6">Login</div>
        <div class="text-xs text-gray-100">Email</div>
        <input class="w-full rounded px-1" type="email" name="email" v-model="email"/>
        <div class="mt-4 text-xs text-gray-100">Password</div>
        <input class="w-full rounded px-1" type="password" name="password" v-model="password"/>
        <div class="flex justify-center">
        <j-button class="mt-8" @click="login" size="normal" content="Login"/>
        </div>
      </div>
      <div class="text-right m-1 text-xs text-gray-200 text-light cursor-pointer" @click="toggleView">
        Not a member yet? Sign up for free
      </div>
    </div>

    <!-- Sign up -->
    <div v-if="view === 'signup'" class=w-6/12>
      <div class="w-full bg-gray-700 p-8 rounded shadow">
        <div class="text-lg text-gray-100 pb-6">Sign up</div>
        <div class="text-xs text-gray-100">Email</div>
        <input class="w-full rounded px-1" type="email" name="email" v-model="email"/>
        <div class="mt-4 text-xs text-gray-100">Password</div>
        <input class="w-full rounded px-1" type="password" name="password" v-model="password"/>
        <div class="mt-4 text-xs text-gray-100">Confirm password</div>
        <input class="w-full rounded px-1" type="password" name="confirm-password" v-model="confirmPassword"/>
        <div class="flex justify-center">
        <j-button class="mt-8" @click="signup" size="normal" content="Signup"/>
        </div>
      </div>
      <div class="text-right m-1 text-xs text-gray-200 text-light cursor-pointer" @click="toggleView">
        Go back to login
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import store from "../store/store";
import { ref } from "vue";

import JButton from "../components/JButton";

export default {
  components: {
    JButton,
  },

  setup() {
    // data
    let view = ref("login");
    let email = ref();
    let password = ref();
    let confirmPassword = ref()
    let errorMsg = ref();

    // methods
    const toggleView = () => {
      view.value = view.value === "login" ? "signup" : "login"
      password.value = ""
      email.value = ""
      confirmPassword.value = ""
    }

    const login = () => {
      const body = { password: password.value, email: email.value };

      axios
        .post(store.state.api + "/api/user/login", body)
        .then((response) => {
          store.commit("setUser", response.data);
          router.push({ name: "Diary" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const signup = () => {
      // TODO : check if pwd is twice the same

      const body = { password: password.value, email: email.value };

      axios
        .post(store.state.api + "/api/user/sign-up", body)
        .then((response) => {
          store.commit("setUser", response.data);
          router.push({ name: "Diary" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      // data
      view,
      password,
      confirmPassword,
      email,
      errorMsg,

      // methods
      toggleView,
      login,
      signup
    };
  },
};
</script>