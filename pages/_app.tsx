// import type { AppProps } from "next/app";
// import { AuthProvider } from "@saas-ui/auth";
// import { SaasProvider } from "@saas-ui/react";
// import { Layout } from "components/layout";
// import theme from "../theme";

// function MyApp({ Component, pageProps }: AppProps) {
//   const { announcement, header, footer } = pageProps;

//   return (
//     <SaasProvider theme={theme}>
//       <AuthProvider>
//         <Layout
//           announcementProps={announcement}
//           headerProps={header}
//           footerProps={footer}
//         >
//           <Component {...pageProps} />
//         </Layout>
//       </AuthProvider>
//     </SaasProvider>
//   );
// }

// export default MyApp;


// Originall
import type { AppProps } from "next/app";
import { AuthProvider } from "@saas-ui/auth";
import { SaasProvider } from "@saas-ui/react";
import { Layout } from "components/layout";
import theme from "../theme";
import { auth } from "../utils/firebaseClient"; // Import firebase auth

function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;

  return (
    <SaasProvider theme={theme}>
      <AuthProvider auth={auth}>
        <Layout
          announcementProps={announcement}
          headerProps={header}
          footerProps={footer}
        >
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SaasProvider>
  );
}

export default MyApp;
