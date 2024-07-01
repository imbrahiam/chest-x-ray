import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'SIC',
    description: 'Samsung Innovation Campus Project',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'home',
        label: 'Home',
        href: '',
      },
      {
        id: 'upload_',
        label: 'Upload',
        href: '',
      },
      {
        id: 'highlights',
        label: 'Highlights',
        href: '',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link target='_blank' href="https://github.com/imbrahiam/Helix">Helix Team</Link>
      </>
    ),
    links: [
      {
        href: 'mailto:20222034@itla.edu.do',
        label: 'Contact',
      },
      // {
      //   href: 'https://twitter.com/saas_js',
      //   label: <FaTwitter size="14" />,
      // },
      {
        href: 'https://github.com/imbrahiam/Helix',
        label: <FaGithub size="14" />,
      },
    ],
  }
}

export default siteConfig
