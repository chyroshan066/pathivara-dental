"use client";

import { memo } from "react";
import { IonIcon } from "../utility/IonIcon";
import styles from "./Branch.module.css";

interface BranchData {
    name: string;
    location: string;
    phone: string;
    email?: string;
    timing: string;
    mapLink: string;
}

const BRANCHES: BranchData[] = [
    {
        name: "Pathivara Dental Care & Implant Centre - Birtamode Branch",
        location: "Opposite to Hotel Hicola, Birtamode, Jhapa, Nepal",
        phone: "023-536424",
        email: "herambjhabpkihs@gmail.com",
        timing: "9:00 AM - 6:00 PM (Daily)",
        mapLink: "https://www.google.com/maps/place/Pathivara+Dental+Care+%26+Implant+Center+Pvt.+Ltd/@26.6431114,87.9905726,17z/data=!3m1!4b1!4m6!3m5!1s0x39e5ba606ebb7741:0x4b8fc5e3d62f98eb!8m2!3d26.6431066!4d87.9931475!16s%2Fg%2F11c60g7c3d?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "Pathivara Apollo Dental Clinic - Dhulabari Branch",
        location: "Near Atithi Sadan, Dhulabari, Jhapa, Nepal",
        phone: "023-564142",
        email: "herambjhabpkihs@gmail.com",
        timing: "9:00 AM - 6:00 PM (Daily)",
        mapLink: "https://www.google.com/maps/place/Pathibhara+apollo+dental+clinic/@26.6607785,88.0955061,16.1z/data=!4m6!3m5!1s0x39e5b3a2262efc63:0x2dcb5a9e7a97b4b!8m2!3d26.6602595!4d88.1007196!16s%2Fg%2F11rls4n6sf?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
    },
    {
        name: "New Pathivara Dental Care & Implant Centre - Birtamode Branch",
        location: "Near Atithi Sadan, Birtamode, Jhapa, Nepal",
        phone: "9842051732",
        email: "herambjhabpkihs@gmail.com",
        timing: "9:00 AM - 6:00 PM (Daily)",
        mapLink: "https://www.google.com/maps/place/Atithi+Sadan,+Birtamod/@26.6445546,87.9888598,19.1z/data=!4m14!1m7!3m6!1s0x39e5ba606ebb7741:0x4b8fc5e3d62f98eb!2sPathivara+Dental+Care+%26+Implant+Center+Pvt.+Ltd!8m2!3d26.6431066!4d87.9931475!16s%2Fg%2F11c60g7c3d!3m5!1s0x39e5bbf30e18d899:0x6d7b00d815205f1e!8m2!3d26.6447428!4d87.9889347!16s%2Fg%2F11spdywy4y?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
    },
];

const BranchCard = memo(({
    name, location, phone, email, timing, mapLink
}: BranchData) => (
    <div className={styles.branchCard}>
        <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
                <IonIcon name="business-outline" />
            </div>
            <h3 className="h3">{name}</h3>
        </div>

        <div className={styles.cardBody}>
            <div className={styles.infoItem}>
                <IonIcon name="location-outline" />
                <div>
                    <p className={styles.infoLabel}>Location</p>
                    <p className={styles.infoText}>{location}</p>
                </div>
            </div>

            <div className={styles.infoItem}>
                <IonIcon name="call-outline" />
                <div>
                    <p className={styles.infoLabel}>Phone</p>
                    <a
                        href={`tel:+977${phone.replace(/-/g, '')}`}
                        className={styles.infoLink}
                    >
                        {phone}
                    </a>
                </div>
            </div>

            {email && (
                <div className={styles.infoItem}>
                    <IonIcon name="mail-outline" />
                    <div>
                        <p className={styles.infoLabel}>Email</p>
                        <a
                            href={`mailto:${email}`}
                            className={styles.infoLink}
                        >
                            {email}
                        </a>
                    </div>
                </div>
            )}

            <div className={styles.infoItem}>
                <IonIcon name="time-outline" />
                <div>
                    <p className={styles.infoLabel}>Timing</p>
                    <p className={styles.infoText}>{timing}</p>
                </div>
            </div>
        </div>

        <div className={styles.cardFooter}>
            <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapButton}
            >
                <IonIcon name="navigate-outline" />
                <span>Get Directions</span>
            </a>
            <a
                href={`tel:+977${phone.replace(/-/g, '')}`}
                className={styles.callButton}
            >
                <IonIcon name="call-outline" />
                <span>Call Now</span>
            </a>
        </div>
    </div>
));

BranchCard.displayName = "BranchCard";

export const Branch = memo(() => (
    <section
        className={`section ${styles.branch}`}
        id="branches"
        aria-label="branches"
    >
        <div className="custom-container">
            <div className="text-center">
                <p className="section-subtitle">Our Locations</p>
                <h2 className="h2 section-title">Visit Our Branches</h2>
                <p
                    className="section-text"
                    style={{
                        maxWidth: '700px',
                        margin: '20px auto 60px',
                        color: 'var(--teal-gray)'
                    }}
                >
                    We have multiple branches across Jhapa to serve you better.
                    Visit the nearest branch for comprehensive dental care and
                    expert treatment with modern facilities.
                </p>
            </div>

            <div className={styles.branchGrid}>
                {BRANCHES.map((branch, index) => (
                    <BranchCard
                        key={index}
                        name={branch.name}
                        location={branch.location}
                        phone={branch.phone}
                        email={branch.email}
                        timing={branch.timing}
                        mapLink={branch.mapLink}
                    />
                ))}
            </div>
        </div>
    </section>
));

Branch.displayName = "Branch";