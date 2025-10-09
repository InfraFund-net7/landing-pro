type TimelineItem = {
    quarter: string
    description: string
    logos?: string[]
}
export const timelineData: TimelineItem[] = [
    {
        quarter: "Q1 2024",
        description:
            "The Spark of Innovation Our journey began when InfraFund was incubated and accelerated by the prestigious SETsquared Partnership, delivered by the University of Exeter.",
        logos: ["SETSquared", "ExeterStudent", "ExeterSustainability"],
    },
    {
        quarter: "Q2 2024",
        description:
            "Building with World-Class Partners Momentum grew quickly. By April 2024, we were accepted into the Innovate UK ICURe programme, securing £3,700 in funding to deeply explore the market and validate our assumptions with renewable energy developers. We also secured a significant boost from the Microsoft for Startups program, receiving $150,000 in credits to build our platform on a world-class infrastructure.",
        logos: ["ICURe", "Microsoft", "MicrosoftStartup", "InnovateUK"],
    },
    {
        quarter: "Q3 2024",
        description:
            "Gaining Industry-Wide Recognition By September, our innovative approach was recognized across the industry. We were honored with the Autodesk Technology Impact award, securing $53,400 in software donation to develop our AI-driven digital twins for a more transparent investment platform.",
        logos: ["Autodesk"],
    },
    {
        quarter: "Q4 2024",
        description:
            "We were also accepted into the Innovate UK Scaling the Edge NetZero program, securing £10,000 in funding to further our market validation.",
        logos: ["InnovateUK", "ScalingEdge", "ExeterSustainability", "HelixWay"],
    },
    {
        quarter: "Q1 2025",
        description:
            "Deepening our Web3 Credentials Entering 2025, we validated our cutting-edge blockchain technology on a global stage.",
        logos: ["Soonami"],
    },
    {
        quarter: "Q2 2025",
        description:
            "Also were selected for the Uniswap Hook Incubator, placing us at the forefront of decentralized finance innovation.",
        logos: ["Uniswap", "UniswapHook", "TechSouthWest", "Growth"],
    },
    {
        quarter: "Q3 2025",
        description:
            "Poised for Impact With the backing of over a dozen leading innovation ecosystems and more than 16 expressions of interest from renewable energy developers, InfraFund is poised to redefine the future of sustainable energy finance.",
    },
    {
        quarter: "Today",
        description:
            "Poised for Impact With the backing of over a dozen leading innovation ecosystems and more than 16 expressions of interest from renewable energy developers, InfraFund is poised to redefine the future of sustainable energy finance.",
    },
]