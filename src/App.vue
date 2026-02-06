<template>
  <div>
    <h1>Foundry VTT Modules</h1>
    <div v-if="loading" class="loading">Loading modules...</div>
    <div v-else class="modules-grid">
      <ModuleCard
        v-for="moduleId in modules"
        :key="moduleId"
        :module-id="moduleId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleCard from './ModuleCard.vue'

const modules = ref<string[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('/foundryvtt-modules/modules/manifest.json')
    modules.value = await response.json()
  } catch (error) {
    console.error('Error loading modules:', error)
  } finally {
    loading.value = false
  }
})
</script>
