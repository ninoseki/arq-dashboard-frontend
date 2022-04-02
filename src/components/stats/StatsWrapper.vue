<template>
  <Loading v-if="getStatsTask.isRunning"></Loading>

  <StatsComponent
    :stats="getStatsTask.last.value"
    v-if="getStatsTask.last?.value"
  ></StatsComponent>
  <div v-if="updatedAt">
    <div class="columns">
      <div class="column">
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <a class="button is-light" @click="update">
              <span class="icon is-small">
                <i class="fas fa-sync"></i>
              </span>
              <span>Update</span>
            </a>
          </p>
        </div>
        <p>
          Updated at: {{ getLocalDatetime(updatedAt) }} ({{
            getHumanizedRelativeTime(updatedAt)
          }})
        </p>
      </div>
    </div>
  </div>

  <ErrorMessage
    v-if="getStatsTask.isError"
    :error="getStatsTask.last?.error"
  ></ErrorMessage>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useAsyncTask } from "vue-concurrency";

import { API } from "@/api";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Loading from "@/components/Loading.vue";
import StatsComponent from "@/components/stats/Stats.vue";
import { Stats } from "@/types";
import { getHumanizedRelativeTime, getLocalDatetime } from "@/utils";

export default defineComponent({
  name: "StatsWrapper",
  components: {
    Loading,
    ErrorMessage,
    StatsComponent,
  },
  setup() {
    const getStatsTask = useAsyncTask<Stats, []>(async () => {
      return await API.getStats();
    });

    const updatedAt = ref<string | undefined>(undefined);

    const update = async () => {
      await getStatsTask.perform();
      updatedAt.value = new Date().toISOString();
    };

    onMounted(async () => {
      await update();
    });

    return {
      getStatsTask,
      updatedAt,
      update,
      getHumanizedRelativeTime,
      getLocalDatetime,
    };
  },
});
</script>
