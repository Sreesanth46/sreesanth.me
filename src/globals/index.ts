import { h } from 'vue';
import Github from '~/icons/Github.vue';
import Linkedin from '~/icons/Linkedin.vue';
import LightBulbOutlined from '~/icons/LightBulbOutlined.vue';
import CvOutlinedIcon from '~/icons/CvOutlinedIcon.vue';
import ArticleOutlined from '~/icons/ArticleOutlined.vue';

interface IResponsiveLabelProp {
  label: string;
  icon: object;
}

interface INavLink extends IResponsiveLabelProp {
  to: string;
}

const ResponsiveLabel = (props: IResponsiveLabelProp) =>
  h('div', [
    h(props.icon, { class: 'sm:hidden' }),
    h('p', { class: 'hidden sm:block' }, [props.label]),
  ]);

export const Links = {
  Github: 'https://github.com/Sreesanth46',
  Linkedin: 'https://www.linkedin.com/in/Sreesanth46',
  Instagram: 'https://www.instagram.com/Sreesanth.sh',
};

const ProjectLinks = {
  VueTable: {
    github: 'https://github.com/Sreesanth46/vue-table',
    live: 'https://www.npmjs.com/package/@harv46/vue-table',
  },
  sh: {
    github: 'https://github.com/Sreesanth46/sreesanth.me',
    live: '',
  },
  TypeRush: {
    github: 'https://github.com/Sreesanth46/VueTypeRush',
    live: 'https://sreesanth46.github.io/VueTypeRush/',
  },
};

export const NavbarLinks: INavLink[] = [
  {
    label: 'Blogs',
    icon: ResponsiveLabel({ icon: ArticleOutlined, label: 'Blogs' }),
    to: 'Blogs',
  },
  {
    label: 'Projects',
    icon: ResponsiveLabel({ icon: LightBulbOutlined, label: 'Projects' }),
    to: 'Projects',
  },
  {
    label: 'Resume',
    icon: CvOutlinedIcon,
    to: 'Resume',
  },
  {
    label: 'Github',
    icon: Github,
    to: Links.Github,
  },
  {
    label: 'Linkedin',
    icon: Linkedin,
    to: Links.Linkedin,
  },
];

export const FindMeLinks = [
  {
    label: 'Github',
    link: Links.Github,
    icons: {
      outlined: Github,
      solid: '',
    },
  },
  {
    label: 'LinkedIn',
    link: Links.Linkedin,
    icons: {
      outlined: Linkedin,
      solid: '',
    },
  },
];

export const ProjectList = [
  {
    title: 'Vue Table',
    description: 'A declarative table component with pagination component.',
    icon: Github,
    ...ProjectLinks.VueTable,
  },
  {
    title: 'Vue Type Rush',
    description:
      'A fun typing test game that keeps you engaged by recalculating your speed and accuracy after each round, adjusting the timer to match your performance.',
    icon: Github,
    ...ProjectLinks.TypeRush,
  },
  {
    title: '.sh',
    description: 'My portfolio website',
    icon: Github,
    ...ProjectLinks.sh,
  },
];
