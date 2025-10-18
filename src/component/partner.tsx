import { partners } from "@/data/partners";
import Image from "next/image";

export default function PartnersSection() {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12 px-2 sm:px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex animate-slide-infinite gap-6 sm:gap-8 md:gap-10">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out flex-shrink-0"
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.alt}
                  width={100}
                  height={32}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
