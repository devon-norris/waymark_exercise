import { StateCode } from './types'

export const STATE_MAP: Record<StateCode, { name: string; code: StateCode }> = {
  TN: { name: 'Tennessee', code: 'TN' },
  WA: { name: 'Washington', code: 'WA' },
  MD: { name: 'Maryland', code: 'MD' },
  OH: { name: 'Ohio', code: 'OH' },
  FL: { name: 'Florida', code: 'FL' },
  AZ: { name: 'Arizona', code: 'AZ' },
  WI: { name: 'Wisconsin', code: 'WI' },
  RI: { name: 'Rhode Island', code: 'RI' },
  GA: { name: 'Georgia', code: 'GA' },
  KY: { name: 'Kentucky', code: 'KY' },
}

export const MAX_STATES_SHOWN = 5

export const ROLLING_AVG_DAYS = 7

export const CHART_HEIGHT = 325
