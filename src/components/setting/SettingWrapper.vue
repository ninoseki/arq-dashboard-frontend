<template>
  <Setting :settingNames="getSettingNamesTask.last?.value || []"></Setting>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useAsyncTask } from "vue-concurrency";

import { API } from "@/api";
import Setting from "@/components/setting/Setting.vue";
import { SettingName } from "@/types";

export default defineComponent({
  name: "SettingWrapper",
  components: {
    Setting,
  },
  setup() {
    const getSettingNamesTask = useAsyncTask<SettingName[], []>(async () => {
      return await API.getSettingNames();
    });

    onMounted(async () => {
      await getSettingNamesTask.perform();
    });

    return {
      getSettingNamesTask,
    };
  },
});
</script>
