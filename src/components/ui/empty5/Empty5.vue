<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import MaintenanceIllustration from './MaintenanceIllustration.vue'
import { cn } from '@/lib/utils'

export interface Empty5Props {
  title?: string
  description?: string
  checkStatusLabel?: string
  refreshLabel?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Empty5Props>(), {
  title: 'Under Maintenance',
  description:
    "Saat ini kami sedang melakukan pemeliharaan terjadwal. Kami akan segera kembali. Terima kasih atas kesabaran Anda.",
  checkStatusLabel: 'Check Status',
  refreshLabel: 'Refresh Page',
})

const emit = defineEmits<{
  (e: 'checkStatus'): void
  (e: 'refresh'): void
}>()

function handleCheckStatus() {
  emit('checkStatus')
}

function handleRefresh() {
  emit('refresh')
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}
</script>

<template>
  <Empty :class="cn('w-full max-w-xl mx-auto py-8 sm:py-12', props.class)">
    <EmptyHeader class="max-w-lg mx-auto gap-4">
      <!-- Maintenance Server Illustration (Entrance: 2nd) -->
      <EmptyMedia class="mb-4 animate-fade-in-up delay-200 fill-mode-both">
        <MaintenanceIllustration class="w-full" />
      </EmptyMedia>

      <!-- Title (Entrance: 3rd) -->
      <EmptyTitle
        class="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground animate-fade-in-up delay-300 fill-mode-both"
      >
        {{ title }}
      </EmptyTitle>

      <!-- Description (Entrance: 4th) -->
      <EmptyDescription
        class="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed text-balance animate-fade-in-up delay-400 fill-mode-both"
      >
        {{ description }}
      </EmptyDescription>
    </EmptyHeader>

    <!-- Action Buttons (Entrance: 5th) -->
    <EmptyContent
      class="mt-2 flex-row justify-center items-center gap-3 animate-fade-in-up delay-500 fill-mode-both"
    >
      <!-- Check Status Button -->
      <Button
        type="button"
        variant="outline"
        class="h-10 px-5 text-sm font-medium rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all duration-200 active:scale-[0.98] cursor-pointer"
        @click="handleCheckStatus"
      >
        {{ checkStatusLabel }}
      </Button>

      <!-- Refresh Page Button -->
      <Button
        type="button"
        class="h-10 px-5 text-sm font-medium rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
        @click="handleRefresh"
      >
        {{ refreshLabel }}
      </Button>
    </EmptyContent>
  </Empty>
</template>
