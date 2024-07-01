import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export type ButtonLinkProps = ButtonProps & { href: string; target?: string };

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  target,
  ...props
}) => {
  return (
    <Button as="a" href={href} target={target} {...props}>
      {children}
    </Button>
  );
};
