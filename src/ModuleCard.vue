<template>
  <div class="module-card">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="module-content" v-html="htmlContent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  moduleId: string
}>()

const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const baseUrl = `/foundryvtt-modules/modules/${props.moduleId}/`

    const response = await fetch(`${baseUrl}README.md`)
    const markdown = await response.text()
    
    const renderer = new marked.Renderer()
    const originalImageRenderer = renderer.image.bind(renderer)
    
    renderer.image = (href, title, text) => {
      if (href && !href.startsWith('http') && !href.startsWith('/')) {
        href = baseUrl + href
      }
      return originalImageRenderer(href, title, text)
    }
    
    marked.setOptions({ renderer })
    htmlContent.value = marked.parse(markdown) as string
  } catch (error) {
    console.error(`Error loading README for ${props.moduleId}:`, error)
    htmlContent.value = `<p>Error loading module information</p>`
  } finally {
    loading.value = false
  }
})
</script>
