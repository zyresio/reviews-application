import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import {
  SettingsType,
  useReviewSettingsFetcher,
  useReviewSettingsUpdateMutation,
} from '../../hooks/use-review-settings-connector/use-review-settings-connector';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import CheckBoxInput from '@commercetools-uikit/checkbox-input';
import PrimaryButton from '@commercetools-uikit/primary-button';
import messages from './messages';
import { getErrorMessage } from '../../helpers';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useState } from 'react';

const Settings = () => {
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const { reviewSettingsResult, loading, error, refetch } =
    useReviewSettingsFetcher();

  const update = useReviewSettingsUpdateMutation();

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>
      {reviewSettingsResult?.value && !loading && (
        <SettingsForm
          dataLocale={dataLocale}
          defaultModerate={reviewSettingsResult.value.moderateReviews}
          defaultMessage={{
            ...projectLanguages.reduce(
              (acc, curr) => ({ ...acc, [curr]: '' }),
              {} as Record<string, string>
            ),
            ...reviewSettingsResult.value.reviewMessage,
          }}
          save={async (next) => {
            await update.execute({
              settingsValue: next,
              version: reviewSettingsResult.version,
            });
            refetch();
          }}
        />
      )}

      {loading && <LoadingSpinner />}
    </Spacings.Stack>
  );
};
Settings.displayName = 'Review Settings';

type SettingsFormProps = {
  defaultMessage: Record<string, string>;
  defaultModerate: boolean;
  dataLocale: string;
  save: (val: SettingsType) => void | Promise<void>;
};
function SettingsForm({
  defaultMessage,
  defaultModerate,
  dataLocale,
  save,
}: SettingsFormProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [moderate, setModerate] = useState(defaultModerate);
  const [touched, setTouched] = useState(false);
  console.log(touched);

  return (
    <>
      <CheckBoxInput
        isChecked={moderate}
        onChange={(e) => {
          setModerate(e.target.checked);
          setTouched(true);
        }}
      >
        Moderate Reviews?
      </CheckBoxInput>
      <LocalizedTextField
        value={message}
        title="Reivew Message"
        selectedLanguage={dataLocale}
        onChange={(e) => {
          setMessage({
            ...message,
            [e.target.language]: e.target.value,
          });
          setTouched(true);
        }}
      />
      <PrimaryButton
        label="Save"
        isDisabled={!touched}
        style={{
          alignSelf: 'end',
        }}
        onClick={async () => {
          await save({
            reviewMessage: message,
            moderateReviews: moderate,
          });

          setTouched(false);
        }}
      >
        Save
      </PrimaryButton>
    </>
  );
}

export default Settings;
