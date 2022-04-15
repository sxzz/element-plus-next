import path from 'path'
import ts from 'typescript'
import { getWorkspaceRoot } from './workspace'

export const getTsConfig = async (tsconfigPath: string) => {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile)
  if (configFile.error?.messageText) {
    throw new Error(configFile.error.messageText.toString())
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  )

  if (parsedConfig.errors.length > 0) {
    throw new SyntaxError(
      `Promises rejected.\n${parsedConfig.errors
        .map((error) => error.messageText)
        .join('\n')}`
    )
  }

  return {
    compilerOptions: parsedConfig.options,
  }
}

export const getTsConfigPaths = async () => {
  const root = await getWorkspaceRoot()
  const tsconfigPath = path.resolve(root, 'tsconfig.base.json')
  const config = await getTsConfig(tsconfigPath)
  const paths = config.compilerOptions.paths!
  return Object.fromEntries(
    Object.entries(paths).map(([key, value]) => [
      key,
      value.map((pathname) => path.join(root, pathname)),
    ])
  )
}
