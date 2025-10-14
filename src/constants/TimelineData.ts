type TimelineItem = {
    quarter: string
    description: string
    logos?: string[]
}
export const timelineData: TimelineItem[] = [
    {
        quarter: "Q1 2024: The Spark of Innovation",
        description:
            `Our journey officially began as we were incubated and accelerated by <br/> the prestigious <strong>SETsquared Partnership<strong>. We immediately made our <br/> mark by winning the <strong>Environmental Impact Award<strong>, a powerful validation of our mission-driven approach from day one.`,
        logos: ["SETSquared", "ExeterUniversity", "ExeterStudent", "Exeter"],
    },
    {
        quarter: "Q2 2024: From Theory to Market Validation",
        description:
            "An idea is only as strong as its real-world application. In April, we were accepted into the Innovate UK ICURe programme, securing £3,700 in funding not just to build, but to listen. We spent this time in deep conversation with renewable energy developers, validating our assumptions. This was supercharged by a $150,000 credit grant from the Microsoft for Startups program, giving us the world-class infrastructure to turn these insights into a technical reality.",
        logos: ["InnovateUK", "ICURe", "Microsoft", "MicrosoftStartup",],
    },
    {
        quarter: "Q3 2024: Gaining Industry-Wide Recognition",
        description:
            "By September, the industry was taking notice. We were honored with the Autodesk Technology Impact award, securing $53,400 in software to build the heart of our platform: the AI-driven digital twin. We were also accepted into the Innovate UK Scaling the Edge NetZero program, securing £10,000 in funding to accelerate our market strategy.",
        logos: ["Autodesk", "HelixWay", "InnovateUK", "ScalingEdge"],
    },
    {
        quarter: "Q4 2024: Building Our Foundation",
        description:
            "As 2024 came to a close, we focused on building a rock-solid foundation. In November, InfraNetZero LTD (16106798) was officially incorporated. We began to solidify our world-class team, formalising partnerships with our technical, business, legal, financial, and marketing advisers through KPI-based agreements. This period of professionalisation was capped off by being named a finalist at the prestigious Exeter Sustainability Awards.",
        logos: ["CompaniesHouse", "ExeterSustainability"],
    },
    {
        quarter: "Q1 2025 \n Deepening our Roots and Web3 Credentials",
        description:
            "Entering 2025, we became a proud member of the NetZero Hub at the University of Exeter, by supporting them in their successful £6.5m UKRI application to cut NHS carbon footprint, placing us at the heart of innovation for a sustainable future. We then proved our expertise on a global stage by securing a place in the Soonami.io web3 Accelerator. and being selected for the Tech South West Growth Forge Accelerator, In the category of ClimateTech validating our position at the forefront of climate industry.",
        logos: ["ExeterUniversity", "Soonami", "TechSouthWest", "Growth"],
    },
    {
        quarter: "Q2 2025: Shaping the National Conversation",
        description:
            "In a landmark achievement, our solution for community-led energy was published as written evidence on the official UK Parliament portal on June 3rd. This elevated our work from a startup project to a nationally recognised potential solution, positioning InfraFund as a key voice in shaping the future of UK energy policy, and being selected for the Uniswap Hook Incubator, validating our position at the forefront of decentralised finance.",
        logos: ["UkParliamnet", "Uniswap", "UniswapHook"],
    },
    {
        quarter: "Q3 2025: Poised for Impact",
        description:
            "The validation from the market has been our guiding light. With the backing of over a dozen leading innovation ecosystems, we have now secured over 16 expressions of interest from renowned renewable energy developers and NetZero projects. This is not just interest; it is a clear demand from the industry for a new way of financing the future.",
    },
    {
        quarter: "Today",
        description:
            "Today, we are heads-down, laser-focused on development. We are building V2 of the InfraFund platform, the production-ready version that will onboard our first pilot projects. The culmination of our research, validation, and policy recognition is being poured into a platform that will not just finance projects, but will redefine the relationship between communities and the energy they consume, helping to decarbonise our future, one project at a time.",
    },
]