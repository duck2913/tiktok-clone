import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</GoogleOAuthProvider>
	);
}

export default MyApp;
