interface QuoteProps {
  quote: string;
  author: string;
  imageUrl?: string;
}

export function Quote({ quote, author, imageUrl }: QuoteProps) {
  return (
    <div>
      <p>{quote}</p>
      <img src={imageUrl} alt="Quote Author" />
      <p>{author}</p>
    </div>
  );
}
