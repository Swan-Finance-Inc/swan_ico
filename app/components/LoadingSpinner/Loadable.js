/**
 *
 * Asynchronously loads the component for LoadingSpinner
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
