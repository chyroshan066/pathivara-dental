import { Metadata } from "next";
import { Dentist } from "./_components/Dentist/Dentist";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
    title: "Meet Dr. Heramb Kumar - Lead Dentist at Pathivara Dental Care and Implant Centre",
    description: "Learn about Dr. Heramb Kumar, lead dentist at Pathivara Dental Care and Implant Centre in Birtamode, Nepal. With 8+ years of experience in advanced dental care, specializing in dental implants, cosmetic dentistry, and comprehensive oral health treatments.",
    keywords: [
        "Dr. Heramb Kumar dentist",
        "lead dentist Pathivara Dental",
        "experienced dentist Birtamode",
        "dental specialist Nepal",
        "dentist biography",
        "qualified dentist Birtamode",
        "dental expert Nepal",
        "professional dentist Birtamode",
        "certified dentist",
        "dental surgeon Birtamode",
        "cosmetic dentist specialist",
        "implant dentist expert",
        "orthodontic specialist",
        "root canal specialist",
        "dental qualifications",
        "dentist credentials",
        "best dentist Birtamode",
        "experienced dental care",
        "dental professional Nepal",
        "Pathivara Dental team"
    ],
    authors: [{ name: "Pathivara Dental" }],
    creator: "Pathivara Dental",
    publisher: "Pathivara Dental",
    metadataBase: new URL("https://pathivaradentalcare.com.np"),
    alternates: {
        canonical: "/dentist",
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Meet Dr. Heramb Kumar - Lead Dentist at Pathivara Dental Care and Implant Centre",
        description: "Discover the expertise and qualifications of Dr. Heramb Kumar, our lead dentist with 8+ years of experience in advanced dental care, serving patients in Birtamode and surrounding areas.",
        type: "profile",
        locale: "en_US",
        url: `${baseURL}/dentist`,
        siteName: "Pathivara Dental",
        images: [
            {
                url: `${baseURL}/images/cta-baner.webp`,
                width: 1200,
                height: 630,
                alt: "Dr. Heramb Kumar - Lead Dentist at Pathivara Dental Care and Implant Centre",
            }
        ],
    },
    other: {
        "profile:first_name": "Heramb",
        "profile:last_name": "Kumar",
        "profile:username": "dr-heramb-kumar-pathivara-dental",
    },
    category: "health",
    classification: "Dental Professional Profile",
    referrer: "origin-when-cross-origin",
    applicationName: "Pathivara Dental",
    generator: "Next.js",
};

export default function DentistPage() {
    return <Dentist />;
}