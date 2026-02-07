<template>
  <router-link :to="`/module/${moduleId}`" class="module-card">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="card-content">
      <img 
        v-if="previewImage" 
        :src="previewImage" 
        :alt="`${moduleTitle} preview`"
        class="preview-image"
      />
      <h2 class="module-title">{{ moduleTitle }}</h2>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  moduleId: string
}>()

const moduleTitle = ref('')
const previewImage = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const baseUrl = `/foundryvtt-modules/modules/${props.moduleId}/`
    
    // Set preview image
    previewImage.value = `${baseUrl}media/preview.png`
    
    // Get module title from README
    const response = await fetch(`${baseUrl}README.md`)
    const markdown = await response.text()
    
    // Extract first heading as title
    const titleMatch = markdown.match(/^#\s+(.+)$/m)
    moduleTitle.value = titleMatch ? titleMatch[1] : props.moduleId
  } catch (error) {
    console.error(`Error loading module info for ${props.moduleId}:`, error)
    moduleTitle.value = props.moduleId
  } finally {
    loading.value = false
  }
})
</script>
