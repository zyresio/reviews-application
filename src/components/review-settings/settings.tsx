import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';

const Settings = () => {
  // const match = useRouteMatch();
  // const { push } = useHistory();
  // const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
  //   dataLocale: context.dataLocale,
  //   projectLanguages: context.project?.languages,
  // }));

  // if (error) {
  //   return (
  //     <ContentNotification type="error">
  //       <Text.Body>{getErrorMessage(error)}</Text.Body>
  //     </ContentNotification>
  //   );
  // }

  return (
    <Spacings.Stack scale="xl">
      {/* <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal> */}

      {<LoadingSpinner />}
    </Spacings.Stack>
  );
};
Settings.displayName = 'Reviews';

export default Settings;
