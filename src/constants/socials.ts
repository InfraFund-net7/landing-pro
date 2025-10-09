import { Instagram, Linkedin } from "lucide-react";
import telegram from "@/../public/svg/Telegram.svg";
import X from "@/../public/svg/X.svg";

export const socials = [
    {
        name: "linkedin",
        icon: Linkedin,
        type: "component",
        link: "https://www.linkedin.com/company/infrafund-net/",
    },
    {
        name: "X",
        icon: X,
        type: "image",
        link: "https://x.com/InfraFund_net",
    },
    {
        name: "Telegram",
        icon: telegram,
        type: "image",
        link: "https://t.me/InfraFund",
    },
    {
        name: "Instagram",
        icon: Instagram,
        type: "component",
        link: "https://www.instagram.com/infrafund?igsh=eHhuMWtxeTZsanR2&utm_source=qr",
    },
];