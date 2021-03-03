<template>
  <div class="w-full flex flex-col" style="height: 100vh;">
    <top-bar/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
import '@/assets/css/tailwind.css'
import TopBar from "./components/TopBar"
import FooterBar from "./components/FooterBar"

export default {
  name: 'App',
  components: {
    TopBar,
    FooterBar
  }
}
</script>
