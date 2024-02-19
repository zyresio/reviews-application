/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
// import { createSyncChannels } from '@commercetools/sync-actions';
import type { TDataTableSortingState } from '@commercetools-uikit/hooks';
import type {
  TDeleteReviewMutation,
  TDeleteReviewMutationVariables,
  TFetchReviewsQuery,
  TFetchReviewsQueryVariables,
  TTransitionReviewMutation,
  TTransitionReviewMutationVariables,
} from '../../types/generated/ctp';
import {
  // createGraphQlUpdateActions,
  extractErrorFromGraphQlResponse,
  // convertToActionData,
} from '../../helpers';

import TransitionReviewMutation from './transition-review.ctp.graphql';
import DeleteReviewMutation from './delete-review.ctp.graphql';
import FetchReviewsQuery from './fetch-reviews.ctp.graphql';

// const syncChannels = createSyncChannels();

type PaginationAndSortingProps = {
  page: { value: number };
  perPage: { value: number };
  tableSorting: TDataTableSortingState;
  where?: string;
};
type TUseReviewsFetcher = (
  paginationAndSortingProps: PaginationAndSortingProps
) => {
  reviewsPaginatedResult?: TFetchReviewsQuery['reviews'];
  error?: ApolloError;
  loading: boolean;
  refetch: () => void;
};

export const useReviewsFetcher: TUseReviewsFetcher = ({
  page,
  perPage,
  tableSorting,
  where,
}) => {
  const { data, error, loading, refetch } = useMcQuery<
    TFetchReviewsQuery,
    TFetchReviewsQueryVariables
  >(FetchReviewsQuery, {
    variables: {
      limit: perPage.value,
      offset: (page.value - 1) * perPage.value,
      sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
      where,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    reviewsPaginatedResult: data?.reviews,
    error,
    loading,
    refetch,
  };
};

// type TUseChannelDetailsFetcher = (channelId: string) => {
//   channel?: TFetchChannelDetailsQuery['channel'];
//   error?: ApolloError;
//   loading: boolean;
// };
//
// export const useChannelDetailsFetcher: TUseChannelDetailsFetcher = (
//   channelId
// ) => {
//   const { data, error, loading } = useMcQuery<
//     TFetchChannelDetailsQuery,
//     TFetchChannelDetailsQueryVariables
//   >(FetchChannelDetailsQuery, {
//     variables: {
//       channelId,
//     },
//     context: {
//       target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
//     },
//   });
//
//   return {
//     channel: data?.channel,
//     error,
//     loading,
//   };
// };
//
export const useReviewTrantionMutation = () => {
  const [transitionReview, { loading }] = useMcMutation<
    TTransitionReviewMutation,
    TTransitionReviewMutationVariables
  >(TransitionReviewMutation);

  const execute = async ({
    version,
    reviewId,
    newStateId,
  }: {
    reviewId: string;
    newStateId: string;
    version: number;
  }) => {
    try {
      return await transitionReview({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          id: reviewId,
          version: version,
          stateId: newStateId,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};

export const useReviewDeleteMutation = () => {
  const [deleteReview, { loading }] = useMcMutation<
    TDeleteReviewMutation,
    TDeleteReviewMutationVariables
  >(DeleteReviewMutation);

  const execute = async ({ version, id }: { id: string; version: number }) => {
    try {
      return await deleteReview({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          id,
          version,
        },
      });
    } catch (graphQlResponse) {
      throw extractErrorFromGraphQlResponse(graphQlResponse);
    }
  };

  return {
    loading,
    execute,
  };
};
