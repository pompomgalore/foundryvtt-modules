import { readdir, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

interface ModulesData {
  modules: string[]
  generatedAt: string
}

async function generateModulesList(): Promise<void> {
  try {
    const modulesDir = join(process.cwd(), 'modules')
    const entries = await readdir(modulesDir, { withFileTypes: true })
    
    const modules = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    
    const data: ModulesData = {
      modules,
      generatedAt: new Date().toISOString()
    }
    
    const jsonContent = JSON.stringify(data, null, 2)
    
    // Ensure the output directories exist
    const docsDir = join(process.cwd(), 'docs')
    const publicDir = join(process.cwd(), 'public')
    await mkdir(docsDir, { recursive: true })
    await mkdir(publicDir, { recursive: true })
    
    // Write to docs directory for production build
    const docsPath = join(docsDir, 'modules.json')
    await writeFile(docsPath, jsonContent)
    
    // Write to public directory for development server
    const publicPath = join(publicDir, 'modules.json')
    await writeFile(publicPath, jsonContent)
    
    console.log(`Generated modules.json with ${modules.length} modules`)
    console.log('Modules:', modules)
  } catch (error) {
    console.error('Error generating modules list:', error)
    process.exit(1)
  }
}

generateModulesList()
