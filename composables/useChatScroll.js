import { nextTick, watch } from 'vue';

export const useChatScroll = (containerRef, messages) => {
  const scrollToBottom = () => {
    nextTick(() => {
      if (containerRef.value) {
        containerRef.value.scrollTop = containerRef.value.scrollHeight;
      }
    });
  };

  watch(messages, () => {
    const el = containerRef.value;
    if (!el) return;

    // Auto-scroll si el usuario está cerca del final (150px)
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
    
    if (isNearBottom) {
      scrollToBottom();
    }
  }, { deep: true });

  return { scrollToBottom };
};
