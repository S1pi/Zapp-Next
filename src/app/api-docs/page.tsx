'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/docs')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch API documentation');
        return res.json();
      })
      .then((data) => setSpec(data))
      .catch((err) => {
        console.error('Error loading API docs:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading API documentation: {error}
      </div>
    );
  }

  if (!spec) {
    return (
      <div className="p-4">
        Loading API documentation...
      </div>
    );
  }

  // Avoid strict mode errors by wrapping SwaggerUI with client-side hydration
  return <SwaggerUI spec={spec} />;
}