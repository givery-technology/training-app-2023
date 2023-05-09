import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';
import classnames from 'classnames';

export type LabelProps = {
  text?: React.ReactNode;
  children: React.ReactNode;
} & DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export function Label(props: LabelProps) {
  const { text, children, ...rest } = props;

  const rootStyle = classnames('app-c-label form-label', {});

  return (
    <label className={rootStyle} {...rest}>
      {text}
      {children}
    </label>
  );
}
