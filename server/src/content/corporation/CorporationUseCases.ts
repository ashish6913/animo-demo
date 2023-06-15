import type { CharWithUseCases } from '../types'

import { Corporation } from './Corporation'
import { AirTravel } from './useCases/Airtravel'
import { Conference } from './useCases/Conference'
import { GovernmentGrant } from './useCases/GovernmentGrant'
import { Hotel } from './useCases/Hotel'
import { TaxCompliance } from './useCases/TaxCompliance'

export const CorporationUseCases: CharWithUseCases = {
  characterId: Corporation.id,
  useCases: [TaxCompliance,GovernmentGrant],
}
