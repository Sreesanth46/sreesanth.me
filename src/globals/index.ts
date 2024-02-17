import Github from '~/icons/Github.vue';
import Linkedin from '~/icons/Linkedin.vue';
import LightBulbOutlined from '~/icons/LightBulbOutlined.vue';
import { h } from 'vue';
import CvOutlinedIcon from '~/icons/CvOutlinedIcon.vue';

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
    h('p', { class: 'hidden sm:block' }, [props.label])
  ]);

export const Links = {
  Github: 'https://github.com/Sreesanth46',
  Linkedin: 'https://www.linkedin.com/in/Sreesanth46',
  Instagram: 'https://www.instagram.com/Sreesanth.sh'
};

export const NavbarLinks: INavLink[] = [
  {
    label: 'Projects',
    icon: ResponsiveLabel({ icon: LightBulbOutlined, label: 'Projects' }),
    to: 'Projects'
  },
  {
    label: 'Resume',
    icon: CvOutlinedIcon,
    to: 'Resume'
  },
  {
    label: 'Github',
    icon: Github,
    to: Links.Github
  },
  {
    label: 'Linkedin',
    icon: Linkedin,
    to: Links.Linkedin
  }
];

export const FindMeLinks = [
  {
    label: 'Github',
    link: Links.Github,
    icons: {
      outlined: Github,
      solid: ''
    }
  },
  {
    label: 'LinkedIn',
    link: Links.Linkedin,
    icons: {
      outlined: Linkedin,
      solid: ''
    }
  }
];

const ProjectLinks = {
  VueTable: 'https://github.com/Sreesanth46/vue-table'
};

export const ProjectList = [
  {
    title: 'Vue Table',
    description: 'A declarative table component',
    link: ProjectLinks.VueTable,
    icon: Github
  }
];
