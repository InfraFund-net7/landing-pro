import { StaticImageData } from 'next/image';

export interface Project {
  id: number;
  category: string;
  title: string;
  fundingTarget: string;
  projectedReturn: string;
  fundingStatus: number;
  image: StaticImageData | string;
}
