<template>
  <div class="w-full flex-1 bg-gray-600 flex items-center justify-center">

    <!-- Login -->
    <div v-if="view === 'login'" class=w-6/12>
      <div class="w-full bg-gray-700 p-8 rounded shadow-md">
        <div class="text-lg text-gray-100 pb-6">Login</div>

        <j-input-text label="Email" name="email" type="email" v-model="email" />
        <j-input-text label="Password" name="password" type="password" v-model="password" />

        <div v-if="errorMsg" class="w-full text-center p-2 text-xs text-red-400">{{errorMsg}}</div>

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
      <div class="w-full bg-gray-700 p-8 rounded shadow-md">
        <div class="text-lg text-gray-100 pb-6">Create an account</div>

        <j-input-text label="Email" name="email" type="email" v-model="email" />
        <j-input-text label="Password" name="password" type="password" v-model="password" />
        <j-input-text label="Confirm password" name="confirm-password" type="password" v-model="confirmPassword" />

        <div v-if="errorMsg" class="w-full text-center p-2 text-xs text-red-400">{{errorMsg}}</div>

        <div class="flex justify-center">
          <j-button class="mt-8" @click="signup" size="normal" content="Sign up"/>
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
import parsers from "../utils/parsers.js"

import JButton from "../components/base/JButton";
import JInputText from "../components/base/JInputText";

export default {
  components: {
    JButton,
    JInputText
  },

  setup() {
    // data
    let view = ref("login");
    let email = ref();
    let password = ref();
    let confirmPassword = ref()
    let errorMsg = ref();
    
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    // methods
    const toggleView = () => {
      view.value = view.value === "login" ? "signup" : "login"
      password.value = ""
      email.value = ""
      confirmPassword.value = ""
      errorMsg.value = ""
    }

    const login = () => {

      const body = { password: password.value, email: email.value };

      axios
        .post(store.state.api + "/api/user/login", body)
        .then((response) => {
          store.commit("setUser", response.data);
          router.push({ name: "Diary" });
        })
        .catch((e) => {
          errorMsg.value = parsers.error(e)
        });
    };

    const signup = () => {

      if (!email.value || !emailRegex.test(email.value)) {
        errorMsg.value = "Email is invalid"
        return
      }
      
      if (password.value !== confirmPassword.value) {
        errorMsg.value = "Passwords are not the same"
        return
      }

      const body = { password: password.value, email: email.value };

      axios
        .post(store.state.api + "/api/user/sign-up", body)
        .then((response) => {
          store.commit("setUser", response.data);
          router.push({ name: "Diary" });
        })
        .catch((e) => {
          errorMsg.value = parsers.error(e)
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