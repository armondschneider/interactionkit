type Props = {
    verifyPassword: (password: string) => boolean;
    label?: string;
    placeholder?: string;
    submitLabel?: string;
    errorMessage?: string;
    className?: string;
};
export default function PasswordInput({ verifyPassword, label, placeholder, submitLabel, errorMessage, className, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
