import type { Character } from '../types'

import { v4 as uuid } from 'uuid'

export const Student: Character = {
  id: '1',
  image: '/public/student/student.svg',
  name: 'Jan',
  type: 'Student',
  backstory:
    'Jan is feeling great! He just got into law school and is ready to experience everything that student life has to offer. Help him navigate the experience!',
  starterCredentials: [
    {
      id: uuid(),
      name: 'CRA ID Card',
      icon: '/public/cra-id.svg',
      attributes: [
        { name: 'Name', value: 'Jan van Dalen' },
        { name: 'Date of birth', value: '19950210' },
        { name: 'Street', value: '875 Heron Road' },
        { name: 'City', value: 'Ottawa' },
        { name: 'Nationality', value: 'Canada' },
      ],
    },
  ],
}
