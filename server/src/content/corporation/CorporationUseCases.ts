import type { CharWithUseCases } from '../types'

import { Corporation } from './Corporation'
import { GovernmentGrant } from './useCases/GovernmentGrant'
import { TaxCompliance } from './useCases/TaxCompliance'

export const CorporationUseCases: CharWithUseCases = {
  characterId: Corporation.id,
  useCases: [TaxCompliance,GovernmentGrant],
}
