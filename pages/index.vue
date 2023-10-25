<template>
  <div>
    <Forms
      :action="'submit_form'"
      @submit_form="submit_form"
      :selected="forms"
      :form="form"
      :formErrors="formErrors"
    />
  </div>
</template>
<script lang="ts">
import "@/assets/css/styles.css";
import Vue, { defineComponent } from "vue";
import Forms from "@/components/Global/Form.vue";
import api from "@/api/index";
export default defineComponent({
  mixins: [api],
  components: { Forms },
  props: {},
  methods: {
    submit_form() {
      try {
        const form = this.validateForm(this.form, this.forms);

        if (form) {
          alert(JSON.stringify(this.forms));
        } else {
          alert("Gagal");
        }
      } catch (e) {
      } finally {
      }
    },
  },
  data() {
    return {
      forms: { text: "" },
      form: [
        {
          model: "text",
          type: "text",
          label: "Test",
          validation: ["required", "combinedValidation"],
        },
      ],
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>
