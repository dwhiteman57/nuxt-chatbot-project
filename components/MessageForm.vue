<script setup lang="ts">
import { marked } from "marked";
import dompurify from "Dompurify";

const newMessage = ref("");
const messages = useMessages();
const { customerInitials } = useCustomer();
const isSubmitting = ref(false);

async function handleSubmit() {
  isSubmitting.value = true;

  messages.value.push({
    name: customerInitials.value,
    message: newMessage.value,
    isBruno: false,
    timestamp: new Date().toLocaleString([], {
      timeStyle: 'short',
    }),
  });

  const userMessage = newMessage.value;
  newMessage.value = "";

  await $fetch("/api/message", {
    method: "POST",
    query: {
      message: userMessage,
    },
    async onResponse({ response }){
      const content = response._data.data[0].content[0];

      if (content.type !== "text") {
        return;
      }

      const parsedMessage = await marked.parse(
          dompurify.sanitize(content.text.value),
      );

      messages.value.push({
        name: "Bruno",
        message: parsedMessage,
        isBruno: true,
        timestamp: new Date().toLocaleString([], {
          timeStyle: 'short',
        }),
      });

      isSubmitting.value = false;
    }
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="relative">
    <fieldset :disabled="isSubmitting">
      <textarea
          v-model.trim="newMessage"
          @keydown.enter.prevent="handleSubmit"
          class="transition p-4 w-full text-sm border border-slate-300/60 shadow-sm placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 pr-16 rounded-xl resize-none"
          placeholder="Enter your message..."
      ></textarea>
      <button
          type="submit"
          class="absolute top-2 right-2 h-10 w-10 flex items-center justify-center bg-gradient-to-t from-sky-500 to-emerald-500 rounded-full text-white"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send"
            viewBox="0 0 16 16"
        >
          <path
              d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
          />
        </svg>
      </button>
    </fieldset>
  </form>
</template>