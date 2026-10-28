// Title + intro at the top of each inner page.
export default function PageHeader({ title, intro }) {
  return (
    <div className="mb-12 text-center">
      <h1 className="page-title">{title}</h1>
      <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-jc-orange to-jc-blue" />
      {intro && <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-300">{intro}</p>}
    </div>
  );
}
