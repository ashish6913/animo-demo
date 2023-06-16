import type { CharWithUseCases } from './types'

import { CorporationUseCases } from './corporation/CorporationUseCases'
import { CitizenUseCases } from './citizen/CitizenUseCases'

const useCases: CharWithUseCases[] = [CitizenUseCases, CorporationUseCases,]

export default useCases
