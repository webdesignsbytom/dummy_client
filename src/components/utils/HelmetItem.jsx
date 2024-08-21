import { Helmet } from 'react-helmet';
// Constants
import { CompanyName } from '../../utils/Constants';

export const HelmetItem = ({ PageName, desc }) => {
  return (
    <Helmet>
      <title>
        {PageName} - {CompanyName}
      </title>
      <meta name='description' content={desc} />
    </Helmet>
  );
};
