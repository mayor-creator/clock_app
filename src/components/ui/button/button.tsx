import styles from "./button.module.css";

interface ButtonProps {
  title: string;
  ariaExpanded?: boolean;
  onClick: () => void;
  imageUrl: string;
}

export function Button({
  title,
  ariaExpanded,
  onClick,
  imageUrl,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
      aria-expanded={ariaExpanded}
    >
      {title}
      <img src={imageUrl} alt="arrow icon" height={24} width={24} />
    </button>
  );
}
