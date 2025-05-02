// Router.jsx
// Assigns each Page Component to a route.

import { createBrowserRouter } from 'react-router-dom';

// Import custom components.
import { App } from '../App';
import { BranchesPage, CommitInspectorPage, CommitsPage, ExplorePage, IssueInspectorPage, IssuesPage, ProjectPage, ReleaseNotesPage, ContributingPage, TagsPage, PrivacyPage } from '../pages';
import { ErrorScreen, HomeScreen, ProjectInspectorScreen } from '../screens';

// App router that manages the history stack.
export const router = createBrowserRouter
(
  [
    {
      // Base component extended by all the pages with the project context, Navbar and Footer.
      path: '',
      element: <App />,

      // The children are placed inside the <App /> component.
      children:
      [
        {
          // Home Screen displayed at index.
          path: '/',
          element: <HomeScreen />,
        },
        {
          // Contributing Guidelines Page with the contact form.
          path: 'contributing',
          element: <ContributingPage />,
        },
        {
          // Privacy Policy Page about the website and contact.
          path: 'privacy',
          element: <PrivacyPage />
        },
        {
          // Explore Screen where a list of different projects is displayed according to the search query.
          path: 'explore',
          element: <ExplorePage />,
        },
        {
          // Project Page where the details of the selected project are displayed.
          path: ':proj',
          element: <ProjectPage />,
          errorElement: <ErrorScreen />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Page where the details of the selected project are displayed according to the
          // selected reference.
          path: ':proj/:ref',

          element: <ProjectPage />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Page where the details of the selected project are displayed according to the
          // selected type and reference.
          path: ':proj/:typ/:ref',

          element: <ProjectPage />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Branches Page where the branches of the selected project are displayed.
          path: ':proj/branches',
          element: <BranchesPage />,
          errorElement: <ErrorScreen />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Commit Inspector Page where the details of the selected project commit are displayed.
          path: ':proj/commit/:ref',
          element: <CommitInspectorPage />,
          errorElement: <ErrorScreen />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Commits Page where a list of the selected project commits is displayed.
          path: ':proj/commits/:ref',
          element: <CommitsPage />,
          errorElement: <ErrorScreen />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Known Issues Page where a list of the selected project known issues is dispayed.
          path: ':proj/issues',
          element: <IssuesPage />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Issue Inspector Page where the details of the selected project issue are displayed.
          path: ':proj/issues/:iss',
          element: <IssueInspectorPage />,

          loader: async ( { params } ) =>
          {

            return params;
          }
        },
        {
          // Project Releases Page where the details of the selected project release are displayed.
          path: ':proj/releases/tag/:ref',
          element: <ReleaseNotesPage />,

          loader: async ( { params } ) =>
          {

            return params;
          }
        },
        {
          // Project Tags Page where a list of the selected project tags is displayed.
          path: ':proj/tags',
          element: <TagsPage />,
          errorElement: <ErrorScreen />,

          loader: async ( { params } ) =>
          {
            return params;
          }
        },
        {
          // Project Inspector Screen where a file or folder of the selected project is inspected inside.
          path: ':proj/:typ/:ref/*',

          element: <ProjectInspectorScreen />,

          loader: async ( { params } ) =>
          {

            return params;
          }
        },
      ]
    },
  ]
);