import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};
export declare const Button: import('react').ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string> & {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & import('react').RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map