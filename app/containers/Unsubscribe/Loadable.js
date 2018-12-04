/**
 *
 * Asynchronously loads the component for Unsubscribe
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
