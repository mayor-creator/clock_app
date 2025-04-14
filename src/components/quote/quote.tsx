import { useState, useEffect } from "react";
import styles from "./quote.module.css";
import refreshIcon from "../../assets/images/desktop/icon-refresh.svg";

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

interface RequestOptions extends RequestInit {
  method: "GET";
  redirect: "follow";
}

interface QuoteResponse {
  _id: string;
  content: string;
  author: string;
  length: number;
}

const fetchQuote = async (): Promise<QuoteResponse> => {
  const requestOptions: RequestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.quotable.io/random",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: QuoteResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};

export function Quote() {
  const [quote, setQuote] = useState<QuoteProps>(DEFAULT_QUOTE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getQuote = async () => {
    try {
      setIsLoading(true);
      const data = await fetchQuote();
      setQuote(data);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote(DEFAULT_QUOTE);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <section className={styles.quoteSection}>
      <div className={styles.quoteContent}>
        <p className={`${styles.quote} ${isLoading ? styles.loading : ''}`}>
          "{quote.content}"
        </p>
        <p className={`${styles.author} ${isLoading ? styles.loading : ''}`}>
          {quote.author}
        </p>
      </div>
      <button 
        className={styles.refreshButton} 
        onClick={getQuote}
        disabled={isLoading}
        aria-label="Refresh quote"
      >
        <img 
          src={refreshIcon} 
          alt="Refresh" 
          className={isLoading ? styles.rotating : ''}
        />
      </button>
    </section>
  );
}
