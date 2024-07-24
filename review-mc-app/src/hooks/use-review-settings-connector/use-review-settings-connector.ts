/// <reference path="../../../@types/commercetools__sync-actions/index.d.ts" />
/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type {
  TFetchReviewSettingsQuery,
  TFetchReviewSettingsQueryVariables,
  TUpdateReviewSettingsMutation,
  TUpdateReviewSettingsMutationVariables,
} from '../../types/generated/ctp';
import { extractErrorFromGraphQlResponse } from '../../helpers';

import FetchReviewSettingsQuery from './fetch-review-settings.ctp.graphql';
import UpdateReivewSettingsMutation from './update-review-settings.ctp.graphql';

import * as z from 'zod';

const CUSTOM_OBJECT_IDENTIFIER = {
  container: 'zy-reviews',
  key: 'zy-reviews-settings',
} as const;

const SettingsSchema = z.object({
  moderateReviews: z.boolean().default(true),
  reviewMessage: z.record(z.string()),
});

export type SettingsType = z.infer<typeof SettingsSchema>;

type TUseReviewSettingsFetcher = () => {
  reviewSettingsResult?: {
    version?: number;
    value: SettingsType;
  };
  error?: ApolloError;
  loading: boolean;
  refetch: () => void;
};

export const useReviewSettingsFetcher: TUseReviewSettingsFetcher = () => {
  const { data, error, loading, refetch } = useMcQuery<
    TFetchReviewSettingsQuery,
    TFetchReviewSettingsQueryVariables
  >(FetchReviewSettingsQuery, {
    variables: {
      key: CUSTOM_OBJECT_IDENTIFIER.key,
      container: CUSTOM_OBJECT_IDENTIFIER.container,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  const validatedData = SettingsSchema.safeParse(data?.customObject?.value);

  return {
    error,
    loading,
    refetch,
    reviewSettingsResult: validatedData.success
      ? { value: validatedData.data, version: data?.customObject?.version }
      : // default value if no valid value present
        {
          value: {
            reviewMessage: {},
            moderateReviews: true,
          },
        },
  };
};

export const useReviewSettingsUpdateMutation = () => {
  const [transitionReview, { loading }] = useMcMutation<
    TUpdateReviewSettingsMutation,
    TUpdateReviewSettingsMutationVariables
  >(UpdateReivewSettingsMutation);

  const execute = async ({
    version,
    settingsValue,
  }: {
    settingsValue: SettingsType;
    version?: number;
  }) => {
    try {
      return await transitionReview({
        context: {
          target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
        variables: {
          version: version,
          key: CUSTOM_OBJECT_IDENTIFIER.key,
          container: CUSTOM_OBJECT_IDENTIFIER.container,
          value: JSON.stringify(settingsValue),
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
