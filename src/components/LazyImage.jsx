import { useState } from 'react';

export default function LazyImage({ src, alt, lazyImgWrap, className = '', eager = false }) {
  const [loaded, setLoaded] = useState(false);
  const avifSrc = src.replace(/\.jpg$/i, '.avif');
  const webpSrc = src.replace(/\.jpg$/i, '.webp');

  return (
    <div className={lazyImgWrap ? 'lazy-img-wrap-fixed' : 'lazy-img-wrap'}>
      {!loaded && <div className="lazy-img-skeleton" aria-hidden="true" />}
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={`${className} lazy-img${loaded ? ' loaded' : ''}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </div>
  );
}
