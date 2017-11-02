import streamParser, {createStreamParser} from './streamParser'
import writeToConsole from './writeToConsole'

export {
  streamParser,
  createStreamParser,
  writeToConsole,
}

import bole = require('bole')

bole.setFastTime()

const baseLogger = bole('pnpm')

export default baseLogger

export const deprecationLogger = baseLogger('deprecation') as Logger<DeprecationMessage>
export const rootLogger = baseLogger('root') as Logger<RootMessage>
export const installCheckLogger = baseLogger('install-check') as Logger<InstallCheckMessage>
export const progressLogger = baseLogger('progress') as Logger<ProgressMessage>
export const lifecycleLogger = baseLogger('lifecycle') as Logger<LifecycleMessage>
export const stageLogger = baseLogger('stage') as Logger<'resolution_done'>
export const summaryLogger = baseLogger('summary') as Logger<void>

export type LifecycleMessage = {
  pkgId: string,
  script: string,
} & ({
  line: string,
} | {
  exitCode: number,
})

export type ProgressMessage = {
  pkgId: string,
  status: 'fetched' | 'installed' | 'dependencies_installed' | 'found_in_store' | 'resolving_content',
} | {
  pkgId: string,
  pkg: LoggedPkg,
  status: 'resolved',
} | {
  pkg: LoggedPkg,
  status: 'resolving' | 'error' | 'installing',
} | {
  pkgId: string,
  status: 'fetching_started',
  size: number | null,
  attempt: number,
} | {
  pkgId: string,
  status: 'fetching_progress',
  downloaded: number,
} | {
  status: 'downloaded_manifest',
  pkgId: string,
  pkgVersion: string,
}

export interface InstallCheckMessage {
  code: string,
  pkgId: string,
}

export interface LogBase {
  level: 'debug' | 'info' | 'warn' | 'error',
}

export interface DeprecationMessage {
  pkgName: string,
  pkgVersion: string,
  pkgId: string,
  deprecated: string,
  depth: number,
}

export type DependencyType = 'prod' | 'dev' | 'optional'

export type RootMessage = {
  added: {
    name: string,
    version: string,
    dependencyType: DependencyType,
  },
} | {
  removed: {
    name: string,
    version?: string,
    dependencyType: DependencyType,
  },
}

export interface StandardMessage {message: string}

export type ProgressLog = {name: 'pnpm:progress'} & LogBase & ProgressMessage

export type LifecycleLog = {name: 'pnpm:lifecycle'} & LogBase & LifecycleMessage

export type InstallCheckLog = {name: 'pnpm:install-check'} & LogBase & InstallCheckMessage

export type DeprecationLog = {name: 'pnpm:deprecation'} & LogBase & DeprecationMessage

export type StageLog = {name: 'pnpm:stage'} & LogBase & {message: 'resolution_done'}

export type RegistryLog = {name: 'pnpm:registry'} & LogBase & StandardMessage

export type RootLog = {name: 'pnpm:root'} & LogBase & RootMessage

export type SummaryLog = {name: 'pnpm:summary'} & LogBase

export type Log = ProgressLog
  | LifecycleLog
  | InstallCheckLog
  | DeprecationLog
  | StageLog
  | RegistryLog
  | RootLog
  | SummaryLog
  | ({name: 'pnpm'} & LogBase)

export interface LoggedPkg {
  rawSpec: string,
  name: string,
  dependentId?: string,
}

export interface Logger<T> {
  debug: (log: T) => void,
  info: (log: T) => void,
  warn: (log: T) => void,
  error: (log: T) => void,
}
