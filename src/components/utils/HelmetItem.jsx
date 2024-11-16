// HelmetItem.js
import { Helmet } from 'react-helmet';
// Constants
import { CompanyName } from '../../utils/Constants';

export const HelmetItem = ({
  PageName,
  desc,
  keywords,
  additionalMeta = [],
}) => {
  return (
    <Helmet>
      <title>
        {PageName} - {CompanyName}
      </title>
      <meta name='description' content={desc} />
      {/* Keywords */}
      {keywords && <meta name='keywords' content={keywords} />}
      {/* Meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
    </Helmet>
  );
};
