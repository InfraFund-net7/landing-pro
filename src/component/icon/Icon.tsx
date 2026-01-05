import Invest from './components/Invest';
import Join from './components/Join';
import Manage from './components/Manage';
import RaiseFund from './components/RaiseFund';
import { Id } from './types';

export const Icon = ({
  styles = {},
  className = '',
  id,
}: {
  styles?: React.CSSProperties;
  className?: string;
  id: Id;
}) => {
  const iconsObject: Record<Id, React.ReactNode> = {
    manage: <Manage styles={styles} className={className} />, // Manage icons
    invest: <Invest styles={styles} className={className} />,
    raiseFund: <RaiseFund styles={styles} className={className} />,
    join: <Join styles={styles} className={className} />,
  };

  return <>{iconsObject[id]}</>;
};
