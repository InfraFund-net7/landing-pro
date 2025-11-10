import { Project } from '@/types/types';
import First_project from '@/../public/image/project1.jpg';
import Second_project from '@/../public/image/project2.jpg';
import Third_project from '@/../public/image/project3.png';
export const projects: Project[] = [
  {
    id: 1,
    category: 'Solar Energy',
    title: 'Solar Home California, USA',
    fundingTarget: '$18M',
    projectedReturn: '6.5%',
    fundingStatus: 68,
    image: First_project,
  },
  {
    id: 2,
    category: 'Wind Energy',
    title: 'North Sea Wind Farm, Denmark',
    fundingTarget: '$25M',
    projectedReturn: '7%',
    fundingStatus: 52,
    image: Second_project,
  },
  {
    id: 3,
    category: 'Solar Energy',
    title: 'Solar Rooftops, UK',
    fundingTarget: '$15M',
    projectedReturn: '6.2%',
    fundingStatus: 62,
    image: Third_project,
  },
];
