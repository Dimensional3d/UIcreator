export type MicroIllustrationName =
  | 'update-app'
  | 'dollar-large'
  | 'credit-card'
  | 'saving-dollar'
  | 'security';

export type MicroIllustrationOption = {
  value: MicroIllustrationName;
  label: string;
  src: string;
};

export const MICRO_ILLUSTRATION_OPTIONS: MicroIllustrationOption[] = [
  {
    value: 'update-app',
    label: 'Update App',
    src: 'https://www.bbva.mx/content/dam/library/micros/update-app-glass.im1751559639360im.png?imwidth=1176',
  },
  {
    value: 'dollar-large',
    label: 'Dollar Large',
    src: 'https://www.bbva.mx/content/dam/library/micros/dollar-large-glass.im1744217435314im.png?imwidth=1176',
  },
  {
    value: 'credit-card',
    label: 'Credit Card',
    src: 'https://www.bbva.mx/content/dam/library/micros/product-credit-card-glass.im1746789949920im.png?imwidth=1176',
  },
  {
    value: 'saving-dollar',
    label: 'Saving Dollar',
    src: 'https://www.bbva.mx/content/dam/library/micros/saving-dollar-glass.im1747095825266im.png?imwidth=960',
  },
  {
    value: 'security',
    label: 'Security',
    src: 'https://www.bbva.mx/content/dam/library/micros/security-glass.im1749056059319im.png?imwidth=960',
  },
];
