<template>
    <div class="w-full flex justify-between p-2 items-center bg-gray-700 text-gray-100 shadow">
        <div class="font-bold text-xl ml-2">
            Maskoo
        </div>

        <div v-if="isLogged()" class="cursor-pointer font-bold">Settings</div>

        <div v-else class="text-xs"> 
            A simple notebook to keep things organized
        </div>

    </div>
</template>

<script>
import store from "../store/store";

export default {
    setup() {

        const isLogged = () => (Boolean)(store.state?.user?.token)

        return { isLogged }
    }
    
}
</script>