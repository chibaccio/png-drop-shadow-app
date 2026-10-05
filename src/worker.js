// Cloudflare Worker for PNG Drop Shadow Studio
// Pure Client-side Web App with strict Security Headers

import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only allow GET / HEAD
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Health check endpoint
    if (url.pathname === '/healthz') {
      return new Response('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    // Enterprise-grade Security Headers
    const headers = new Headers({
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; object-src 'none'; base-uri 'self';",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      'Cache-Control': 'public, max-age=3600',
    });

    return new Response(htmlContent, {
      status: 200,
      headers
    });
  }
};
