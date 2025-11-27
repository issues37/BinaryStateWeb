import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 flex flex-col items-start justify-center">
      <h1 className="text-4xl mb-4">ERROR 404</h1>
      <p className="text-xl mb-8">The requested sector has not been found in the memory banks.</p>
      <Link href="/">
        <a className="text-white underline decoration-dotted hover:decoration-solid text-xl">
          &gt; Return to terminal
        </a>
      </Link>
    </div>
  );
}
