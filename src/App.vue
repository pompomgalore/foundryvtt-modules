<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ModuleCard from './components/ModuleCard.vue'

interface Module {
  id: string
  readmePath: string
}

const modules = ref<Module[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    // In production, we'll fetch the list of modules from a generated JSON file
    // For now, we'll discover modules by listing the modules directory
    const response = await fetch('/foundryvtt-modules/modules.json')
    const data = await response.json()
    modules.value = data.modules.map((id: string) => ({
      id,
      readmePath: `/foundryvtt-modules/modules/${id}/README.md`
    }))
  } catch (error) {
    console.error('Error loading modules:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Foundry VTT Modules</h1>
    <div v-if="loading" class="loading">Loading modules...</div>
    <div v-else class="modules-grid">
      <ModuleCard
        v-for="module in modules"
        :key="module.id"
        :module-id="module.id"
        :readme-path="module.readmePath"
      />
    </div>
  </div>
</template>
