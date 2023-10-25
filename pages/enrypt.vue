<template>
  <div class="m-3">
    <p class="text-bold text-2xl">Its Test</p>
    <p class="text-bold text-blue-500 text-3xl">
      Im gonna make with tailwind Css
    </p>
    <p class="text-yellow-400">
      Sample Data string:
      bDhJj0km8viYn+qxP/N7nxxdPxSIHnA39kwGu7oVyJP7yhXGs6IpLdfa9g2QOOqyJURflgLdu3rHQ4HbbIG16J3E5OFvFG8TffZvmRNLZNLp7GjXJWTbgHlOcm5ueNU/c1jNI6MBVS7b+wuZXAnOKXj3RW+e8AzZ4cfv5lDd1PkT/hD3OH/fUM7yvcZ8/DCeox8V+jjru2sWtS2sjOYA/Nd5k6cTl/siEjMoM4Ye1LNUEHjHF4//TaXdLge0R28aA0lsaDjctIHUWJZuYTPBE1c2srl4oJGwcs1510evNDTJysUE6Qn0nDT735iFqgk/q+gfuiqNGU8hirimvzTOm0QR/wef+akYME6hXqndmCgqpK/Bem3b9dQliMYQubnoBa6t34nnmXSavixJSAYTs9J4DOGCPLd7I5b3+txjucYytWWR0Nu19KGRy0ioYaAm7bV9iZsXzLNjzDD4eSginendyZjyuclCKxiP8zj/oVh2ZFmulzOPs/SmUfeK0Qnapw6qGZ+VymrsDqF/X7HtIJd2UKluFjr6tJfHOWaS5iw2lsaLPMNEGEO594knblY2gSYjt3QcqhRZ+/s7WNmYi9n9acmDwUH0ReluJ8/fj1iPxNiJY3/NKTGDFAS2tySITgfQ1XfamO+va/MWrLxWUuYGymgO3xQ4Ev7dB3hfgRJRvxbBybex+4u7w1Ny8l4M1bFXlKZY8GUMe2TzgkWaSBKTU3tBryko28Q8hL2++AVFLENnlBxPU0wbGfmFB9UZoFoxwMlIzRk5c+g/8Se2JaEm6Muo8XtVQtix5fVIEdOM3C5e1cZlRs8pDSfofQg/
    </p>
    <p class="text-blue-400">Result :{{ response }}</p>
    <button @click="convertToA" class="btn text-white bg-blue-500 rounded p-1">
      Encrypt!
    </button>
    <br />
    <p>Encrypted : {{ encrypted }}</p>
    <p>Encrypted Payload : {{ encrypted_payload }}</p>
    <button @click="convertToB" class="btn text-white bg-blue-500 rounded p-1">
      Decode!
    </button>
    <br />
    <p>Decoded : {{ decoded }}</p>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent } from "vue";
import api from "@/api/index";
import middle from "@/middleware/receiver";
export default defineComponent({
  mixins: [api, middle],
  components: {},
  props: {},
  methods: {
    async fetch() {
      return this.$axios.get("todos/1");
    },
    send() {
      this.response = this.receiveData(
        "bDhJj0km8viYn+qxP/N7nxxdPxSIHnA39kwGu7oVyJP7yhXGs6IpLdfa9g2QOOqyJURflgLdu3rHQ4HbbIG16J3E5OFvFG8TffZvmRNLZNLp7GjXJWTbgHlOcm5ueNU/c1jNI6MBVS7b+wuZXAnOKXj3RW+e8AzZ4cfv5lDd1PkT/hD3OH/fUM7yvcZ8/DCeox8V+jjru2sWtS2sjOYA/Nd5k6cTl/siEjMoM4Ye1LNUEHjHF4//TaXdLge0R28aA0lsaDjctIHUWJZuYTPBE1c2srl4oJGwcs1510evNDTJysUE6Qn0nDT735iFqgk/q+gfuiqNGU8hirimvzTOm0QR/wef+akYME6hXqndmCgqpK/Bem3b9dQliMYQubnoBa6t34nnmXSavixJSAYTs9J4DOGCPLd7I5b3+txjucYytWWR0Nu19KGRy0ioYaAm7bV9iZsXzLNjzDD4eSginendyZjyuclCKxiP8zj/oVh2ZFmulzOPs/SmUfeK0Qnapw6qGZ+VymrsDqF/X7HtIJd2UKluFjr6tJfHOWaS5iw2lsaLPMNEGEO594knblY2gSYjt3QcqhRZ+/s7WNmYi9n9acmDwUH0ReluJ8/fj1iPxNiJY3/NKTGDFAS2tySITgfQ1XfamO+va/MWrLxWUuYGymgO3xQ4Ev7dB3hfgRJRvxbBybex+4u7w1Ny8l4M1bFXlKZY8GUMe2TzgkWaSBKTU3tBryko28Q8hL2++AVFLENnlBxPU0wbGfmFB9UZoFoxwMlIzRk5c+g/8Se2JaEm6Muo8XtVQtix5fVIEdOM3C5e1cZlRs8pDSfofQg/"
      );
      console.log(this.response);
    },
    convertToA() {
      this.encrypted = this.encryptData(this.response);
      this.encrypted_payload = this.payloadSend(this.response);
    },
    convertToB() {
      this.decoded = this.decryptData(this.encrypted);
    },
  },
  data() {
    return {
      response: {},
      encrypted: "",
      encrypted_payload: "",
      decoded: "",
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  async created() {
    this.send();
  },
});
</script>
