// import { graphql, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';
// import {
//   fireEvent,
//   screen,
//   mapResourceAccessToAppliedPermissions,
//   type TRenderAppWithReduxOptions,
//   waitForElementToBeRemoved,
// } from '@commercetools-frontend/application-shell/test-utils';
// import { buildGraphqlList } from '@commercetools-test-data/core';
// import type { TReview } from '@commercetools-test-data/review';
// import * as Review from '@commercetools-test-data/review';
// import { renderApplicationWithRedux } from '../../test-utils';
// import { entryPointUriPath, PERMISSIONS } from '../../constants';
// import ApplicationRoutes from '../../routes';
//
// const mockServer = setupServer();
// afterEach(() => mockServer.resetHandlers());
// beforeAll(() => {
//   mockServer.listen({
//     // for debugging reasons we force an error when the test fires a request with a query or mutation which is not mocked
//     // more: https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest
//     onUnhandledRequest: 'error',
//   });
// });
// afterAll(() => {
//   mockServer.close();
// });
//
// const renderApp = (options: Partial<TRenderAppWithReduxOptions> = {}) => {
//   const route = options.route || `/my-project/${entryPointUriPath}/approval`;
//   const { history } = renderApplicationWithRedux(<ApplicationRoutes />, {
//     route,
//     project: {
//       allAppliedPermissions: mapResourceAccessToAppliedPermissions([
//         PERMISSIONS.View,
//       ]),
//     },
//     ...options,
//   });
//   return { history };
// };
// let removed = false;
//
// const mockFetchReviews = graphql.query('FetchReviews', ({ variables }) => {
//   // Simulate a server side pagination.
//   let { offset } = variables;
//   const totalItems = 25; // 2 pages
//   const itemsPerPage = offset === 0 ? 20 : 5;
//
//   if (removed && offset === 0) offset = 1;
//
//   return HttpResponse.json({
//     data: {
//       reviews: buildGraphqlList<TReview>(
//         Array.from({ length: itemsPerPage }).map((_, index) =>
//           Review.random()
//             .text(`review-key-${offset === 0 ? index : 20 + index}`)
//             .key(`review-key-${offset === 0 ? index : 20 + index}`)
//         ),
//         {
//           name: 'Review',
//           total: totalItems,
//         }
//       ),
//     },
//   });
// });
//
// it('should render reviews and paginate to second page', async () => {
//   mockServer.use(mockFetchReviews);
//
//   renderApp();
//
//   // First page
//   await screen.findByText('Back to Welcome page');
//   await screen.findByText('review-key-0');
//   expect(screen.queryByText('review-key-22')).not.toBeInTheDocument();
//
//   // Go to second page
//   fireEvent.click(screen.getByLabelText('Next page'));
//
//   // Second page
//   await screen.findByText('review-key-22');
//   expect(screen.queryByText('review-key-0')).not.toBeInTheDocument();
// });
//
// it('should delete reviews', async () => {
//   mockServer.use(
//     mockFetchReviews,
//     graphql.mutation('DeleteReview', ({}) => {
//       // Simulate a server side pagination.
//       removed = true;
//       return HttpResponse.json({
//         data: {
//           deleteReview: {
//             id: 'test',
//           },
//         },
//       });
//     })
//   );
//
//   renderApp();
//
//   // wait for data
//   await screen.findByText('review-key-0');
//
//   fireEvent.click(await screen.findByLabelText('Delete review-key-0'));
//
//   await waitForElementToBeRemoved(() => screen.queryByText('review-key-0'));
//
//   expect(screen.queryByText('review-key-0')).not.toBeInTheDocument();
// });
it("works", () => { });
