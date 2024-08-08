import type { AppProps } from "next/app";
import { AuthProvider } from "@saas-ui/auth";
import { SaasProvider } from "@saas-ui/react";
import { Layout } from "components/layout";
import theme from "../theme";
import { useRouter } from 'next/router';
import AdminLayout from '../components/admin/adminLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin'); 

  return (
    <SaasProvider theme={theme}>
      <AuthProvider>
        {isAdminPage ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout
          announcementProps={announcement}
          headerProps={header}
          footerProps={footer}
        >
          <Component {...pageProps} />
        </Layout>
        )}
      </AuthProvider>
    </SaasProvider>
  );
}

export default MyApp;