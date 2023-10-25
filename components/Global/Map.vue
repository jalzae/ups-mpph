<template>
  <div style="height: 100vh" class="w-full">
    <LMap ref="map" :zoom="zoom" :center="[lat ?? 47.21322, long ?? -1.559482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker :lat-lng="[lat ?? 55.9464418, long ?? 8.1277591]">
        <l-popup>Lokasi</l-popup>
      </l-marker>
    </LMap>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const zoom = ref(10);
    return { zoom };
  },
  mixins: [],
  components: {},
  props: {
    lat: {
      type: Number, // We're using Number type for floats
      required: true,
    },
    long: {
      type: Number, // We're using Number type for floats
      required: true,
    },
  },
  methods: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>

<style>
body {
  margin: 0;
}
</style>
