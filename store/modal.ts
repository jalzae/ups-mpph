import { defineStore } from "pinia";
export const useModal = defineStore("Modal", {
  state: () => ({
    show: false as boolean,
    title: "" as string,
    component: "" as string,
    data: [] as any,
  }),
  getters: {},
  actions: {
    set(val: string) {
      this.show = true;
      this.component = val;
    },
    setTitle(val: string) {
      this.title = val;
    },
    hide() {
      this.show = false;
    },
    setData(val: any) {
      this.data = val;
    },
  },
});
