import React from 'react';

interface UKSection {
  title: string;
  content: React.ReactNode;
}

interface UKContent {
  sections: UKSection[];
  versionDate: string;
  intro: string;
}

const ukContent: UKContent = {
  versionDate: 'October 10, 2023',
  intro: `The services and products described in this section of the website under “Solutions” are “controlled activities” and “controlled investments” within the meaning of the United Kingdom Financial Services and Markets Act 2000 (Financial Promotion) Order 2005 (the “FPO”). Their promotion or offering in the United Kingdom is restricted pursuant to the FPO, to, amongst others (a) persons having professional experience of participating in matters relating to investments, falling within Article 19 of the FPO (see detailed definition below) and (b) high net worth bodies corporate, partnerships, unincorporated associations, trusts, etc. falling within Article 49 of the FPO (see detailed definition below) (together, “Permitted Persons”).`,
  sections: [
    {
      title: 'Definitions:',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            1. Article 19 Investment professionals
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(a)</strong> a Financial Conduct Authority or Prudential
              Regulation Authority authorised person;
            </li>
            <li>
              <strong>(b)</strong> an exempt person where the communication
              relates to a controlled activity which is a regulated activity in
              relation to which the person is exempt;
            </li>
            <li>
              <strong>(c)</strong> any other person:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>(i)</strong> whose ordinary activities involve him in
              carrying on the controlled activity to which the communication
              relates for the purpose of a business carried on by him; or
            </li>
            <li>
              <strong>(ii)</strong> who it is reasonable to expect will carry on
              such activity for the purposes of a business carried on by him;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(d)</strong> a government, local authority (whether in the
              United Kingdom or elsewhere) or an international organisation;
            </li>
            <li>
              <strong>(e)</strong> a person (“A”) who is a director, officer or
              employee of a person (“B”) falling within any of (a) to (d) where
              the communication is made to A in that capacity and where A’s
              responsibilities when acting in that capacity involve him in the
              carrying on by B of controlled activities.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            2. Article 49 High net worth companies, unincorporated associations
            etc.
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(a)</strong> a body corporate which has, or which is a
              member of the same group as an undertaking which has, a called-up
              share capital or net assets of not less than:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>(i)</strong> if the body corporate has more than 20
              members or is a subsidiary undertaking of an undertaking which has
              more than 20 members, £500,000;
            </li>
            <li>
              <strong>(ii)</strong> otherwise, £5 million;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(b)</strong> an unincorporated association or partnership
              which has net assets of not less than £5 million;
            </li>
            <li>
              <strong>(c)</strong> the trustee of a high value trust i.e. a
              trust where the aggregate value of the cash and investments which
              form part of the trust’s assets (before deducting the amount of
              its liabilities)
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>(a)</strong> is £10 million or more; or{' '}
              <strong>(b)</strong> has been £10 million or more at anytime
              during the year immediately preceding the date on which the
              communication in question was first made or directed;
            </li>
            <li>
              <strong>(d)</strong> any person (“A”) whilst acting in the
              capacity of director, officer or employee of a person (“B”)
              falling within any of sub-paragraphs (a) to (c) where A’s
              responsibilities, when acting in that capacity, involve him in B’s
              engaging in investment activity.
            </li>
          </ul>
        </div>
      ),
    },
  ],
};

export default function UKResidents() {
  return (
    <div className="flex flex-col justify-center items-start text-white gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
      <h1 className="text-5xl font-bold">UK Residents</h1>

      <div className="text-base font-normal space-y-6">
        <p>Version date – {ukContent.versionDate}</p>
        <div className="space-y-4">
          {ukContent.intro
            .split('\n')
            .filter((line) => line.trim())
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </div>

        {ukContent.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="space-y-2">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
