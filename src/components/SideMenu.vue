<template>
    <div class="bg-gray-700" style="width: 150px">
        <div v-for="item in list" :key="item.name">
            <div class="w-full cursor-pointer text-gray-200 px-4 py-2 hover:bg-gray-500" 
                :class="isCurrent(item) ? 'bg-gray-800' : 'bg-gray-700'"
                @click="goTo(item.route)">{{item.label}}</div>
        </div>
    </div>
</template>

<script>
import router from "../router"

export default {
    setup() {

        const list = [
            {
                route: "Diary",
                label: "Diary",
            },
            {
                route: "Toolbox",
                label: "Toolbox"
            },
            {
                route: "Notes",
                label: "Notes"
            }   
        ]

        const goTo = (name) => {
            router.push({name})
        }

        const isCurrent = (item) => item.route === router.currentRoute.value.name

        return { list, isCurrent, goTo }
    }
}
</script>