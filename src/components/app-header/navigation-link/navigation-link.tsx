import { ComponentType } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './navigation-link.module.css';
import clsx from 'clsx';

type NavigationLinkProps = {
  Icon: ComponentType<TIconProps>;
  text: string;
  isActive?: boolean;
  className?: string;
};

function NavigationLink({Icon, text, isActive = false, className}: NavigationLinkProps) {
  return (
    <div className={ clsx(styles.Link, {[styles.Active]: isActive}, className) }>
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span>{text}</span>
    </div>
  );
}

export default NavigationLink;