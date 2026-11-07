<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
// Jika kamu menggunakan Vue Router, kamu juga bisa import { useRouter } dari 'vue-router' 
// untuk navigasi fallback yang lebih mulus tanpa reload (SPA).

interface Props {
  title?: string
  description?: string
  homeUrl?: string
  homeLabel?: string
  backLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: "Page not found",
  description: "Lost, this page is. In another system, it may be.",
  homeUrl: "/",
  backLabel: "Go back",
})

const emit = defineEmits<{
  (e: "back"): void
}>()

function handleBack() {
  emit("back")
  
  if (typeof window !== "undefined") {
    // Jika ada history halaman sebelumnya
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // Fallback: Jika dibuka di tab baru (tidak ada history), arahkan ke homeUrl
      window.location.href = props.homeUrl
    }
  }
}
</script>

<template>
  <div class="relative text-center z-[1] pt-12 sm:pt-20 md:pt-24 max-w-2xl mx-auto px-4">
    <!-- Title -->
    <h1 class="mt-2 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
      {{ title }}
    </h1>

    <!-- Description -->
    <p class="mt-5 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
      {{ description }}
    </p>

    <!-- Action Buttons -->
    <div class="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-4">
      <!-- Dihapus as="a" dan :href="homeUrl", diganti dengan @click="handleBack" -->
      <!-- Ditambahkan class "group" agar group-hover pada icon berfungsi -->
      <Button
        class="group -order-1 sm:order-none bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-sainzlab dark:text-zinc-950 dark:hover:bg-sainzlab-400 font-medium shadow transition-all"
        @click="handleBack"
      >
       <ArrowLeft
          class="me-2 ms-0 opacity-60 transition-transform group-hover:-translate-x-1"
          :size="16"
          :stroke-width="2"
          aria-hidden="true"
        />  
       {{ backLabel }}
      </Button>
    </div>
  </div>
</template>