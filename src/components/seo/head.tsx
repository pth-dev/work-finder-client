import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
};

export const Head = ({
  title = '',
  description = 'Find your dream job with WorkFinder - the leading job search platform connecting talented professionals with top companies.',
  keywords = 'jobs, careers, employment, job search, hiring, recruitment',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
}: HeadProps) => {
  const fullTitle = title ? `${title} | WorkFinder` : 'WorkFinder - Find Your Dream Job';
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  const fullImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="WorkFinder" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="WorkFinder" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
};
