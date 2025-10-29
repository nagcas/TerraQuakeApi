// MetaData.jsx
export default function MetaData({
  title,
  description,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  keywords,
}) {
  const finalTitle = title ? `${title} | TerraQuake API` : 'TerraQuake API';
  const finalDescription =
    description ||
    'TerraQuake API provides real-time earthquake data and seismic monitoring.';
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalTwitterTitle = twitterTitle || finalTitle;
  const finalTwitterDescription = twitterDescription || finalDescription;
  const finalKeywords =
    keywords ||
    'TerraQuake API, earthquake, seismic data, earthquake monitoring, disaster prevention';

  return (
    <>
      <title>{finalTitle}</title>
      <meta
        name='description'
        content={finalDescription}
      />
      {finalKeywords && (
        <meta
          name='keywords'
          content={finalKeywords}
        />
      )}

      {/* Open Graph */}
      <meta
        property='og:title'
        content={finalOgTitle}
      />
      <meta
        property='og:description'
        content={finalOgDescription}
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={window.location.href}
      />

      {/* Twitter */}
      <meta
        name='twitter:title'
        content={finalTwitterTitle}
      />
      <meta
        name='twitter:description'
        content={finalTwitterDescription}
      />
    </>
  );
}
