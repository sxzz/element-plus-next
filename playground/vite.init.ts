import { existsSync, writeFileSync, readFileSync } from 'fs'

const app = 'src/App.vue'
const example = 'app.example.vue'

if (!existsSync(app)) {
  writeFileSync(app, readFileSync(example))
}
