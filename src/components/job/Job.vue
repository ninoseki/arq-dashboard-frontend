<template>
  <h2 class="is-size-2 mb-4">{{ job.jobId }}</h2>

  <div class="wrapper">
    <VueJsonPretty :data="job"></VueJsonPretty>
  </div>
</template>

<script lang="ts">
import "vue-json-pretty/lib/styles.css";

import { defineComponent, PropType } from "vue";
import VueJsonPretty from "vue-json-pretty";

import { Job } from "@/types";

export default defineComponent({
  name: "JobItem",
  components: {
    VueJsonPretty,
  },
  props: {
    job: {
      type: Object as PropType<Job>,
      required: true,
    },
  },
});
</script>
<style scoped>
.wrapper {
  background-color: rgb(246, 248, 250);
  padding: 10px;
}
</style>
