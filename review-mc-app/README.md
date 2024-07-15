# Reviews - Commercetools custom application

## Develop

1. Install Packages: `yarn`
2. Setup Environment: `cp .env.example .env`
3. Start development server: `yarn start`

## Environment

- [MC_API_URL](https://docs.commercetools.com/merchant-center-customizations/concepts/merchant-center-api#available-regions)
- [MC_ACCESS_TOKEN](https://docs.commercetools.com/tutorials/curl-cheatsheet#get-your-access-token): Needed for graphql codegen
- MC_PROJECT_KEY: Can be found in the merchant center
- ENTRY_POINT_URI_PATH: the sub-route of the application
- CLOUD_IDENTIFIER: your commercetools region (should be the same as in MC_API_URL)
- [CUSTOM_APPLICATION_ID](https://docs.commercetools.com/merchant-center-customizations/api-reference/custom-application-config#envproductionapplicationid): As long as you are developing the Custom Application locally, you can define any random value as it's a required field.
- [APPLICATION_URL](https://docs.commercetools.com/merchant-center-customizations/api-reference/custom-application-config#envproductionurl): same as CUSTOM_APPLICATION_ID
