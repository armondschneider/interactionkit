export type FeedbackRating = "up" | "down";
export type FeedbackMorphValue = {
    rating: FeedbackRating;
    response: string;
};
type Props = {
    onFeedback?: (value: FeedbackMorphValue) => void;
    upPlaceholder?: string;
    downPlaceholder?: string;
    thanksMessage?: string;
    className?: string;
};
export default function FeedbackMorph({ onFeedback, upPlaceholder, downPlaceholder, thanksMessage, className, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
