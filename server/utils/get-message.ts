import { client } from "./openai";

export const getLatestMessages = async (threadID: string, runID: string) => {
  let run = await client.beta.threads.runs.retrieve(threadID, runID);

  while (run.status != "completed") {
    await new Promise((resolve) => setTimeout(resolve, 500));
    run = await client.beta.threads.runs.retrieve(threadID, runID);
  }

  return await client.beta.threads.messages.list(threadID);
}



