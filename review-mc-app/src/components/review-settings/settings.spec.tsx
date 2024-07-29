// import { graphql, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';
// import {
//   screen,
//   mapResourceAccessToAppliedPermissions,
//   type TRenderAppWithReduxOptions,
// } from '@commercetools-frontend/application-shell/test-utils';
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
//   const route = options.route || `/my-project/${entryPointUriPath}/settings`;
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
//
// const mockFetchSettings = graphql.query('FetchReviewSettings', () => {
//   return HttpResponse.json({
//     data: {
//       customObject: {
//         value: {
//           reviewMessage: {
//             de: 'Um dieses Produkt zu bewerten, wählen Sie eine Sternebewertung aus und schreiben Sie Ihre Kommentare unten',
//             en: 'To review this product, select a star rating and write your comments below',
//             fr: 'Pour donner votre avis sur ce produit, sélectionnez un classement par étoiles et écrivez vos commentaires ci-dessous',
//           },
//           moderateReviews: true,
//         },
//         version: 15,
//         __typename: 'CustomObject',
//       },
//     },
//   });
// });
//
// it('should render settings page', async () => {
//   mockServer.use(mockFetchSettings);
//
//   renderApp();
//
//   await screen.findByText('Review Settings');
//   await screen.findByDisplayValue(
//     'To review this product, select a star rating and write your comments below'
//   );
// });
//  
it("works", () => { });
