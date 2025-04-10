import { useState, useEffect } from "react";

interface QuoteProps {
  _id: string;
  content: string;
  author: string;
  length: number;
}

const DEFAULT_QUOTE = {
  _id: "default",
  content:
    "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.",
  author: "Ada Lovelace",
  length: 1,
};

export function Quote() {
  const [quote, setQuote] = useState<QuoteProps>(DEFAULT_QUOTE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuote(data);
      } catch (err) {
        console.error("Failed to fetch quote:", err);
        setQuote(DEFAULT_QUOTE);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>"{quote.content}"</p>
      <p>{quote.author}</p>
    </div>
  );
}
