import { Experience } from '~/types';
import { monthWithYear } from '~/utils/date-utils';

export const Experiences: Experience[] = [
  {
    employer: 'Journeyfront',
    title: 'Full Stack Developer',
    startDate: monthWithYear(new Date(2024, 5, 3)),
    summary: [
      'Designed and implemented AI integration pipelines for scoring candidate responses across text, video, and audio formats, ensuring consistent evaluation metrics.',
      'Implementing a Model Context Protocol (MCP) server to enable standardized communication between AI models and client applications, improving extensibility and integration capabilities.',
      'Wrote a fully type-safe Python SDK from scratch that wrapped complex API calls into clean, single-line functions, leveraging Pydantic models for strict data validation and cutting integration time from days to hours.',
      'Led migration from legacy Vue 2 codebase to Vue 3 using Nuxt.js, improving performance, maintainability, and developer experience.',
      'Collaborated with cross-functional teams, including designers and product managers, to implement new features, troubleshoot issues, and optimize the overall functionality of the products.',
      'Refactored legacy code, optimizing performance and ensuring maintainability',
    ],
  },
  {
    employer: 'Innovature Labs',
    title: 'Software Engineer',
    startDate: monthWithYear(new Date(2022, 7, 8)),
    endDate: monthWithYear(new Date(2024, 4, 31)),
    summary: [
      'Designed and developed multiple web applications from the ground up.',
      'Architected database schema and project structure. Designed RabbitMQ message brokering topology and configured exchanges, queues, and bindings for high-volume events.',
      'Migrated legacy applications in React to Next.js, reducing code by 55%',
      'Mentored junior engineers, conducting code reviews and pairing sessions.',
    ],
  },
];
