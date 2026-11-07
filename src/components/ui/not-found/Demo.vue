<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue"
import NotFound from "@/components/ui/not-found/NotFound.vue"
import Illustration from "@/components/ui/not-found/Illustration.vue"
import { getStatusFromPath, type HttpStatusItem } from "@/components/ui/not-found/statusData"
import sainzlabLogo from "@/assets/sainzlab-logo.png"
import sainzlabLogoDark from "@/assets/sainzlab-logo-dark.png"

const currentPath = ref<string>(
  typeof window !== "undefined" ? window.location.pathname : "/"
)

function handlePopState() {
  currentPath.value = window.location.pathname
}

onMounted(() => {
  window.addEventListener("popstate", handlePopState)
})

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState)
})

const currentStatus = computed<HttpStatusItem>(() =>
  getStatusFromPath(currentPath.value)
)

watchEffect(() => {
  if (typeof document !== "undefined") {
    document.title = `${currentStatus.value.code} — ${currentStatus.value.title} | Sainzlab`
  }
})
</script>

<template>
  <div class="relative min-h-svh flex flex-col justify-between bg-background text-foreground selection:bg-sainzlab/30 overflow-hidden">
    <!-- Ambient Sainzlab Brand Glow -->
    <div
      class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-b from-sainzlab/15 via-sainzlab/5 to-transparent blur-3xl opacity-70 dark:opacity-40"
      aria-hidden="true"
    />

    <!-- Header Navigation with Sainzlab Identity (Entrance: 1st) -->
    <header class="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:px-10 flex items-center justify-between border-b border-border/40 animate-fade-in-up delay-100 fill-mode-both">
      <a href="/" class="flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sainzlab rounded-lg">
        <!-- Light mode logo (Rich amber icon + Dark charcoal typography) -->
        <img
          :src="sainzlabLogo"
          alt="Sainzlab Logo"
          class="h-7 sm:h-8 w-auto object-contain dark:hidden"
        />
        <!-- Dark mode logo (Glowing amber icon + Crisp white typography) -->
        <img
          :src="sainzlabLogoDark"
          alt="Sainzlab Logo"
          class="h-7 sm:h-8 w-auto object-contain hidden dark:block"
        />
      </a>
    </header>

    <!-- Main Content Area -->
    <main class="relative z-10 flex-1 flex flex-col justify-center items-center px-6 py-12 md:py-20 w-full">
      <div :key="currentStatus.code" class="relative max-w-5xl mx-auto w-full">
        <!-- Giant Status Code Watermark (Entrance: 2nd + Continuous Floating/Breathing) -->
        <div class="absolute inset-0 w-full h-[52vh] pointer-events-none select-none animate-fade-in-up delay-200 fill-mode-both">
          <Illustration
            :code="currentStatus.code"
            class="w-full h-full opacity-[0.045] dark:opacity-[0.035] text-foreground animate-float will-change-transform"
          />
        </div>

        <NotFound
          :title="currentStatus.title"
          :description="currentStatus.description"
        />
      </div>
    </main>

    <!-- Footer with Sainzlab Copyright & Quick Links (Entrance: 6th) -->
    <footer class="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:px-10 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-end gap-4 animate-fade-in-up delay-600 fill-mode-both">
      <div class="flex items-center gap-2">
        <p>&copy;2026 Sainzlab | Sainzcloud</p>
      </div>
    </footer>
  </div>
</template>
