<template>
    <div class="absolute top-0 left-0 flex-col flex items-center justify-center" style="width: 100vw; height: 100vh;">
        <!-- background-->
        <div class="absolute opacity-25 bg-gray-900" style="width: 100vw; height: 100vh;"></div>
        <div class="bg-gray-700 w-6/12 p-2 rounded" style="z-index: 1000;">
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
      type: Object,
    },
  },

  setup() {},
};
</script>
