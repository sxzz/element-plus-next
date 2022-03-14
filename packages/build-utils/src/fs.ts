import { promises as fs } from 'fs'

export const readJSON = async <T = unknown>(path: string): Promise<T> =>
  JSON.parse(await fs.readFile(path, 'utf-8'))
