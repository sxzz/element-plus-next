import { program } from 'commander'
import { errorAndExit } from '@element-plus-next/node-utils'
import { build } from '@element-plus-next/build'
import { version } from '../package.json'

program.name('Element Plus Build CLI').version(version)

program
  .command('build [packageName]')
  .description('build package')
  .action((name: string) => build(name).catch((err) => errorAndExit(err)))

program.parse(process.argv)

export * from '@element-plus-next/build'
