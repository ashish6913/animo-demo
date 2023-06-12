import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const BusinessWoman: Character = {
  id: '2',
  image: '/public/businesswoman/building.svg',
  name: 'Joyce',
  type: 'Businesswoman',
  backstory:
    "Joyce is on her way to the top! She's the CEO of a fortune 500 company and is always working around the clock to keep business going, join her in her endeavor!",
  starterCredentials: [
    {
      id: uuid(),
      name: 'CRA ID Card',
      icon: '/public/businesswoman/reshot-icon-id-card-X5AFGW4HQ6.svg',
      attributes: [
        { name: 'Name', value: 'Joyce Brown' },
        { name: 'Date of birth', value: '19910104' },
        { name: 'Street', value: 'Main Road 207' },
        { name: 'City', value: 'New York' },
        { name: 'Nationality', value: 'United States of America' },
      ],
    },
    //Removing the Credit card as CRA does not issue Credit Cards
    {
      id: uuid(),
      name: 'Business Card',
      icon: '/public/businesswoman/icon-creditcard.png',
      attributes: [
        { name: 'Company Name', value: 'ABC Corporation Limited' },
        { name: 'Business Number', value: '123456789' },
      ],
    },
  ],
}
