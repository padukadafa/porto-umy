import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProjectsManager() {
  const { data: projects, mutate } = useSWR('/api/projects', fetcher);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '', link: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', imageUrl: '', link: '' });
    setLoading(false);
    mutate();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30">
        <h2 className="font-extrabold text-2xl mb-2 text-blue-900/90">Tambah Project</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Judul" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="URL Gambar" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Link Project" className="w-full p-3 border-none rounded-lg bg-white/60 focus:ring-2 focus:ring-blue-400 text-gray-900" required />
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-bold shadow transition disabled:opacity-60" disabled={loading}>{loading ? 'Menyimpan...' : 'Tambah'}</button>
      </form>
      <div>
        <h2 className="font-extrabold text-2xl mb-6 text-blue-900/90">Daftar Project</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {projects?.map((p: any) => (
            <div key={p.id} className="bg-white/30 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg flex flex-col gap-4 items-center p-6 hover:scale-[1.03] transition-transform">
              <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover rounded-xl shadow mb-2" />
              <div className="flex-1 w-full text-center">
                <h3 className="font-bold text-xl text-blue-900/90 mb-1">{p.title}</h3>
                <p className="text-gray-700 mb-2">{p.description}</p>
                <a href={p.link} target="_blank" className="inline-block text-blue-700 hover:underline font-semibold">Lihat Project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
