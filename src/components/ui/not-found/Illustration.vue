<script setup lang="ts">
interface IllustrationProps {
  code?: string
}

withDefaults(defineProps<IllustrationProps>(), {
  code: "404",
})

// Inherit attributes (like classes) applied to the component
defineOptions({ inheritAttrs: false })
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 380 150"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <text
      x="50%"
      y="50%"
      dy="0.355em"
      text-anchor="middle"
      fill="currentColor"
      font-size="184"
      font-weight="800"
      letter-spacing="-4"
      class="font-sans select-none"
    >
      {{ code }}
    </text>
  </svg>
</template>
