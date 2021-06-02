<template>
    <div class="fixed top-0 left-0 flex-col flex items-center justify-center" style="width: 100vw; height: 100vh;">
        <!-- background-->
        <div @click="clickOutside" class="absolute opacity-50 bg-gray-900" style="width: 100vw; height: 100vh;"></div>
        <div class="bg-gray-700 border border-gray-600 w-6/12 p-2 rounded" style="z-index: 1000;">
            <div class="p-2 text-gray-100 font-bold">{{title}}</div>
            <div class="">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
    },
  },

  setup(props, context) {

    const clickOutside = () => context.emit("click:outside")

    return {clickOutside}
  },
};
</script>
