// components/Seo.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ yoast }) => {
    if (!yoast) return null;

    return (
        <Helmet>
            {yoast?.title && <title>{yoast.title}</title>}
            {yoast?.description && (<meta name="description" content={yoast.description} />)}
            {yoast?.robots && (
                <meta
                    name="robots"
                    content={`${yoast?.robots?.index}, ${yoast?.robots?.follow}`}
                />
            )}
            {yoast?.canonical && <link rel="canonical" href={yoast.canonical} />}

            {/* Open Graph */}
            {yoast?.og_title && (<meta property="og:title" content={yoast.og_title} />)}
            {yoast?.og_description && (<meta property="og:description" content={yoast.og_description} />)}
            {yoast?.og_url && <meta property="og:url" content={yoast.og_url} />}
            {yoast?.og_image?.[0]?.url && (<meta property="og:image" content={yoast.og_image[0].url} />)}
            <meta property="og:type" content={yoast.og_type || 'article'} />

            {/* Twitter */}
            {yoast?.twitter_title && (<meta name="twitter:title" content={yoast.twitter_title} />)}
            {yoast?.twitter_description && (<meta name="twitter:description" content={yoast.twitter_description} />)}
            {yoast?.twitter_image && (<meta name="twitter:image" content={yoast.twitter_image} />)}
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};

export default Seo;
