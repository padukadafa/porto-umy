"use client"
import React from 'react';
import Link from 'next/link';
import { Plus, FolderOpen, Settings } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const DashboardHome: React.FC = () => {
  const { data: projects } = useSWR('/api/projects', fetcher);
  const projectCount = projects?.length || 0;

  const menuItems = [
    {
      title: 'Tambah Proyek Baru',
      description: 'Buat proyek baru untuk memamerkan karya Anda',
      icon: Plus,
      href: '/dashboard/projects/add',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Kelola Proyek',
      description: 'Lihat dan edit proyek yang ada',
      icon: FolderOpen,
      href: '/dashboard/projects',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Pengaturan',
      description: 'Konfigurasi pengaturan portofolio Anda',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'from-gray-500 to-gray-700'
    }
  ];  return (
    <div className="pt-8 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Portfolio Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage your portfolio content, add new projects, and update your information.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    <span>Go to {item.title.toLowerCase()}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pb-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Cepat</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{projectCount}</div>
                <p className="text-gray-600">Total Proyek</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{projects?.filter((p: any) => p.published).length || 0}</div>
                <p className="text-gray-600">Proyek yang Diterbitkan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHome;