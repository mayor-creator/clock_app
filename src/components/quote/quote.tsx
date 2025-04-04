import { useState, useEffect } from "react";

interface QuoteProps {
  _id: string;
  content: string;
  author: string;
  length: number;
}

export function Quote() {
  const [quote, setQuote] = useState<QuoteProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api.quotable.io/random", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result: QuoteProps) => {
        setQuote(result);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "An error occurred.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (quote) {
    return (
      <div>
        <p>"{quote.content}"</p>
        <p>- {quote.author}</p>
      </div>
    );
  }

  return null;
}
