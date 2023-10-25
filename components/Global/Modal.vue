<template>
  <div>
    <div
      v-if="modal.show"
      class="w-full overflow-x-hidden overflow-y-auto max-h-screen fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative w-full my-10 mx-4 max-w-5xl overflow-y-auto max-h-screen"
      >
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">{{ modal.title }}</h3>
            <button class="text-red-500" @click="modal.hide()">X</button>
          </div>

          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-if="modal.component == 'mastervechile'"
          >
            <MasterHubVechile />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'masterorder'"
          >
            <MasterHubOrder />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'mastersettingdrivertypeorder'"
          >
            <MasterSettingServiceVechile />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'membersettingsettingorder'"
          >
            <MemberSettingSettingOrder />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'memberprofiletopup'"
          >
            <MemberProfileTopUp />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'memberdrivertopup'"
          >
            <MemberDriverTopUp />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'memberprofilehistory'"
          >
            <MemberProfileHistory />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'masterreadmessage'"
          >
            <MasterMessageRead />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'memberdriverdocument'"
          >
            <MemberDriverDocument />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'memberdriverlocate'"
          >
            <MemberDriverLocation />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else-if="modal.component == 'gallery'"
          >
            <Gallery />
          </div>
          <div
            class="w-full h-full md:flex md:flex-row justify-center items-start p-8"
            v-else
          >
            <NotFound />
          </div>

          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="modal.show" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts">
import { useModal } from "@/store/modal";
import Vue, { defineComponent } from "vue";
//components
import NotFound from "@/components/Dashboard/Content/NotFound.vue";
import Gallery from "./Gallery.vue";
//Master
import MasterHubVechile from "@/components/Dashboard/Content/Master/Hub/Vechile.vue";
import MasterHubOrder from "@/components/Dashboard/Content/Master/Hub/Order.vue";
import MasterSettingServiceVechile from "@/components/Dashboard/Content/Master/SettingService/Vechile.vue";
import MasterMessageRead from "@/components/Dashboard/Content/Master/Message/Read.vue";
//Member
import MemberSettingSettingOrder from "@/components/Dashboard/Content/Member/Setting/SettingOrder.vue";
import MemberProfileTopUp from "@/components/Dashboard/Content/Member/Profile/TopUp.vue";
import MemberProfileHistory from "@/components/Dashboard/Content/Member/Profile/History.vue";
import MemberDriverTopUp from "@/components/Dashboard/Content/Member/Driver/TopUp.vue";
import MemberDriverDocument from "@/components/Dashboard/Content/Member/Driver/Document.vue";
import MemberDriverLocation from "@/components/Dashboard/Content/Member/Driver/Location.vue";

export default defineComponent({
  setup() {
    const modal = useModal();
    return {
      modal,
    };
  },
  components: {
    NotFound,
    MasterHubVechile,
    MasterHubOrder,
    MasterSettingServiceVechile,
    MasterMessageRead,
    //Member
    MemberSettingSettingOrder,
    MemberProfileTopUp,
    MemberDriverTopUp,
    MemberProfileHistory,
    MemberDriverDocument,
    MemberDriverLocation,
    //components
    Gallery,
  },
  props: {},
  computed: {},
  data() {
    return {};
  },
  methods: {},
});
</script>
