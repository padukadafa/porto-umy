"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SocialMediaDashboard: React.FC = () => {
  const { data: socials, error, mutate } = useSWR('/api/socials', fetcher);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social media link?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/socials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutate(); // Refresh the data
      } else {
        alert('Failed to delete social media link');
      }
    } catch (error) {
      console.error('Error deleting social media:', error);
      alert('Failed to delete social media link');
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Failed to load social media links</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="pt-8 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent">
                Social Media
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Manage your social media links and profiles
            </p>
          </div>
          <Link
            href="/dashboard/socials/add"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Social Link
          </Link>
        </div>

        {/* Social Media Grid */}
        <div className="pb-20">
          {!socials || socials.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Social Media Links</h3>
                <p className="text-gray-600 mb-8">Get started by adding your first social media link</p>
                <Link
                  href="/dashboard/socials/add"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Social Link
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socials.map((social: any) => (
                <div
                  key={social.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {social.icon && (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {social.icon}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{social.name}</h3>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          {social.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Link
                      href={`/dashboard/socials/${social.id}/edit`}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(social.id)}
                      disabled={deletingId === social.id}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deletingId === social.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;
