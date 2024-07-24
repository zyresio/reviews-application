import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Constraints from '@commercetools-uikit/constraints';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';

const Welcome = () => {
  const match = useRouteMatch();

  return (
    <Constraints.Horizontal max={16}>
      <Spacings.Stack scale="xl">
        <Text.Headline as="h1" intlMessage={messages.title} />
        <RouterLink to={`${match.url}/approval`}>Approval</RouterLink>
        <RouterLink to={`${match.url}/settings`}>Settings</RouterLink>
      </Spacings.Stack>
    </Constraints.Horizontal>
  );
};
Welcome.displayName = 'Welcome';

export default Welcome;
