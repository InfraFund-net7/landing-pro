'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function BlogContents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main-heading');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'main-heading',
        'tokenization',
        'benefits',
        'case-studies',
        'challenges',
        'conclusion',
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -130;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen relative py-[175px] ">
      <div className="lg:hidden fixed top-[20%] left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md text-black rounded-full p-2 border border-gray-200"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-[999] p-6 overflow-y-auto transform transition-transform duration-300 lg:hidden
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-6 text-black">
          <h2 className="text-lg font-semibold ">Contents</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-4">
          {[
            {
              id: 'main-heading',
              label: 'Green Assets and the Liquidity Challenge',
            },
            {
              id: 'tokenization',
              label: 'What is Tokenization and How Does It Work?',
            },
            {
              id: 'benefits',
              label: 'Key Benefits of Tokenization for Green Assets',
            },
            {
              id: 'case-studies',
              label: 'Case Studies: From Carbon Credits to Solar Energy',
            },
            { id: 'challenges', label: 'Challenges and the Road Ahead' },
            { id: 'conclusion', label: 'Conclusion' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-left text-sm text-black leading-snug w-full ${
                activeSection === item.id ? 'font-black' : 'font-medium'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <main className="p-4 sm:p-6 md:p-8 lg:p-16 w-full flex flex-col lg:flex-row gap-6 relative">
        <div className="hidden lg:block w-[404px] h-fit sticky top-[130px] self-start">
          <nav className="space-y-6">
            <button
              onClick={() => scrollToSection('main-heading')}
              className={`block text-left w-full  transition-colors cursor-pointer ${
                activeSection === 'main-heading'
                  ? 'text-foreground font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <h2 className="text-lg font-semibold flex items-start gap-2">
                {activeSection === 'main-heading' && <span>»</span>}
                <span
                  className={activeSection === 'main-heading' ? '' : 'ml-7'}
                >
                  Green Assets and the Liquidity Challenge
                </span>
              </h2>
            </button>
            <ul className="space-y-4">
              {[
                {
                  id: 'tokenization',
                  label: 'What is Tokenization and How Does It Work?',
                },
                {
                  id: 'benefits',
                  label: 'Key Benefits of Tokenization for Green Assets',
                },
                {
                  id: 'case-studies',
                  label: 'Case Studies: From Carbon Credits to Solar Energy',
                },
                { id: 'challenges', label: 'Challenges and the Road Ahead' },
                { id: 'conclusion', label: 'Conclusion' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-start gap-2 transition-colors text-left w-full cursor-pointer ${
                      activeSection === item.id
                        ? 'text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {activeSection === item.id && <span>»</span>}
                    <span className={activeSection === item.id ? '' : 'ml-7'}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <article className="w-full lg:w-[835px] space-y-12">
          {[
            {
              id: 'main-heading',
              title: 'Green Assets and the Liquidity Challenge',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
            {
              id: 'tokenization',
              title: 'What is Tokenization and How Does It Work?',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
            {
              id: 'benefits',
              title: 'Key Benefits of Tokenization for Green Assets',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
            {
              id: 'case-studies',
              title: 'Case Studies: From Carbon Credits to Solar Energy',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
            {
              id: 'challenges',
              title: 'Challenges and the Road Ahead',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
            {
              id: 'conclusion',
              title: 'Conclusion',
              description: `Tokenization represents a transformative opportunity to unlock capital for green assets and accelerate the
                            transition to a sustainable future. By addressing the liquidity and accessibility challenges that have
                            historically limited investment in renewable energy and nature-based solutions, tokenization can help
                            bridge the funding gap for critical climate projects. The technology offers benefits for all stakeholders:
                            developers gain access to faster, more efficient funding; investors can participate in high-quality green
                            investments with greater flexibility; and the planet benefits from accelerated deployment of sustainable
                            infrastructure. While challenges remain, the momentum behind tokenization is building, with increasing
                            numbers of projects demonstrating its viability and value. As regulatory frameworks mature and technical
                            infrastructure improves, tokenization is poised to become a mainstream tool in green finance, helping to
                            mobilize the trillions of dollars needed to achieve global climate goals and create a more sustainable
                            world for future generations.`,
            },
          ].map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-balance">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-foreground leading-relaxed text-justify">
                {section.description}
              </p>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
