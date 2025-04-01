import styles from "./button.module.css";

interface ButtonProps {
  title: string;
  image: string;
  alt: string;
  width?: string;
  height?: string;
  ariaExpanded?: boolean;
}

export function Button({
  title,
  image,
  alt,
  width,
  height,
  ariaExpanded,
}: ButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={ariaExpanded}
      className={styles.button}
    >
      {title}
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </button>
  );
}
