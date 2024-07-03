import { Experience } from "~/types";
import Resume from "./Resume.vue";

export default Resume;

const formatDate = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];

  return `${month} ${year}`;
};

export const Experiences: Experience[] = [
  {
    employer: "JourneyFront",
    title: "Full Stack Developer",
    startDate: formatDate(new Date(2024, 5, 3)),
    summary: [],
  },
  {
    employer: "Innovature Labs",
    title: "Software Engineer",
    startDate: formatDate(new Date(2022, 7, 8)),
    endDate: formatDate(new Date(2024, 4, 31)),
    summary: [
      "Design and developed full-stack web applications",
      "Architected database schema and project structure. Designed RabbitMQ message brokering topology and configured exchanges, queues, bindings for high volume events.",
      "Migrated legacy applications in React to Next.js, reducing code by 55%",
      "Mentored junior engineers, conducting code reviews and pairing sessions.",
    ],
  },
];
