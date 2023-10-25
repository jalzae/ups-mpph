import { defineStore } from "pinia";
export const useLoading = defineStore("Loading", {
  state: () => ({
    loading: true,
    message: "Please Wait...",
  }),
  getters: {},
  actions: {
    set() {
      this.loading = true;
    },
    unset() {
      this.loading = false;
    },
    setMessage(val: string) {
      this.message = val;
    },
    unsetMessage() {
      this.message = "";
    },
  },
});
