import { readdir, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

async function generateModulesList() {
  try {
    const publicDir = join(process.cwd(), 'public')

    const modulesDir = join(publicDir, 'modules')
    const entries = await readdir(modulesDir, { withFileTypes: true })
    const modules = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    
    const jsonContent = JSON.stringify(modules, null, 2)
    
    const manifestPath = join(modulesDir, 'manifest.json')
    await writeFile(manifestPath, jsonContent)
    
    console.log(`Generated manifest.json with ${modules.length} modules`, modules)
  } catch (error) {
    console.error('Error generating modules list:', error)
    process.exit(1)
  }
}

generateModulesList()
