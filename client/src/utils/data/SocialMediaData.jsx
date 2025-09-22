// Icons
import { FaFacebookF, FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
// Constants
import {
  FACEBOOK_URL,
  GITHUB_URL,
  GOOGLE_URL,
  INSTAGRAM_URL,
} from '../../utils/Constants';

export const socialMediaLinks = [
  {
    serviceName: 'Facebook',
    icon: <FaFacebookF size={24} />,
    url: FACEBOOK_URL,
    ariaLabel: 'Open Fetlife profile in a new tab',
    title: 'Fetlife',
  },
  {
    serviceName: 'Instagram',
    icon: <FaInstagram size={24} />,
    url: INSTAGRAM_URL,
    ariaLabel: 'Open Fetlife profile in a new tab',
    title: 'Fetlife',
  },
  {
    serviceName: 'Google',
    icon: <FaGoogle size={24} />,
    url: GOOGLE_URL,
    ariaLabel: 'Open Fetlife profile in a new tab',
    title: 'Fetlife',
  },
  {
    serviceName: 'GitHub',
    icon: <FaGithub size={24} />,
    url: GITHUB_URL,
    ariaLabel: 'Open Fetlife profile in a new tab',
    title: 'Fetlife',
  },
];
