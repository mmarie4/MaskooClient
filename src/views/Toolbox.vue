<template>
<div class="w-full bg-gray-600 flex-1 flex">
    <side-menu/>
</div>
</template>

<script>
// import axios from "axios";
import router from "../router";
import store from "../store/store";

import SideMenu from "../components/SideMenu"

export default {
    components: {
        SideMenu
    },

    setup() {

        if (!store.state?.user?.token) router.push("/")

    }
}
</script>