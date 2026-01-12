'use client';

import { Code2, Settings, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Code2 className="h-6 w-6 text-primary-600" />,
    title: 'Traditional IntelliSense',
    description: 'Pure TypeScript LSP autocomplete without AI assistance',
  },
  {
    icon: <Zap className="h-6 w-6 text-warning-600" />,
    title: 'Fast Development',
    description: 'Optimized toolchain with pnpm, Turbo, and modern tooling',
  },
  {
    icon: <Shield className="h-6 w-6 text-success-600" />,
    title: 'Type Safety',
    description: 'Comprehensive TypeScript configuration with strict checking',
  },
  {
    icon: <Settings className="h-6 w-6 text-neutral-600" />,
    title: 'Monorepo Structure',
    description: 'Well-organized workspace with apps and packages separation',
  },
];

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check API status on mount
  React.useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      } catch (error) {
        setApiStatus('offline');
      }
    };

    checkApiStatus();
  }, []);

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-neutral-900">
                Node.js Traditional Autocomplete
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    apiStatus === 'online'
                      ? 'bg-success-500'
                      : apiStatus === 'offline'
                      ? 'bg-error-500'
                      : 'bg-warning-500 animate-pulse'
                  }`}
                />
                <span className="text-sm text-neutral-600">
                  API {apiStatus === 'checking' ? 'Checking...' : apiStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Full-Stack Development with Traditional Tools
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Experience the power of traditional autocomplete and IntelliSense without AI assistance.
            Built with Node.js 22, TypeScript 5, React 19, and modern tooling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Node.js 22.x
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              TypeScript 5.x
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              React 19.x
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Next.js 15.x
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Traditional Development Features
            </h3>
            <p className="text-lg text-neutral-600">
              Focused on pure TypeScript language server capabilities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-neutral-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Technology Stack
            </h3>
            <p className="text-lg text-neutral-600">
              Modern tools configured for traditional development workflow
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Node.js', version: '22.x' },
              { name: 'TypeScript', version: '5.x' },
              { name: 'React', version: '19.x' },
              { name: 'Next.js', version: '15.x' },
              { name: 'Express', version: '5.x' },
              { name: 'pnpm', version: '9.x' },
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-neutral-50 rounded-lg p-4 mb-2">
                  <div className="font-semibold text-neutral-900">{tech.name}</div>
                  <div className="text-sm text-neutral-600">{tech.version}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Built with traditional development tools • No AI assistance • Pure TypeScript LSP
          </p>
        </div>
      </footer>
    </div>
  );
}

// Fix missing React import
import React from 'react';
