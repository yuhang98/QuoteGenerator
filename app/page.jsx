'use client';
import React from 'react';
export default function Home() {
  const [data, setData] = React.useState(null);

  async function updateQuote() {
    try {
      const response = await fetch(
        'https://api.quotable.io/random?tags=technology,famous-quotes'
      );
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: 'Opps... Something went wrong' });
    }
  }

  // Run `updateQuote` once when component mounts
  React.useEffect(() => {
    updateQuote();
  }, []);

  // Do not render until the first quote is loaded
  if (!data) return null;
  const date = new Date().toJSON().slice(0, 10);
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  // const currentDate = `${day}-${month}-${day}`;
  return (
    <div
      style={{
        margin: 'auto',
        width: '50%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '10px',
        fontFamily: 'Inter, san-serif',
      }}
    >
      <h1>Quote Generator</h1>
      <h2>By Yu Hang Lee</h2>
      <p>{data.content}</p>
      {data.author && <p>{data.author}</p>}

      <button variant="primary" onClick={updateQuote}>
        New Quote
      </button>
      <p>Current date: {date}</p>
    </div>
  );
}
