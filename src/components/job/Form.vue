<template>
  <div class="columns">
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Success</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" v-model="success" v-bind:value="true" />
                True
              </label>
              <label class="radio">
                <input type="radio" v-model="success" v-bind:value="false" />
                False
              </label>
              <label class="radio">
                <input
                  type="radio"
                  v-model="success"
                  v-bind:value="undefined"
                />
                Both
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Status</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="status">
                  <option></option>
                  <option v-for="status_ in statuses" :key="status_">
                    {{ status_ }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Queue</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="queueName">
                  <option></option>
                  <option v-for="q in queueNames" :key="q.name">
                    {{ q.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Function</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select">
                <select v-model="functionName">
                  <option></option>
                  <option v-for="f in functionNames" :key="f.name">
                    {{ f.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Start time</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <Datepicker v-model="startTime"></Datepicker>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Finish time</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <Datepicker v-model="finishTime"></Datepicker>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "vue3-date-time-picker/dist/main.css";

import { useRouteQuery } from "@vueuse/router";
import { defineComponent, onMounted, PropType, ref } from "vue";
import Datepicker from "vue3-date-time-picker";

import { FunctionName, QueueName, SearchParams } from "@/types";

export default defineComponent({
  name: "FormItem",
  props: {
    page: {
      type: Number,
      required: true,
    },
    functionNames: {
      type: Array as PropType<FunctionName[]>,
      required: true,
    },
    queueNames: {
      type: Array as PropType<QueueName[]>,
      required: true,
    },
  },
  components: {
    Datepicker,
  },
  setup(props) {
    const success = ref<boolean | undefined>(undefined);
    const queueName = ref<string | undefined>(undefined);
    const startTime = ref<string | undefined>(undefined);
    const finishTime = ref<string | undefined>(undefined);
    const functionName = ref<string | undefined>(undefined);
    const status = ref<string | undefined>(undefined);

    const statuses = [
      "deferred",
      "queued",
      "in_progress",
      "complete",
      "not_found",
    ];

    const normalizeQueryValue = (
      value: string | undefined
    ): string | undefined => {
      if (value === undefined || value === "") {
        return undefined;
      }
      return value;
    };

    const getSearchParams = (): SearchParams => {
      const params: SearchParams = {
        page: props.page,
        success: success.value,
        status: normalizeQueryValue(status.value),
        queueName: normalizeQueryValue(queueName.value),
        startTime: normalizeQueryValue(startTime.value),
        finishTime: normalizeQueryValue(finishTime.value),
        functionName: normalizeQueryValue(functionName.value),
      };
      return params;
    };

    const updateParamsViaQueries = () => {
      const queueQuery = useRouteQuery("queue");
      const functionQuery = useRouteQuery("function");
      const statusQuery = useRouteQuery("status");

      if (queueQuery.value) {
        queueName.value = queueQuery.value.toString();
      }

      if (functionQuery.value) {
        functionName.value = functionQuery.value.toString();
      }

      if (statusQuery.value) {
        status.value = statusQuery.value.toString();
      }
    };

    onMounted(() => {
      updateParamsViaQueries();
    });

    return {
      getSearchParams,
      success,
      status,
      queueName,
      startTime,
      finishTime,
      functionName,
      statuses,
    };
  },
});
</script>
