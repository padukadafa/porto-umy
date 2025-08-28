import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SocialsManager() {
  const { data: socials, mutate } = useSWR('/api/socials', fetcher);
  const [form, setForm] = useState({ name: '', url: '', icon: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/socials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', url: '', icon: '' });
    setLoading(false);
    mutate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30">
        <h2 className="font-extrabold text-2xl mb-2 text-blue-900/90">Tambah Social Media</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <input name="icon" value={form.icon} onChange={handleChange} placeholder="Icon (misal: fa-brands fa-twitter)" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow transition disabled:opacity-60" disabled={loading}>{loading ? 'Menyimpan...' : 'Tambah'}</button>
      </form>
      <div>
        <h2 className="font-extrabold text-2xl mb-6 text-blue-900/90">Daftar Social Media</h2>
        <div className="grid gap-6 grid-cols-1">
          {socials?.map((s: any) => (
            <div key={s.id} className="bg-white/30 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg flex items-center gap-6 p-6 hover:scale-[1.03] transition-transform">
              <i className={s.icon + " text-3xl text-blue-700 drop-shadow"}></i>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-blue-900/90">{s.name}</h3>
                <a href={s.url} target="_blank" className="text-blue-700 hover:underline font-semibold">{s.url}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
