import { program } from 'commander'
import { errorAndExit } from '@element-plus/build-utils'
import { version } from '../package.json'
import { build } from './build'

program.name('Element Plus Build CLI').version(version)

program
  .command('build [packageName]')
  .description('build package')
  .action(() => build().catch((err) => errorAndExit(err)))

program.parse(process.argv)
