import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@/styles/theme";
import "../styles/globals.css";

export const metadata: Metadata = {
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/icons/favicon-light.ico",
				href: "/icons/favicon-light.ico",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/icons/favicon-light.ico",
				href: "/icons/favicon-light.ico",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
