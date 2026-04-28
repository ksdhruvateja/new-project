const LINE_CARD_PDF_SRC = '/line-card.pdf';

export default function LineCard() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
      <header className="mb-4 flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 sm:text-3xl">Line Card</h1>
          <p className="mt-1 text-xs font-medium text-zinc-500 sm:text-sm">
            PDF is shown below. Use download to save a copy.
          </p>
        </div>
        <a
          href={LINE_CARD_PDF_SRC}
          download="Forez-Line-Card.pdf"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border-2 border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-zinc-800"
        >
          Download PDF
        </a>
      </header>

      <div className="min-h-0 w-full flex-1 overflow-hidden rounded-lg border-2 border-zinc-200 bg-zinc-100 shadow-inner">
        <iframe
          title="Forez line card PDF"
          src={LINE_CARD_PDF_SRC}
          className="block h-[min(85vh,900px)] w-full sm:h-[min(88vh,920px)]"
        />
      </div>
    </section>
  );
}
