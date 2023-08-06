'use client';
export function Cron() {
  const handleClick = () => {
    fetch('/api/cron').then((r) => {
      r.json().then((r) => {
        console.log(r);
      });
    });
  };
  return (
    <button className="p-1 rounded-md" onClick={handleClick}>
      cron
    </button>
  );
}
