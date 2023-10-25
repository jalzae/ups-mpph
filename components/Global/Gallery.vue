<template>
  <div class="w-full">
    <Forms :selected="forms" :form="form" :action="'upload'" @upload="upload" />
    <div @click="copy" v-if="url != ''" class="mt-4 rounded-lg cursor-pointer">
      <i class="fas fa-copy"></i> {{ url }}
    </div>
  </div>
</template>
<script lang="ts">
import Forms from "./Form.vue";
//store
import * as store from "@/store/";
//api
import api from "@/api/index";
import image from "@/api/API/images";
//model
import Res from "@/model/response";
//define
import Swal from "sweetalert2";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const loading = store.useLoading();
    return {
      loading,
    };
  },
  mixins: [api],
  components: { Forms },
  props: {},
  data() {
    return {
      forms: {
        image: "",
        ext: "",
      },
      url: "",
      form: [
        {
          model: "image",
          type: "file",
          label: "File Image",
          extension: "ext",
          allow: ["jpg", "jpeg", "png"],
        },
      ],
    };
  },
  methods: {
    copy() {
      const tempInput = document.createElement("input");
      tempInput.value = this.url;
      document.body.appendChild(tempInput);

      // Select and copy the text
      tempInput.select();
      document.execCommand("copy");

      // Clean up
      document.body.removeChild(tempInput);

      alert("Copied");
    },
    async upload() {
      try {
        this.loading.set();
        const res: typeof Res = await this.sendRequest(
          image.imagescreate(this.forms),
          true,
          false,
          true
        );
        if (res.status) {
          this.url = this.$axios.defaults.baseURL + res.data;
          this.copy();
        } else {
          throw "Gagal Upload";
        }
      } catch (e) {
        Swal.fire({ title: "Gagal Upload", icon: "error" });
      } finally {
        this.loading.unset();
      }
    },
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>
