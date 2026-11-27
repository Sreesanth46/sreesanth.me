<script setup lang="ts">
import type { Node } from '@comark/vue';
import { toNativeAttributes } from '@comark/vue/utils';
import { useClipboard } from '@vueuse/core';
import { WHOLE_BLOCK_CLASS } from '~/utils/markdown/line-reveal';

defineOptions({ inheritAttrs: false });

const { __node } = defineProps<{ __node: Node }>();

const attrs = useAttrs();
const preRef = useTemplateRef('pre');

// `legacy` covers the Clipboard API being missing over plain http (dev server on another device).
const { copy, copied } = useClipboard({ legacy: true, copiedDuring: 1500 });

// Comark turns code-block props into data-* attributes only for natively rendered elements.
const preAttrs = computed(() => toNativeAttributes('pre', __node, { ...attrs }));

async function copyCode() {
  await copy(preRef.value?.textContent ?? '');
}
</script>

<template>
  <div class="group relative" :class="WHOLE_BLOCK_CLASS">
    <pre ref="pre" v-bind="preAttrs"><slot /></pre>
    <button
      type="button"
      class="absolute top-2 right-2 flex cursor-pointer rounded-md border border-[#e5e5e5] bg-[#fafafa] p-1.5 text-[#9a9a9a] opacity-0 transition group-hover:opacity-100 hover:text-[#393a34] focus-visible:opacity-100 data-copied:opacity-100 dark:border-[#262626] dark:bg-[#0e0e0e] dark:text-[#6b6b6b] dark:hover:text-[#dbd7caee] [@media(hover:none)]:opacity-100"
      :data-copied="copied || undefined"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copyCode"
    >
      <CheckOutlined v-if="copied" class="size-4" />
      <CopyOutlined v-else class="size-4" />
    </button>
  </div>
</template>
