import { program } from 'commander'
import { errorAndExit } from '@element-plus-next/node-utils'
import { build } from '@element-plus-next/build'
import { version } from '../package.json'
import { dts } from './dts'

program.name('Element Plus Build CLI').version(version)

program
  .command('build [packageName]')
  .description('build package')
  .action(() => build().catch((err) => errorAndExit(err)))

program
  .command('dts [packageName]')
  .description('build dts')
  .action(() => dts().catch((err) => errorAndExit(err)))

program.parse(process.argv)
