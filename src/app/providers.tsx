"use client";

import { ProfilesProvider } from "@/context/profiles";

export default function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <ProfilesProvider>{children}</ProfilesProvider>;
}
