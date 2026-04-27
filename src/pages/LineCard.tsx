import { useEffect, useState } from 'react';

const LINE_CARD_PDF_SRC = '/line-card.pdf';

export default function LineCard() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    // Open once when the user clicks Line Card and lands on this page.
    setIsPdfOpen(true);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pt-12 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 sm:text-3xl">Line Card</h1>
        <p className="mt-2 text-sm font-medium text-zinc-600 sm:text-base">
          Upload your PDF to <code>public/line-card.pdf</code>. Click below to open it.
        </p>
      </header>

      <button
        type="button"
        onClick={() => setIsPdfOpen(true)}
        className="inline-flex rounded-lg bg-industrial-orange px-4 py-2 text-sm font-black uppercase tracking-wide text-white transition hover:brightness-95"
      >
        Open Line Card PDF
      </button>

      {isPdfOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4">
          <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <h2 className="text-sm font-black uppercase tracking-wide text-zinc-800">Line Card PDF</h2>
              <div className="flex items-center gap-2">
                <a
                  href={LINE_CARD_PDF_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-bold uppercase text-zinc-700 transition hover:bg-zinc-100"
                >
                  Open New Tab
                </a>
                <button
                  type="button"
                  onClick={() => setIsPdfOpen(false)}
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-bold uppercase text-zinc-700 transition hover:bg-zinc-100"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              title="Line Card PDF"
              src={LINE_CARD_PDF_SRC}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}

