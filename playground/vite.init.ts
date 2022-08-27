import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

const app = 'src/App.vue'
const example = 'app.example.vue'

if (!existsSync(app)) {
  await writeFile(app, await readFile(example))
}
