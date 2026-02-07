<template>
  <div class="module-page">
    <div class="back-link">
      <router-link to="/">← Back to Modules</router-link>
    </div>
    
    <div v-if="loading" class="loading">Loading module...</div>
    <div v-else>
      <div class="module-content" v-html="htmlContent"></div>
      
      <div class="cta-footer">
        <a 
          href="https://www.patreon.com/c/PomPomGalli" 
          target="_blank" 
          rel="noopener noreferrer"
          class="cta-button"
        >
          Get early access on Patreon
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const moduleId = route.params.id as string

const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const baseUrl = `/foundryvtt-modules/modules/${moduleId}/`

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
    console.error(`Error loading README for ${moduleId}:`, error)
    htmlContent.value = `<p>Error loading module information</p>`
  } finally {
    loading.value = false
  }
})
</script>
