/**
 *
 * Asynchronously loads the component for ForceReset
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
