"use client";
type ErrorProps = { error: Error & { digest?: string }; reset: () => void };
export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main>
      <h3>Something Went Wrong</h3>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </main>
  );
}
