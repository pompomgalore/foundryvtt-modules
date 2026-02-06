import { readdir, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

async function generateModulesList(): Promise<void> {
  try {
    const modulesDir = join(process.cwd(), 'modules')
    const entries = await readdir(modulesDir, { withFileTypes: true })
    
    const modules = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    
    const jsonContent = JSON.stringify(modules, null, 2)
    
    // Write to public directory (Vite will copy to docs during build)
    const publicDir = join(process.cwd(), 'public')
    await mkdir(publicDir, { recursive: true })
    
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
