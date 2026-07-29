import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/context/ThemeContext';
import { PageLoader } from '@/components/ui/PageLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Mohamed Safthar Hussain K | Warehouse Operations Leader',
  description: 'Ultra Minimal Luxury Enterprise Portfolio of Mohamed Safthar Hussain K — Warehouse Operations Team Leader & Inventory Control Specialist in Dubai, UAE. 2+ Years experience at Eco Express Courier & Freight L.L.C, 400+ daily shipments, 5,000+ confidential bank documents, 100+ delivery driver scheduling, 99% accuracy.',
  keywords: [
    'Mohamed Safthar Hussain K Dubai',
    'Warehouse Operations Team Leader UAE',
    'Inventory Control Specialist Dubai',
    'Eco Express Courier Freight UAE',
    'Document Logistics 5000 Bank Docs',
    'Advanced MS Excel XLOOKUP Pivot',
    'NDT QA QC Mechanical Engineer'
  ],
  authors: [{ name: 'Mohamed Safthar Hussain K' }],
  creator: 'Mohamed Safthar Hussain K',
  publisher: 'Enterprise Logistics Digital',
  openGraph: {
    title: 'Mohamed Safthar Hussain K | Warehouse Operations Leader',
    description: 'Ultra Minimal Luxury Enterprise Portfolio & CV of Mohamed Safthar Hussain K. 2+ years UAE experience, 400+ daily shipments, 100+ delivery drivers scheduled, immediately available in Dubai, UAE.',
    url: 'https://safthar-portfolio.vercel.app',
    siteName: 'Mohamed Safthar Hussain K Portfolio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Warehouse Operations & High-Bay Fulfillment'
      }
    ],
    locale: 'en_US',
    type: 'profile'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Safthar Hussain K | Warehouse Operations Leader',
    description: 'Warehouse Operations Team Leader & Inventory Control Specialist in Dubai, UAE.',
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed Safthar Hussain K',
    jobTitle: 'Warehouse In-Charge | Operations Team Leader | Inventory Control Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'Eco Express Courier and Freight Services L.L.C'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'United Arab Emirates'
    },
    telephone: '+971561928872',
    email: 'safthar.mechon36000@gmail.com',
    sameAs: ['https://www.linkedin.com/in/safthar00'],
    alumniOf: 'Aalim Muhammed Salegh Polytechnic College',
    knowsAbout: [
      'Warehouse Operations Management',
      'Inbound & Outbound Logistics',
      'Inventory Control & Stock Accuracy',
      '100+ Delivery Driver Scheduling & Fleet Staging',
      'Secure Document Logistics & RTO Processing',
      'Advanced MS Excel (Pivot Tables, XLOOKUP, VLOOKUP)',
      'Non-Destructive Testing (UT, MT, PT, VT, LT)',
      'BS6 Dynamometer Emission Testing'
    ]
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400">
        <ThemeProvider>
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
