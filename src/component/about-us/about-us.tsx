"use client"
import Image from "next/image"
import aboutus from "@/../public/svg/about-us-hero.svg"
import linkedin from "@/../public/svg/linkedin.svg"
import { contributors } from "@/data/contributors"
import Timeline from "./timeline-about-us"
import ContributorsSection from "./contributors"
import { description } from "@/constants/aboutusData"
import { CustomButton } from "../ui/custom-button"
import FadeInStagger from "../animations/FadeInStagger"
import { useFadeInScroll } from "@/hooks/useFadeInScroll"

export default function AboutUs() {
  useFadeInScroll()
  return (
    <div
      className="w-full h-fit px-[90px] flex flex-col radial-fix justify-center items-center space-y-16 py-[175px]
  max-xl:px-16 max-lg:px-8 max-md:px-4 max-md:space-y-12 md:py-0"
    >
      <div
        className="w-full h-fit flex justify-between items-center mt-[10%] 
        max-lg:flex-col-reverse max-lg:text-center max-lg:gap-10"
      >
        <div className="flex flex-col gap-6 text-white max-lg:items-center">
          <h1 className="text-6xl font-medium max-xl:text-5xl max-lg:text-4xl max-md:text-3xl">
            Building the Future of <br className="max-lg:hidden" /> Sustainable Energy, Today
          </h1>
          <h3 className="text-2xl font-normal max-xl:text-xl max-md:text-base leading-relaxed">
            At InfraFund, we leverage the power of technology to make investing in renewable energy projects accessible,
            transparent, and rewarding for everyone, everywhere. We are pushing the boundaries of traditional finance to
            enable you to directly invest in a greener future.
          </h3>
        </div>
        <Image
          src={aboutus || "/placeholder.svg"}
          width={497}
          height={497}
          alt="about-us-hero"
          className="max-lg:w-[350px] max-md:w-[280px]"
        />
      </div>
      <div
        className="w-full h-fit flex justify-between items-center 
        max-lg:flex-col max-lg:gap-10"
      >
        {description.map((item, index) => (
          <div className="flex flex-col justify-center items-center gap-4 text-center" key={index}>
            <Image
              src={item.img || "/placeholder.svg"}
              width={83}
              height={83}
              alt={item.title}
              className="max-md:w-[60px]"
            />
            <div className="flex flex-col gap-2 justify-center items-center text-white w-full max-w-[278px] px-2">
              <h2 className="text-2xl font-medium max-md:text-xl">{item.title}</h2>
              <p className="text-base font-normal max-md:text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="fade-in w-full">
        <div className="w-full h-fit flex flex-col gap-16 justify-center items-center relative">
          <div
            className="max-w-[1000px] w-full h-[400px] rounded-full absolute z-0 bottom-[5%] max-md:hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
              filter: "blur(400px)",
            }}
          />
          <div className="flex flex-col justify-center items-center gap-6 text-white text-center px-4">
            <h2 className="text-[42px] font-bold max-md:text-3xl">InfraFund Contributors</h2>
            <h3 className="text-2xl font-normal max-md:text-base max-md:leading-relaxed">
              A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance
            </h3>
          </div>

          <ContributorsSection contributors={contributors} linkedin={linkedin} />
        </div>
      </section>
      <section className="fade-in w-full">
        <div
          className="w-full h-fit min-h-[549px] flex justify-center items-center gap-6 relative 
        max-lg:flex-col max-lg:h-fit max-lg:gap-12 py-8"
        >
          <div
            className="max-w-[500px] w-full h-[500px] rounded-full absolute left-2 -bottom-[15%] max-md:hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
              filter: "blur(400px)",
            }}
          />
          <div
            className="w-1/2 h-full flex flex-col justify-evenly items-start text-white px-16 
          max-lg:w-full max-lg:px-4 max-lg:items-center max-lg:text-center max-lg:gap-6"
          >
            <h2 className="text-[100px] max-xl:text-7xl max-lg:text-5xl max-md:text-3xl">Our Story</h2>
            <p className="text-[17px] font-normal max-w-[533px] w-full max-lg:w-full max-md:text-sm leading-relaxed">
              Our story begins not with a company, but with a conviction: the mission to reach Net Zero is being stalled
              by a broken financial system. Our founder, Iman Alibeigi, drawing on his master&apos;s thesis and
              experience managing a $2B construction portfolio, saw a{" "}
              <strong>$3.5 trillion annual investment gap</strong> and a system that locked out the very communities it
              was meant to serve. With the support of the <strong>University of Exeter</strong>, the UK&apos;s first
              Climate Action Impact University, and the top-ranked <strong>SETsquared Partnership</strong>, this
              conviction was forged into a venture: <strong>InfraFund</strong>.
            </p>
          </div>
          <div className="w-1/2 flex h-full justify-center items-end max-lg:w-full">
            <div className="w-full max-w-[565px] aspect-[565/377] rounded-[50px] bg-[url('/image/our-story.jpg')] bg-cover bg-no-repeat relative max-md:w-[90%]">
              <div className="px-2.5 py-1 bg-[#191C2980] backdrop-blur-md w-fit rounded-[45px] flex justify-center items-center absolute bottom-3 left-5">
                <span className="text-xs font-normal text-white">Photo credits to Appleton Event Photography</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FadeInStagger single>
        <Timeline />
      </FadeInStagger>
      <section className="fade-in">
        <div className="w-full h-fit flex flex-col gap-12 justify-center items-center text-white text-center relative px-4">
          <h2 className="text-5xl font-bold max-md:text-3xl">Let&apos;s Build the Green Future Together</h2>
          <h3 className="text-2xl font-normal max-w-[937px] w-full max-lg:w-full max-md:text-base leading-relaxed">
            Whether you&apos;re an investor ready to make an impact or a builder with a vision, we&apos;re here to help.
            Reach out to our team to get started.
          </h3>
          <CustomButton
            variant="filled"
            className="w-fit h-12 flex justify-center items-center px-6 text-base font-semibold
                     max-md:w-[130px] max-md:h-10 max-md:text-[13px] max-md:px-3 max-md:font-medium"
          >
            Contact Us
          </CustomButton>
          <div
            className="max-w-[1300px] w-full h-[400px] rounded-full absolute z-0 max-md:hidden"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
              filter: "blur(400px)",
            }}
          />
        </div>
      </section>
    </div>
  )
}
