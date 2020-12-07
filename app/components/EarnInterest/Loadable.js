/**
 *
 * Asynchronously loads the component for EarnInterest
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
