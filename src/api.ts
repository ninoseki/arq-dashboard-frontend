import axios from "axios";

import { useGlobalState } from "@/store";
import {
  FunctionName,
  Job,
  JobsWithPagination,
  QueueName,
  SearchParams,
  SettingName,
  Stats,
} from "@/types";

const state = useGlobalState();

let client = axios.create({
  headers: {
    accept: "application/json",
    "arq-dashboard-setting": state.value.setting,
  },
});

export function updateClient(): void {
  client = axios.create({
    headers: {
      accept: "application/json",
      "arq-dashboard-setting": state.value.setting,
    },
  });
}

export const API = {
  async getStats(): Promise<Stats> {
    const res = await client.get<Stats>("/api/stats/");
    return res.data;
  },

  async getJob(id: string): Promise<Job> {
    const res = await client.get<Job>(`/api/jobs/${id}`);
    return res.data;
  },

  async getJobs(params: SearchParams): Promise<JobsWithPagination> {
    const res = await client.get<JobsWithPagination>("/api/jobs/", {
      params: params,
    });
    return res.data;
  },

  async getFunctionNames(): Promise<FunctionName[]> {
    const res = await client.get<FunctionName[]>("/api/functions/");
    return res.data;
  },

  async getQueueNames(): Promise<QueueName[]> {
    const res = await client.get<QueueName[]>("/api/queues/");
    return res.data;
  },

  async getSettingNames(): Promise<SettingName[]> {
    const res = await client.get<SettingName[]>("/api/settings/");
    return res.data;
  },
};