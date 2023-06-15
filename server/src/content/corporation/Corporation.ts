import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Corporation: Character = {
  id: '2',
  image: '/public/businesswoman/building.svg',
  name: 'Unicorn Breeding Corp.',
  type: 'Corporation',
  backstory:
    "Unicorn Breeding Corp., a technology startup, is seeking to apply for a government grant and needs to provide proof of profitability from the Canada Revenue Agency (CRA). Assist them!",
  starterCredentials: [
    {
      id: uuid(),
      name: 'CRA ID Card',
      icon: '/public/businesswoman/reshot-icon-id-card-X5AFGW4HQ6.svg',
      attributes: [
        { name: 'Name', value: 'Joyce Brown' },
        { name: 'Date of birth', value: '19910104' },
        { name: 'Street', value: 'Main Road 207' },
        { name: 'City', value: 'Ottawa' },
        { name: 'Nationality', value: 'Canada' },
      ],
    },
    //Removing the Credit card as CRA does not issue Credit Cards
    {
      id: uuid(),
      name: 'Business Card',
      icon: '/public/businesswoman/icon-creditcard.png',
      attributes: [
        { name: 'Company Name', value: 'Unicorn Breeding Corp.' },
        { name: 'Business Number', value: '123456789' },
      ],
    },
  ],
}
