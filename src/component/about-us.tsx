import React from 'react'
import Image from 'next/image'
import aboutus from "@/../public/svg/about-us-hero.svg"
import aboutusvision from "@/../public/svg/about-us-vision.svg"
import aboutusmission from "@/../public/svg/about-us-mission.svg"
import aboutusvalue from "@/../public/svg/about-us-value.svg"
import linkedin from "@/../public/svg/linkedin.svg"
import { contributors } from '@/data/contributors'
import Timeline from './timeline-about-us'
export default function AboutUs() {
  const description = [
    {
      img: aboutusvision,
      title: "Our Vision",
      description: "Our vision is a world where sustainable energy infrastructure is globally crowd-funded, fostering a healthier planet and a resilient economy for all.",
    },
    {
      img: aboutusmission,
      title: "Our Mission",
      description: "Our mission is to democratize investment in vital green assets. We provide a platform that enables anyone to fund the future of energy, directly from their device.",
    },
    {
      img: aboutusvalue,
      title: "Our Values",
      description: "We are committed to Transparency in every transaction, Accessibility for all investors, and creating measurable Impact for our planet.",
    },
  ]
  return (
    <div className='w-full h-fit px-[90px]  flex flex-col justify-center items-center space-y-16'>
      <div className='w-full h-fit flex justify-between items-center mt-[10%] '>
        <div className='flex flex-col gap-6 text-white'>
          <h1 className='text-6xl font-medium'>Building the Future of <br /> Sustainable Energy, Today</h1>
          <h3 className='text-2xl font-normal'>At InfraFund, we leverage the power of technology to make investing <br /> in renewable energy projects accessible, transparent, and rewarding <br /> for everyone, everywhere. We are pushing the boundaries of <br /> traditional finance to enable you to directly invest in a greener future.</h3>
        </div>
        <Image src={aboutus} width={497} height={497} alt='about-us-hero' />
      </div>
      <div className='w-full h-fit flex justify-between items-center'>
        {description.map((item, index) => (
          <div className='flex flex-col justify-center items-center gap-4' key={index}>
            <Image src={item.img} width={83} height={83} alt={item.title} />
            <div className='flex flex-col gap-2 justify-center items-center text-white w-[278px] text-center'>
              <h2 className='text-2xl font-medium'>{item.title}</h2>
              <p className='text-base font-normal'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full h-fit flex flex-col gap-16 justify-center items-center relative'>
        <div className="w-[1000px] h-[400px] rounded-full absolute z-0 bottom-[5%]" style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
          filter: "blur(400px)",
        }} />
        <div className='flex flex-col justify-center items-center gap-6 text-white'>
          <h2 className='text-[42px] font-bold'>InfraFund Contributors</h2>
          <h3 className='text-2xl font-normal'>A world-class team built to bridge the worlds of traditional infrastructure and decentralized finance</h3>
        </div>
        <div className="grid grid-cols-5 gap-x-[78px] gap-y-[48px]">
          {contributors.map((item, index) => (
            <div className="w-fit h-[256px] flex flex-col gap-4 justify-center items-center group relative" key={index}>
              <div className="relative">
                <Image
                  src={item.img}
                  width={190}
                  height={190}
                  className="rounded-[40px] w-[190px] h-[190px] grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                  alt={item.name}
                />
                <div
                  className="absolute bottom-1 left-1 right-1 rounded-[40px] bg-[#191C2980] backdrop-blur-md text-[10px] p-3  text-white text-center opacity-0 translate-y-full transition-all duration-500 ease-in-out  group-hover:opacity-100 group-hover:translate-y-0"
                >
                  {item.description}
                </div>
              </div>
              <div className="w-fit h-fit flex flex-col gap-1 justify-center items-center">
                <div className="flex justify-center items-center gap-2 w-full h-fit">
                  <a
                    href={item.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.name} on LinkedIn`}
                    className="group inline-flex items-center"
                  >
                    <Image src={linkedin} alt="linkedin" width={20} height={20} />
                  </a>
                  <h3 className="text-[20px] font-normal">{item.name}</h3>
                </div>
                <h4 className="w-[225px] text-sm font-normal text-gray-500 text-center">{item.role}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full h-[549px] flex justify-center items-center gap-6 relative'>
        <div className="w-[500px] h-[500px] rounded-full absolute left-2 -bottom-[15%]" style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
          filter: "blur(400px)",
        }} />
        <div className='w-1/2 h-full flex flex-col justify-evenly items-start text-white px-16'>
          <h2 className='text-[100px]'>Our Story</h2>
          <p className='text-[17px] font-normal w-[533px]'>Our story begins not with a company, but with a conviction: the mission<br /> to reach Net Zero is being stalled by a broken financial system. Our<br /> founder, Iman Alibeigi, drawing on his master's thesis and experience<br /> managing a $2B construction portfolio, saw a <strong>$3.5 trillion annual<br /> investment gap</strong> and a system that locked out the very communities it<br /> was meant to serve. With the support of the <strong>University of Exeter</strong>, the<br /> UK's first Climate Action Impact University, and the top-ranked <br /><strong>SETsquared Partnership</strong>, this conviction was forged into a venture:<br /> <strong>InfraFund</strong>.</p>
        </div>
        <div className='w-1/2 flex h-full justify-center items-end '>
          <div className="w-[565px] h-[377px]  rounded-[50px] bg-[url('/image/our-story.jpg')] bg-cover bg-no-repeat relative">
            <div className='px-2.5 py-1 bg-[#191C2980] backdrop-blur-md w-fit rounded-[45px] flex justify-center items-center absolute bottom-3 left-5'>
              <span className='text-xs font-normal text-white'>
                Photo credits to Appleton Event Photography
              </span>
            </div>
          </div>
        </div>
      </div>
      <Timeline />
      <div className='w-full h-fit flex flex-col gap-12 justify-center items-center text-white text-center relative'>
        <h2 className='text-5xl font-bold'>Let&apos;s Build the Green Future Together</h2>
        <h3 className='text-2xl font-normal w-[937px]'>Whether you&apos;re an investor ready to make an impact or a builder with a vision, we&apos;re
          here to help. Reach out to our team to get started.
        </h3>
        <button className='w-[184px] h-12 flex justify-center items-center bg-[#24FF8E] text-black rounded-sm'>
          Contact Us
        </button>
        <div className="w-[1300px] h-[400px] rounded-full absolute z-0" style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(52, 82, 142, 0.4) 8.17%, rgba(89, 120, 186, 0.4) 100%)",
          filter: "blur(400px)",
        }} />
      </div>
    </div>
  )
}