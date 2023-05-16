import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

export type ButtonProps = {
  color?:
    | 'primary'
    | 'secondary'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-light';
  children: React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button(props: ButtonProps) {
  const { type = 'button', color = 'light', children, ...rest } = props;

  const rootStyle = classnames('app-c-button btn', {
    [`btn-${color}`]: Boolean(color),
  });

  return (
    <button className={rootStyle} type={type} {...rest}>
      {children}
    </button>
  );
}
