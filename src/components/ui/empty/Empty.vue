<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    data-slot="empty"
    :class="cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg p-6 text-center md:p-12', props.class)"
  >
    <slot />
  </div>
</template>
