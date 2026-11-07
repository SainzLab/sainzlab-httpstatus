<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { DEFAULT_STATUS_CODE, statusData } from "./statusData"
// Jika kamu menggunakan Vue Router, kamu juga bisa import { useRouter } dari 'vue-router' 
// untuk navigasi fallback yang lebih mulus tanpa reload (SPA).

export interface Props {
  title?: string
  description?: string
  homeUrl?: string
  homeLabel?: string
  backLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: statusData[DEFAULT_STATUS_CODE].title,
  description: statusData[DEFAULT_STATUS_CODE].description,
  homeUrl: "/",
  backLabel: "Kembali",
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
    <!-- Title (Entrance: 3rd) -->
    <h1 class="mt-2 text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl animate-fade-in-up delay-300 fill-mode-both">
      {{ title }}
    </h1>

    <!-- Description (Entrance: 4th) -->
    <p class="mt-5 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8 animate-fade-in-up delay-400 fill-mode-both">
      {{ description }}
    </p>

    <!-- Action Buttons (Entrance: 5th) -->
    <div class="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-3 gap-x-4 animate-fade-in-up delay-500 fill-mode-both">
      <!-- Dihapus as="a" dan :href="homeUrl", diganti dengan @click="handleBack" -->
      <!-- Ditambahkan class "group" agar group-hover pada icon berfungsi -->
      <Button
        class="group -order-1 sm:order-none bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-sainzlab dark:text-zinc-950 dark:hover:bg-sainzlab-400 font-medium shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-sainzlab focus-visible:ring-offset-2 cursor-pointer"
        @click="handleBack"
      >
       <ArrowLeft
          class="me-2 ms-0 opacity-60 transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
          :size="16"
          :stroke-width="2"
          aria-hidden="true"
        />  
       {{ backLabel }}
      </Button>
    </div>
  </div>
</template>