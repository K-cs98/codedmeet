import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { PrivacyProvider } from '@/context/PrivacyContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coded Meets',
  description: 'Adult Social Network & Directory Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <AuthProvider>
          <PrivacyProvider>
            <div className="flex min-h-screen">
              {/* Desktop Left Sidebar */}
              <Sidebar />

              {/* Main App Content Area */}
              <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
            </div>
            <AuthModal />
          </PrivacyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}