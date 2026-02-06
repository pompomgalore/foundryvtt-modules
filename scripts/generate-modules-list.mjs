#!/usr/bin/env node

import { readdir, writeFile } from 'fs/promises'
import { join } from 'path'

async function generateModulesList() {
  try {
    const modulesDir = join(process.cwd(), 'modules')
    const entries = await readdir(modulesDir, { withFileTypes: true })
    
    const modules = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort()
    
    const data = {
      modules,
      generatedAt: new Date().toISOString()
    }
    
    const outputPath = join(process.cwd(), 'docs', 'modules.json')
    await writeFile(outputPath, JSON.stringify(data, null, 2))
    
    console.log(`Generated modules.json with ${modules.length} modules`)
    console.log('Modules:', modules)
  } catch (error) {
    console.error('Error generating modules list:', error)
    process.exit(1)
  }
}

generateModulesList()
