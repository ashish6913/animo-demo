import type { CharWithUseCases } from '../types'

import { Citizen } from './Citizen'
import { Club } from './useCases/Club'
import { MorgageLoan } from './useCases/MorgageLoan'
import { School } from './useCases/School'
import { Sport } from './useCases/Sport'
import { Noa } from './useCases/noa'

export const CitizenUseCases: CharWithUseCases = {
  characterId: Citizen.id,
  useCases: [Noa,MorgageLoan]
}
