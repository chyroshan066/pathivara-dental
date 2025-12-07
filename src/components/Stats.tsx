import { memo } from "react";

interface Stats {
    title: string;
    description: string;
}

const STATS: Stats[] = [
    {
        title: "Digital X-Ray",
        description: "90% Less Radiation",
    },
    {
        title: "In-House Lab",
        description: "Same Day Service",
    },
    {
        title: "Best Quality Root Canals",
        description: "Quick & Accurate Dental Procedures",
    },
];

export const Stats = memo(() => (
    <div className="custom-container mt-45">

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '80px',
            padding: '50px 30px',
            background: 'linear-gradient(135deg, var(--pale-aqua) 0%, var(--soft-mint_50) 100%)',
            borderRadius: 'var(--radius-6)',
            textAlign: 'center'
        }}>

            {STATS.map((stat, index) => (
                <div key={index}>
                    <h3
                        className="h25"
                        style={{
                            color: 'var(--vibrant-coral)',
                            marginBottom: '10px'
                        }}
                    >
                        {stat.title}
                    </h3>
                    <p style={{ color: 'var(--teal-gray)', fontSize: '1.4rem' }}>
                        {stat.description}
                    </p>
                </div>
            ))}

        </div>
    </div>
));

Stats.displayName = "Stats";