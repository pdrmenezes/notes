"use client";
import { createFile } from "../data/files";

export async function action({ request, params }: any) {
  // const file = await createFile(data);
  await createFile(request.body);
}

export function Search() {
  return (
    <>
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </form>
      <form method="post">
        <button className="bg-white" type="submit">
          New
        </button>
      </form>
    </>
  );
}
