"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-8 flex text-base flex-1 gap-4 justify-center items-center flex-col">
      <h2>Oops, something went wrong!</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          className="rounded-md border border-neutral-500 bg-transparent px-3 py-1.5 text-neutral-100 hover:bg-neutral-800"
          onClick={() => reset()}
        >
          try again
        </button>
        <p>or</p>
        <button
          className="rounded-md border border-neutral-500 bg-transparent px-3 py-1.5 text-neutral-100 hover:bg-neutral-800"
          onClick={() => router.back()}
        >
          go back
        </button>
      </div>
    </div>
  );
}
