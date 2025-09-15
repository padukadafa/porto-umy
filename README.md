# 🌟 Porto UMY - Portfolio Website Modern & Interaktif

Portfolio website yang dikembangkan dengan Next.js 15, React 19, dan teknologi web modern lainnya. Menampilkan desain yang elegan dengan efek 3D menggunakan Spline, animasi interaktif, dan sistem manajemen konten yang lengkap.

## ✨ Demo Live

🔗 **[Lihat Portfolio Live](https://www.umyafifah.com/)**

> Jalankan proyek secara lokal untuk melihat semua fitur interaktif

## � Preview Screenshots

### 🏠 Homepage dengan 3D Scene

<div align="center">
  <img src="./screenshots/screenshot_1.png" alt="Homepage Portfolio - 3D Interactive Scene" width="800"/>
  <p><em>Homepage dengan Spline 3D scene interaktif, animasi partikel, dan design modern</em></p>
</div>

<!-- Uncomment ketika screenshot lain tersedia -->
<!--
### 📱 Mobile Responsive View
<div align="center">
  <img src="./screenshots/mobile-view.png" alt="Mobile Responsive Design" width="300"/>
  <p><em>Design responsive yang optimal untuk semua device</em></p>
</div>

### ⚡ Dashboard Management
<div align="center">
  <img src="./screenshots/dashboard.png" alt="Admin Dashboard" width="800"/>
  <p><em>Dashboard admin untuk mengelola projects dan profile</em></p>
</div>

### 🎯 Project Detail Page
<div align="center">
  <img src="./screenshots/project-detail.png" alt="Project Detail Page" width="800"/>
  <p><em>Halaman detail project dengan gallery dan informasi lengkap</em></p>
</div>
-->

## �🚀 Fitur Utama

### 🎨 **Desain Modern & Interaktif**

- ✅ **Animasi 3D** dengan Spline Scene yang responsif
- ✅ **Efek Hover** dan animasi microinteractions
- ✅ **Partikel Interaktif** yang mengikuti mouse cursor
- ✅ **Gradient Animations** dan glassmorphism effects
- ✅ **Dark/Light Mode** support (ready for implementation)

### 📱 **User Experience**

- ✅ **Fully Responsive** - Mobile, tablet, dan desktop
- ✅ **Smooth Scrolling** dengan parallax effects
- ✅ **Loading States** dan optimistic updates
- ✅ **Progress Indicators** untuk scroll dan loading
- ✅ **Typewriter Effect** pada hero section

### 🛠 **Dashboard Management**

- ✅ **Project Management** - CRUD operations untuk portofolio
- ✅ **Profile Management** - Update informasi personal
- ✅ **Rich Text Editor** untuk deskripsi project
- ✅ **Image Upload** dan media management
- ✅ **Authentication System** untuk akses admin

### 🔧 **Technical Features**

- ✅ **Server-Side Rendering (SSR)** dengan Next.js 15
- ✅ **Database Integration** dengan Prisma ORM
- ✅ **API Routes** untuk CRUD operations
- ✅ **TypeScript** untuk type safety
- ✅ **Real-time Updates** dengan SWR
- ✅ **SEO Optimized** dengan meta tags

## 🛠 Teknologi yang Digunakan

### **Frontend**

- **Next.js 15** - React framework dengan App Router
- **React 19** - Library UI terbaru
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icons

### **3D & Animations**

- **Spline** - 3D scene dan interactive elements
- **CSS Animations** - Custom keyframes dan transitions
- **Intersection Observer** - Scroll-triggered animations

### **Backend & Database**

- **Prisma ORM** - Database management
- **PostgreSQL** - Production database
- **API Routes** - Next.js built-in API

### **State Management & Data Fetching**

- **SWR** - Data fetching dengan caching
- **React Context** - Global state management
- **Local Storage** - Client-side persistence

### **UI Components**

- **Radix UI** - Headless UI components
- **Shadcn/ui** - Pre-built component library
- **Class Variance Authority** - Component variants

## 📁 Struktur Proyek

```
porto-umy/
├── 📁 app/                          # Next.js App Router
│   ├── 📄 layout.tsx               # Root layout
│   ├── 📄 page.tsx                 # Homepage dengan 3D scene
│   ├── 📁 about/                   # Halaman tentang
│   ├── 📁 api/                     # API Routes
│   │   ├── 📁 profile/             # Profile endpoints
│   │   └── 📁 projects/            # Projects CRUD endpoints
│   ├── 📁 dashboard/               # Admin dashboard
│   │   ├── 📄 layout.tsx           # Dashboard layout
│   │   ├── 📄 page.tsx             # Dashboard home
│   │   ├── 📁 projects/            # Project management
│   │   └── 📁 settings/            # User settings
│   ├── 📁 login/                   # Authentication
│   └── 📁 projects/                # Public project pages
├── 📁 components/                   # React Components
│   ├── 📄 ConditionalNavbar.tsx    # Smart navigation
│   ├── 📄 ProjectsManager.tsx      # Project CRUD interface
│   ├── 📄 SplineScene.tsx          # 3D scene component
│   ├── 📄 Starfield.tsx            # Background animations
│   ├── 📁 landing/                 # Landing page components
│   └── 📁 ui/                      # Reusable UI components
├── 📁 lib/                         # Utilities & configurations
│   ├── 📄 auth-context.tsx         # Authentication context
│   ├── 📄 prisma.ts               # Database client
│   └── 📄 utils.ts                # Helper functions
├── 📁 prisma/                      # Database schema & migrations
│   ├── 📄 schema.prisma           # Database models
│   └── 📁 migrations/             # Database migrations
├── 📁 types/                       # TypeScript type definitions
├── 📁 data/                        # Static data & constants
└── 📁 public/                      # Static assets
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ dan npm/yarn/pnpm
- **PostgreSQL** database (lokal atau cloud)
- **Git** untuk version control

### 1. Clone Repository

```bash
git clone https://github.com/padukadafa/porto-umy.git
cd porto-umy
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Environment Setup

Buat file `.env.local` di root project:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# Authentication (opsional)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Opsional) Seed database dengan sample data
npx prisma db seed
```

### 5. Development Server

```bash
npm run dev
```

🎉 **Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya!**

## 📖 Panduan Penggunaan

### 🏠 **Homepage**

Halaman utama menampilkan:

- **Hero Section** dengan 3D scene interaktif
- **Project Gallery** dengan filter dan search
- **Skills Section** dengan animated progress bars
- **Contact Form** dengan validasi real-time

### 🎯 **Project Pages**

Setiap project memiliki halaman detail dengan:

- **Project Overview** dan technical specifications
- **Image Gallery** dengan lightbox
- **Technology Stack** dan features
- **Live Demo** dan source code links

### ⚡ **Dashboard Admin**

Akses dashboard di `/dashboard` untuk:

- **Manage Projects** - Tambah, edit, hapus projects
- **Profile Settings** - Update informasi personal
- **Analytics** - View statistics (coming soon)

### 🔧 **API Endpoints**

#### Projects API

```typescript
GET    /api/projects      # Get all projects
GET    /api/projects/[id] # Get project by ID
POST   /api/projects      # Create new project
PUT    /api/projects/[id] # Update project
DELETE /api/projects/[id] # Delete project
```

#### Profile API

```typescript
GET    /api/profile       # Get profile data
PUT    /api/profile       # Update profile
```

## 🎨 Kustomisasi

### **Tema & Styling**

Edit `app/globals.css` untuk mengubah:

- Color palette
- Typography scales
- Animation timings
- Responsive breakpoints

### **3D Scene**

Replace Spline scene URL di `components/SplineScene.tsx`:

```typescript
<SplineScene url="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
```

### **Content**

Update konten di:

- `data/projects.tsx` - Sample project data
- `types/` - TypeScript interfaces
- Database melalui dashboard admin

## 🚀 Production Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### **Manual Deployment**

```bash
# Build production
npm run build

# Start production server
npm start
```

### **Database Migration**

```bash
# Deploy database schema
npx prisma migrate deploy

# Generate production client
npx prisma generate
```

## 🔧 Scripts Available

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npx prisma studio   # Open database GUI
npx prisma migrate dev # Run database migrations
```

## 📱 Responsive Breakpoints

| Device  | Breakpoint | Width   |
| ------- | ---------- | ------- |
| Mobile  | `sm`       | 640px+  |
| Tablet  | `md`       | 768px+  |
| Laptop  | `lg`       | 1024px+ |
| Desktop | `xl`       | 1280px+ |
| Large   | `2xl`      | 1536px+ |

## 🎯 Performance

- ⚡ **Page Speed** - 95+ Lighthouse score
- 🖼 **Image Optimization** - Next.js automatic optimization
- 📦 **Bundle Size** - Optimized dengan tree shaking
- 🔄 **Caching** - SWR untuk efficient data fetching

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact & Support

- **Email**: [danielferryalzuhri@gmail.com](mailto:danielferryalzuhri@gmail.com)
- **Website**: [danielferryalzuhri.vercel.app](https://danielferryalzuhri.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/padukadafa/porto-umy/issues)

---

<div align="center">

**⭐ Star this repo jika bermanfaat! ⭐**

Dibuat dengan ❤️ menggunakan **Next.js**, **React**, **Spline**, dan **Tailwind CSS**

**[🔥 View Live Demo](http://localhost:3000)** | **[📖 Documentation](https://github.com/padukadafa/porto-umy)** | **[🐛 Report Bug](https://github.com/padukadafa/porto-umy/issues)**

</div>
