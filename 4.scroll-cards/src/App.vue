<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, reactive, watch } from 'vue'
import type { ComponentInstance } from 'vue'

import Card from './Card.vue'

const cards = Array.from(Array(100), (_, x) => `Card ${x + 1}`)

// Add code to this file to complete the task

const cardsRef = shallowRef<ComponentInstance<typeof Card>[]>([])

const visibleCardIds = reactive<number[]>([])
const focusedCardId = ref<number | null>(null)

let observer: IntersectionObserver | null = null
let scrollY = window.scrollY

const handleIntersectionObserver = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    const id = +entry.target.id

    if (entry.isIntersecting) {
      if (!visibleCardIds.includes(id)) {
        if (scrollY <= window.scrollY) {
          visibleCardIds.push(id)
        } else {
          visibleCardIds.unshift(id)
        }
      }
    } else {
      const index = visibleCardIds.indexOf(id)
      if (index !== -1) {
        visibleCardIds.splice(index, 1)
      }
    }
  })
}

const setupObserver = () => {
  observer = new IntersectionObserver(handleIntersectionObserver, { threshold: 1 })

  cardsRef.value.forEach((card) => {
    observer?.observe(card.$el)
  })
}

const cleanupObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

watch(visibleCardIds, (newVisibleCardIds) => {
  if (newVisibleCardIds.length) {
    if (scrollY <= window.scrollY) {
      focusedCardId.value = newVisibleCardIds[0]
    } else {
      focusedCardId.value = newVisibleCardIds[newVisibleCardIds.length - 1]
    }

    scrollY = window.scrollY
  }
})

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  cleanupObserver()
})
</script>

<template>
  <div>
    <Card
      ref="cardsRef"
      v-for="(card, id) in cards"
      :cardText="card"
      :key="id"
      :id="id"
      :isInFocus="id === focusedCardId"
      v-memo="[id === focusedCardId]"
    >
      <p>{{ card }}</p>
    </Card>
  </div>
</template>

<style scoped></style>
