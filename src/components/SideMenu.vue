<template>
    <div class="bg-gray-600" style="width: 150px">
        <div v-for="item in list" :key="item.name">
            <div class="w-full cursor-pointer text-gray-200 px-4 py-2 hover:bg-gray-500" 
                :class="item.isCurrent ? 'bg-gray-500' : 'bg-gray-600'"
                @click="goTo(item.name)">{{item.label}}</div>
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
        list.find(i => i.route === router.currentRoute.value.name).isCurrent = true;

        const goTo = (name) => {
            router.push({name})
        }

        return {list, goTo}
    }
}
</script>