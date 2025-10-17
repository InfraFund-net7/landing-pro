import React from "react";
import { Metadata } from "next";
import ProjectPage from "@/component/project-page";

export const metadata: Metadata = {
    title: "Projects | InfraFund - Open NetZero Investments",
    description:
        "Explore high-impact renewable energy and infrastructure projects with transparent returns. Invest directly in the future of sustainable energy through InfraFund.",
    keywords: [
        "InfraFund projects",
        "renewable energy investments",
        "green infrastructure",
        "NetZero funds",
        "sustainable investing",
    ],
    openGraph: {
        title: "Projects | InfraFund",
        description:
            "Discover and invest in verified sustainable projects that power the global transition to NetZero.",
        url: "https://infrafund.io/projects",
        siteName: "InfraFund",
        images: [
            {
                url: "/image/project-hero.png",
                width: 1200,
                height: 630,
                alt: "InfraFund Projects",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "InfraFund Projects",
        description:
            "Explore high-impact renewable energy and infrastructure projects with transparent returns.",
        images: ["/image/project-hero.png"],
    },
};

export default function Page() {
    return <ProjectPage />;
}
