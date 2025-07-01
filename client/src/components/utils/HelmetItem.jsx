// HelmetItem.jsx
import { Helmet } from 'react-helmet';
import { CompanyName } from '../../utils/Constants';

export const HelmetItem = ({
  PageName,
  desc,
  keywords,
  additionalMeta = [],
  structuredData = null,
  noIndex = false, // NEW: toggle noindex
}) => {
  return (
    <Helmet>
      <title>{PageName} - {CompanyName}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Inject additional meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}

      {/* Optional: Prevent indexing for admin/private pages */}
      {noIndex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* Optional structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
