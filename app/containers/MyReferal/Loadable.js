/**
 *
 * Asynchronously loads the component for MyReferal
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
