<template>
  <div>
    <table :id="id" class="text-left w-full border-collapse">
      <thead class="thead-light">
        <tr>
          <th class="py-4 px-6 bg-gray-800 font-bold uppercase text-sm text-white border-b border-gray-200">
            #
          </th>
          <th class="py-4 px-6 bg-gray-800 font-bold uppercase text-sm text-white border-b border-gray-200"
            v-for="(item, int) in format.header" :key="int">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody v-if="datas.length == 0">
        <tr class="hover:bg-gray-100">
          <td class="text-center" :colspan="format.header.length + 1">
            <b> No Data</b>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="hover:bg-gray-100" v-for="(item, index) in (datas as any)" :key="item[0]" :class="item.class">
          <td class="py-4 px-6 border-b border-gray-200">{{ index + 1 }}</td>
          <td class="py-4 px-6 border-b border-gray-200" v-for="(items, i) in format.body" :key="i">
            {{ item[items] }}
          </td>
          <td class="py-4 px-6 border-b border-gray-200" v-for="items in format.btn" :key="items.action">
            <button v-if="item[items.model] == items.false" style="margin: 10px !important" :class="items.class"
              @click="action(items.action, item[items.key], null)" class="btn">
              <i :class="items.icon"></i> {{ item[items.model] || "Tidak Ada" }}
            </button>
            <button v-else style="margin: 10px !important" :class="items.classfalse"
              @click="action(items.actionfalse, item[items.key], null)" class="btn">
              <i :class="items.iconfalse"></i>
              {{ item[items.model] || "Tidak Ada" }}
            </button>
          </td>
          <td class="py-4 px-6 border-b border-gray-200" v-for="items in format.btn2" :key="items.action">
            <button v-if="item[items.model] != items.false" style="margin: 10px !important" :class="items.class"
              @click="action(items.action, item[items.key], item[items.key2])" class="btn">
              <i :class="items.icon"></i> {{ item[items.title] }}
            </button>
            <button v-else style="margin: 10px !important" :class="items.classfalse" @click="
              action(items.actionfalse, item[items.key], item[items.key2])
              " class="btn">
              <i :class="items.iconfalse"></i> {{ item[items.titlefalse] }}
            </button>
          </td>
          <td class="py-4 px-6 border-b border-gray-200" v-for="items in format.images" :key="items.action">
            <img :src="item[items.src]" :alt="item[items.src]" @click="action(items.action, items[item.model], null)"
              style="max-width: 70px !important" />
          </td>
          <td v-if="format.action.length > 0" class="py-4 px-6 border-b border-gray-200">
            <button v-for="act in format.action" :key="act.action" style="margin: 10px !important" :class="act.class"
              @click="action(act.action, item[act.model], null)" class="btn">
              <i :class="act.icon"></i> {{ act.title }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="flex justify-center items-center">
      <Paging @prev="prev" @next="next" :page="page ?? 1" :total_page="total_page ?? 1" />
    </div>
  </div>
</template>
<script lang="ts">
import Paging from "./Paging.vue";
import Vue, { defineComponent } from "vue";
export default defineComponent({
  setup() { },
  mixins: [],
  components: { Paging },
  props: {
    datas: {
      type: Array,
    },
    format: {
      type: Object,
    },
    id: {
      type: String,
    },
    page: {
      type: Number,
    },
    total_page: {
      type: Number,
    },
  },
  methods: {
    action(action: string, model: string, model2: any) {
      const data = { action, val1: model, val2: model2 };
      this.$emit("action", data);
    },
    prev() {
      this.$emit("prev");
    },
    next() {
      this.$emit("next");
    },
  },
  data() {
    return {};
  },
  mounted() { },
  computed: {},
  watch: {},
  created() { },
});
</script>

<style>
.rowdanger {
  background: rgb(245, 56, 56) !important;
  color: white !important;
  cursor: pointer;
}

.rowsuccess {
  background: #31ce36 !important;
  color: white !important;
}

.pointer {
  cursor: pointer;
}
</style>
