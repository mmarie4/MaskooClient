<template>
  <div
    class="w-full flex justify-between px-2 py-1 items-center bg-gray-700 text-gray-100"
  >
    <div
      class="text-xs font-bold cursor-pointer"
      @click="showContactModal = true"
    >
      Contact
    </div>

    <div
      class="text-xs cursor-pointer font-bold"
      @click="showDonationModal = true"
    >
      Donate 🙏
    </div>

    <!-- Contact modal -->
    <j-modal
      v-if="showContactModal"
      title="Contact"
      @click:outside="showContactModal = false"
    >
      <div class="p-2">
        <div class="mb-6">Max MARIE</div>
        <div class="flex items-center mb-2">
          <img class="h-4 mr-2" src="@/assets/github_icon.png" />
          <a
            class="font-bold text-xs"
            href="https://github.com/mmarie4"
            target="_blank"
            >mmarie4</a
          >
        </div>
        <div class="flex items-center mb-2">
          <img class="h-4 mr-2" src="@/assets/email_icon.png" />
          <div class="text-xs">maskoo.contact@gmail.com</div>
        </div>
      </div>
    </j-modal>

    <!-- Donation modal -->
    <j-modal
      v-if="showDonationModal"
      title="Donate"
      @click:outside="showDonationModal = false"
    >
      <div class="p-2">Not implemented yet :(</div>
    </j-modal>
  </div>
</template>

<script>
import JModal from "./base/JModal";
import { ref } from "vue";

export default {
  components: {
    JModal,
  },

  setup() {
    let showContactModal = ref(false);
    let showDonationModal = ref(false);

    return { showContactModal, showDonationModal };
  },
};
</script>