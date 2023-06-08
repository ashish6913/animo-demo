import type { CharWithUseCases } from '../types'

import { BusinessWoman } from './BusinessWoman'
import { AirTravel } from './useCases/Airtravel'
import { Conference } from './useCases/Conference'
import { GovernmentGrant } from './useCases/GovernmentGrant'
import { Hotel } from './useCases/Hotel'
import { TaxCompliance } from './useCases/TaxCompliance'

export const BusinessWomanUseCases: CharWithUseCases = {
  characterId: BusinessWoman.id,
  useCases: [TaxCompliance,GovernmentGrant,Conference, Hotel, AirTravel],
}
