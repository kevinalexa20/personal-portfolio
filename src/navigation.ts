import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Resume', href: getPermalink('/#resume') },
    { text: 'Portfolio', href: getPermalink('/#portfolio') },
    { text: 'Contact', href: getPermalink('/contact') },
    { text: 'Github', href: 'https://github.com/kevinalexa20' },
  ],
  actions: [{ text: 'Hire me', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/kevinalexa20' },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: 'mailto:alexandrokev09@gmail.com' },
  ],
  footNote: '',
};
