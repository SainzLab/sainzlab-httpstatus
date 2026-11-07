<script setup lang="ts">
import { ref, onMounted, onUnmounted, type HTMLAttributes } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 700,
})

const buttonRef = ref<HTMLButtonElement | null>(null)
const isDark = ref<boolean>(false)

function syncTheme() {
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark')
  }
}

let observer: MutationObserver | null = null

onMounted(() => {
  syncTheme()
  observer = new MutationObserver(syncTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

async function toggleTheme() {
  if (!buttonRef.value || typeof document === 'undefined') return

  const willBeDark = !isDark.value
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const updateDomAndStorage = () => {
    isDark.value = willBeDark
    document.documentElement.classList.toggle('dark', willBeDark)
    localStorage.setItem('theme', willBeDark ? 'dark' : 'light')
  }

  // Fallback if View Transitions API is not supported or user prefers reduced motion
  if (
    typeof document.startViewTransition !== 'function' ||
    prefersReducedMotion
  ) {
    updateDomAndStorage()
    return
  }

  const { left, top, width, height } = buttonRef.value.getBoundingClientRect()
  const x = left + width / 2
  const y = top + height / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    updateDomAndStorage()
  })

  await transition.ready

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: props.duration,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    }
  )
}
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :aria-label="isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'"
    :title="isDark ? 'Mode Terang' : 'Mode Gelap'"
    :class="
      cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-background/80 hover:bg-muted/80 backdrop-blur-sm shadow-sm transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sainzlab cursor-pointer',
        props.class
      )
    "
    @click="toggleTheme"
  >
    <Transition name="theme-toggle-icon" mode="out-in">
      <span
        v-if="isDark"
        key="sun"
        class="inline-flex items-center justify-center text-sainzlab"
      >
        <Sun class="w-4 h-4 sm:w-[18px] sm:h-[18px]" :stroke-width="2" />
      </span>
      <span
        v-else
        key="moon"
        class="inline-flex items-center justify-center text-zinc-800"
      >
        <Moon class="w-4 h-4 sm:w-[18px] sm:h-[18px]" :stroke-width="2" />
      </span>
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle-icon-enter-active,
.theme-toggle-icon-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-toggle-icon-enter-from {
  opacity: 0;
  transform: scale(0.55) rotate(25deg);
}

.theme-toggle-icon-leave-to {
  opacity: 0;
  transform: scale(0.55) rotate(-25deg);
}
</style>
