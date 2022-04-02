<template>
  <div>
    <div class="box">
      <div class="field">
        <label class="label">ARQ Dashboard setting</label>
        <div class="control">
          <div class="select">
            <select v-model="setting" @change="updateSetting">
              <option v-for="s in settingNames" :key="s.name">
                {{ s.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { updateClient } from "@/api";
import { useGlobalState } from "@/store";
import { SettingName } from "@/types";

export default defineComponent({
  name: "SettingItem",
  props: {
    settingNames: {
      type: Array as PropType<SettingName[]>,
      required: true,
    },
  },
  setup() {
    const state = useGlobalState();

    const setting = ref(state.value.setting);

    const updateSetting = () => {
      state.value.setting = setting.value;
      updateClient();
    };

    return { setting, updateSetting };
  },
});
</script>
