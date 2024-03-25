import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  // Switch,
  // useHistory,
  // useRouteMatch,
} from 'react-router-dom';
// import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
// import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import {
  BackIcon,
  BinFilledIcon,
  CheckBoldIcon,
} from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import PrimaryButton from '@commercetools-uikit/primary-button';
// import SecondaryButton from '@commercetools-uikit/secondary-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTable, { TColumn } from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
// import { SuspendedRoute } from '@commercetools-frontend/application-shell';
// import {
//   formatLocalizedString,
//   transformLocalizedFieldToLocalizedString,
// } from '@commercetools-frontend/l10n';
import type { TFetchReviewsQuery } from '../../types/generated/ctp';
// import { useChannelsFetcher } from '../../hooks/use-channels-connector';
import { getErrorMessage } from '../../helpers';
import messages from './messages';
  
import {
  useReviewsFetcher,
  useReviewTrantionMutation,
} from '../../hooks/use-reviews-connector';
import { useReviewDeleteMutation } from '../../hooks/use-reviews-connector/use-reviews-connector';
import { ProjectLink } from '../common/ProjectLink';

const columns: TColumn<
  NonNullable<TFetchReviewsQuery['reviews']['results']>[0]
>[] = [
    { key: 'rating', label: 'Rating', isSortable: true },
    { key: 'text', label: 'Text', isSortable: true },
    { 
      key: 'createdAt',
      label: 'Created At',
      // isSortable: true 
    },
    {
      key: 'customer.id',
      label: 'Customer',
      shouldIgnoreRowClick: true,
    },
    {
      key: 'target.id',
      label: 'Product',
      shouldIgnoreRowClick: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      shouldIgnoreRowClick: true,
      width: 'min-content',
    },
  ];

type TChannelsProps = {
  linkToWelcome: string;
};

const Reviews = (props: TChannelsProps) => {
  const intl = useIntl();
  // const match = useRouteMatch();
  // const { push } = useHistory();
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const transition = useReviewTrantionMutation();
  const deletion = useReviewDeleteMutation();
  // const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
  //   dataLocale: context.dataLocale,
  //   projectLanguages: context.project?.languages,
  // }));
  const { reviewsPaginatedResult, error, loading, refetch } = useReviewsFetcher(
    {
      page,
      perPage,
      tableSorting,
      where: 'includedInStatistics=false',
    }
  );

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  console.log(reviewsPaginatedResult);

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      {/* <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.demoHint} />
        </ContentNotification>
      </Constraints.Horizontal> */}

      {loading && <LoadingSpinner />}

      {reviewsPaginatedResult && reviewsPaginatedResult.count !== 0 ? (
        <Spacings.Stack scale="l">
          <DataTable<NonNullable<TFetchReviewsQuery['reviews']['results']>[0]>
            isCondensed
            columns={columns}
            rows={reviewsPaginatedResult.results}
            itemRenderer={(item, column) => {
              switch (column.key) {
                case 'rating':
                  return item.rating;
                case 'text':
                  return item.text;
                case 'createdAt':
                  return new Date(item.createdAt).toLocaleDateString();
                case 'customer.id':
                  return <ProjectLink href={`/customers/${item.customer?.id}`}>{item.customer?.email}</ProjectLink>;
                case 'target.id':
                  return <ProjectLink href={`/products/${item.target?.id}`}>{item.target?.id}</ProjectLink>;
                case 'actions':
                  return (
                    <Spacings.Inline scale="m">
                      <PrimaryButton
                        label="Approve"
                        iconLeft={<CheckBoldIcon />}
                        disabled={transition.loading}
                        onClick={async () => {
                          const newStateId = item.state?.transitions?.[0]?.id;
                          if (!newStateId) return;
                          await transition.execute({
                            newStateId,
                            reviewId: item.id,
                            version: item.version,
                          });
                          refetch();
                        }}
                      >
                        Approve
                      </PrimaryButton>
                      <PrimaryButton
                        label="Delete"
                        iconLeft={<BinFilledIcon />}
                        tone="critical"
                        disabled={deletion.loading}
                        onClick={async () => {
                          await deletion.execute({
                            version: item.version,
                            id: item.id,
                          });
                          refetch();
                        }}
                      >
                        Delete
                      </PrimaryButton>
                    </Spacings.Inline>
                  );
                // return formatLocalizedString(
                //   {
                //     name: transformLocalizedFieldToLocalizedString(
                //       item.nameAllLocales ?? []
                //     ),
                //   },
                //   {
                //     key: 'name',
                //     locale: dataLocale,
                //     fallbackOrder: projectLanguages,
                //     fallback: NO_VALUE_FALLBACK,
                //   }
                // );
                default:
                  return null;
              }
            }}
            sortedBy={tableSorting.value.key}
            sortDirection={tableSorting.value.order}
            onSortChange={tableSorting.onChange}
          // onRowClick={(row) => push(`${match.url}/${row.id}`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={reviewsPaginatedResult.total}
          />
        </Spacings.Stack>
      ) : (
        <Constraints.Horizontal max={13}>
          <ContentNotification type="info">
            <Text.Body intlMessage={messages.noResults} />
          </ContentNotification>
        </Constraints.Horizontal>
      )}
    </Spacings.Stack>
  );
};
Reviews.displayName = 'Reviews';

export default Reviews;
