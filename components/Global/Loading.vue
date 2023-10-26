<template>
  <div :class="{ hiden: loading.loading == false }" id="loading">
    <div class="textLoader">
      <div class="text-center items-center">
        <img
          :src="`/images/logo.png`"
          alt="navbar brand"
          class="navbar-brand"
          style="min-height: 100%"
        />
        <br />
        <b>{{ loading.message }}</b>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useLoading } from "@/store/loading";
import Vue, { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const loading = useLoading();
    return {
      loading,
    };
  },
  mixins: [],
  components: {},
  props: {},
  methods: {
    hideLoading() {
      this.loading.unset();
    },
    showLoading() {
      this.loading.set();
    },
  },
  created() {
    this.loading.unset();
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
});
</script>

<style>
#loading {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: center no-repeat #fff;
}

/*-- css loader --*/
.no-js #loader {
  display: none;
}
.js #loader {
  display: block;
  position: absolute;
  left: 100px;
  top: 0;
}
.loader {
  border-top: 16px solid blue;
  border-bottom: 16px solid blue;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.textLoader {
  position: fixed;
  top: 40%;
  left: 45.6%;
  color: #34495e;
}

/*-- responsive --*/
@media screen and (max-width: 1034px) {
  .textLoader {
    left: 46.2%;
  }
}

@media screen and (max-width: 824px) {
  .textLoader {
    left: 47.2%;
  }
}

@media screen and (max-width: 732px) {
  .textLoader {
    left: 48.2%;
  }
}

@media screen and (max-width: 500px) {
  .loader {
    left: 36.5%;
  }
  .textLoader {
    left: 40.5%;
  }
}

@media screen and (max-height: 432px) {
  .textLoader {
    top: 65%;
  }
}

@media screen and (max-height: 350px) {
  .textLoader {
    top: 75%;
  }
}

@media screen and (max-height: 312px) {
  .textLoader {
    display: none;
  }
}
/*-- responsive --*/
.zindex {
  z-index: 1 !important;
}
.zindextrue {
  z-index: 9999 !important;
}
.main-header {
  max-height: 62px !important;
}
.navbar {
  max-height: 62px !important;
}
.hiden {
  display: none !important;
}
</style>
