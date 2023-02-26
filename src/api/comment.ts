import type { Comment } from '../utils/types';

/**
 * Mock api calls to bring comment data
 */

export const getComments = async (): Promise<Array<Comment>> => {
  return [
    {
      commentor: 'Kağan Hamzaçebi',
      comment: 'The best quality food was amazing and I love this restaurant.',
      star: 5,
      date: '20/01/2023'
    },
    {
      commentor: 'Michael Smith',
      comment: 'Even the lowest quality ingredients are really good.',
      star: 4.5,
      date: '02/01/2023'
    },
    {
      commentor: 'Angelina Jolie',
      comment: 'I always eat here at weekends.',
      star: 4,
      date: '05/04/2021'
    },
    {
      commentor: 'Haluk Levent',
      comment: 'Selecting my own food feels good.',
      star: 5,
      date: '12/04/2020'
    },
    {
      commentor: 'Hans Zimmer',
      comment: 'Most brilliant idea I have ever seen.',
      star: 5,
      date: '02/02/2020'
    },
    {
      commentor: 'Kağan Hamzaçebi',
      comment: 'The best quality food was amazing and I love this restaurant.',
      star: 5,
      date: '20/01/2023'
    },
    {
      commentor: 'Michael Smith',
      comment: 'Even the lowest quality ingredients are really good.',
      star: 4.5,
      date: '02/01/2023'
    },
    {
      commentor: 'Angelina Jolie',
      comment: 'I always eat here at weekends.',
      star: 4,
      date: '05/04/2021'
    },
    {
      commentor: 'Haluk Levent',
      comment: 'Selecting my own food feels good.',
      star: 5,
      date: '12/04/2020'
    },
    {
      commentor: 'Hans Zimmer',
      comment: 'Most brilliant idea I have ever seen.',
      star: 5,
      date: '02/02/2020'
    },
    {
      commentor: 'Kağan Hamzaçebi',
      comment: 'The best quality food was amazing and I love this restaurant.',
      star: 5,
      date: '20/01/2023'
    },
    {
      commentor: 'Michael Smith',
      comment: 'Even the lowest quality ingredients are really good.',
      star: 4.5,
      date: '02/01/2023'
    },
    {
      commentor: 'Angelina Jolie',
      comment: 'I always eat here at weekends.',
      star: 4,
      date: '05/04/2021'
    },
    {
      commentor: 'Haluk Levent',
      comment: 'Selecting my own food feels good.',
      star: 5,
      date: '12/04/2020'
    },
    {
      commentor: 'Hans Zimmer',
      comment: 'Most brilliant idea I have ever seen.',
      star: 5,
      date: '02/02/2020'
    }
  ];
};