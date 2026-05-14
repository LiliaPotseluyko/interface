import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import PersonaDetailPage from "./pages/PersonaDetailPage";
import ErrorPage from "./pages/ErrorPage";
import ExternalRolePlaceholderPage from "./pages/ExternalRolePlaceholderPage";
import DefectsPage from "./pages/stephen/DefectsPage";
import DefectDetailsPage from "./pages/stephen/DefectDetailsPage";
import SharePage from "./pages/stephen/SharePage";
import ShareConfirmationPage from "./pages/stephen/ShareConfirmationPage";
import ConfirmationPage from "./pages/stephen/ConfirmationPage";
import SectionsPageWrapper from "./pages/SectionsPageWrapper";
import SectionDetailPageWrapper from "./pages/SectionDetailPageWrapper";
import SectionDiagnosticsPageWrapper from "./pages/SectionDiagnosticsPageWrapper";
import SectionPredictionsPageWrapper from "./pages/SectionPredictionsPageWrapper";
import TeamPage from "./pages/stephen/TeamPage";
import ChatsPage from "./pages/stephen/ChatsPage";
import JobDetailPage from "./pages/stephen/JobDetailPage";
import CreateInvoicePage from "./pages/stephen/CreateInvoicePage";
import InvoiceDetailPage from "./pages/stephen/InvoiceDetailPage";
import MyRoadsPage from "./pages/stephen/MyRoadsPage";
import ProfilePageWrapper from "./pages/ProfilePageWrapper";

// Leo's (external user) pages
import LeoHomePage from "./pages/leo/HomePage";
import LeoBidsPage from "./pages/leo/BidsPage";
import LeoAvailabilityPage from "./pages/leo/AvailabilityPage";

// Rajesh's (external user) pages
import RajeshCrewsPage from "./pages/rajesh/CrewsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId",
    Component: DefectsPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/defect/:defectId",
    Component: DefectDetailsPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/defect/:defectId/share",
    Component: SharePage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/defect/:defectId/share-confirmation",
    Component: ShareConfirmationPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/defect/:defectId/confirmation",
    Component: ConfirmationPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/sections",
    Component: SectionsPageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/roads",
    Component: MyRoadsPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/roads/:sectionId",
    Component: SectionDetailPageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/section/:sectionId",
    Component: SectionDetailPageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/section/:sectionId/diagnostics",
    Component: SectionDiagnosticsPageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/section/:sectionId/predictions",
    Component: SectionPredictionsPageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/team",
    Component: TeamPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/chats",
    Component: ChatsPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/chats/job/:jobId",
    Component: JobDetailPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/chats/create-invoice",
    Component: CreateInvoicePage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/chats/invoice/:invoiceId",
    Component: InvoiceDetailPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/profile",
    Component: ProfilePageWrapper,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/external",
    Component: ExternalRolePlaceholderPage,
    ErrorBoundary: ErrorPage,
  },
  // Leo's (external user) routes
  {
    path: "/persona/:personaId/home",
    Component: LeoHomePage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/bids",
    Component: LeoBidsPage,
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/persona/:personaId/availability",
    Component: LeoAvailabilityPage,
    ErrorBoundary: ErrorPage,
  },
  // Rajesh's (external user) routes
  {
    path: "/persona/:personaId/crews",
    Component: RajeshCrewsPage,
    ErrorBoundary: ErrorPage,
  },
]);
