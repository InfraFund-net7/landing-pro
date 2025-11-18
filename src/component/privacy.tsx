import React from 'react';

interface PrivacySection {
  title: string;
  content: React.ReactNode;
}

interface PrivacyContent {
  sections: PrivacySection[];
  lastUpdated: string;
  intro: string;
  cookieLink: string;
}

const privacyContent: PrivacyContent = {
  lastUpdated: '15 Jun 2024',
  intro: `InfraFund (“InfraFund”, “we”, or “us”) is committed to protecting the privacy of our customers, and we take our data protection responsibilities with the utmost seriousness.

This Privacy Notice describes how InfraFund collects and processes your personal data through the InfraFund websites and applications that are referenced in this Privacy Notice. InfraFund refers to an ecosystem comprising InfraFund websites (whose domain names include but are not limited to www.InfraFund.net), mobile applications, clients, applets and other applications that are developed to offer InfraFund Services, and includes independently-operated platforms, websites and clients within the ecosystem (e.g., InfraFund’s Open Platform, InfraFund Launchpad, InfraFund Labs, InfraFund Charity, InfraFund DEX, InfraFund X, JEX, and fiat gateways).

This Privacy Notice applies to all Personal data processing activities carried out by us, across platforms, websites, and departments of InfraFund.

To the extent that you are a customer or user of our services, this Privacy Notice applies together with any terms of business and other contractual documents, including but not limited to any agreements we may have with you.

To the extent that you are not a relevant stakeholder, customer, or user of our services, but are using our website, this Privacy Notice also applies to you together with our Cookie Notice.

This Notice should therefore be read together with our Cookie Notice, which provides further details on our use of cookies on the website. Our Cookie Notice can be accessed here.`,
  cookieLink: '#',
  sections: [
    {
      title: '1. What Personal Data does InfraFund collect and process?',
      content: (
        <div className="space-y-4">
          <p>
            Personal data is data that identifies an individual or relates to an
            identifiable individual. This includes information you provide to
            us, information which is collected about you automatically, and
            information we obtain from third parties.
          </p>

          <h3 className="text-xl font-semibold">
            Information you provide to us
          </h3>
          <p>
            To open an account and access our services, we&apos;ll ask you to
            provide us with some information about yourself. This information is
            either required by law (e.g., to verify your identity and comply
            with “Know Your Customer” obligations), necessary to provide the
            requested services (e.g., you will need to provide your email
            address in order to open your account), or is relevant for certain
            specified purposes, described in greater detail below. In some
            cases, if we add services and features you may be asked to provide
            us with additional information.
          </p>

          <p>
            Failure in providing the data required implies that InfraFund will
            not be able to offer you our services.
          </p>

          <p>We may collect the following types of information from you:</p>

          <h4 className="text-lg font-semibold">
            Category of Personal Data / Types of Personal Data:
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Personal Identification Data:</strong> Full name, e-mail
              address, gender, home address, phone number, date of birth,
              nationality, signature, utility bills, photographs, and a video or
              voice recording of you
            </li>
            <li>
              <strong>Sensitive and Biometric Personal Data:</strong> InfraFund
              may also collect sensitive personal data when permitted by local
              law or with your consent, such as biometric information, for
              example to verify your identity by comparing the facial scan data
              extracted from your selfie or video with the photo in your
              government issued identity document
            </li>
            <li>
              <strong>Government Identifiers:</strong> Government issued
              identity documents such as passport, national identification
              number, national identity card details, drivers licence numbers
            </li>
            <li>
              <strong>Online Identifiers:</strong> Social media domains/
              profiles (such as Telegram, X, etc.)
            </li>
            <li>
              <strong>Institutional Information:</strong> Proof of legal
              formation, personal identification data for all material
              beneficial owners, personal data about the board of directors
              senior persons responsible for the operations of the body
              corporate
            </li>
            <li>
              <strong>Financial Information:</strong> Bank account information,
              payment card information, source of funding, source of wealth,
              InfraFund account information, InfraFund user ID and pay ID
            </li>
            <li>
              <strong>Wallet Information:</strong> Wallet address, wallet ID,
              and other information related to integrations that you select
            </li>
            <li>
              <strong>Transaction Information:</strong> Information about the
              transaction you make on our services, such as the name of the
              recipient, your name and e-mail
            </li>
            <li>
              <strong>Information from Cookies:</strong> See our Cookie Notice
              for more information.
            </li>
            <li>
              <strong>Employment Information:</strong> Job title, salary wage
              rate, and company
            </li>
            <li>
              <strong>Communications:</strong> Surveys responses, information
              contained in the Survey. Communications with us including call
              recordings with our customer services team.
            </li>
            <li>
              <strong>Contact Information:</strong> E-mail address, country,
              region,
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            Information we collect from you automatically
          </h3>
          <p>
            To the extent permitted under the applicable law, we may collect
            certain types of information automatically, for example whenever you
            interact with us or use the services. This information helps us
            address customer support issues, improve the performance of our
            sites and services, maintain and or improve your user experience,
            and protect your account from fraud by detecting unauthorized
            access.
          </p>

          <p>Information collected automatically includes:</p>

          <h4 className="text-lg font-semibold">
            Category of Personal Data / Types of Personal Data:
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Browsing Information:</strong> Device ID, browsing
              information such as name and version, Internet Protocol (“IP”)
              address , internet connectivity data, operator and carrier data,
              login data, browser type and version, device type category and
              model, time zone setting and location data, language data,
              application version. browser plug-in types and versions, operating
              system and platform, other information stored on or available
              regarding the devices you allow us access to when you visit our
              Platforms
            </li>
            <li>
              <strong>Usage Data:</strong> Authentication data, security
              questions, click-stream data, public social networking posts, and
              other data collected via cookies or similar technologies.
              Information about how our Services are performing when you use
              them, e.g., error messages you receive, performance of the site
              information, other diagnosis data.
            </li>
            <li>
              <strong>Marketing and Research Information:</strong> Identifiers –
              the IP address, or other online identifiers of a person, e-mail
              address if used for direct marketing, and name and address.
              Demographic data - (e.g., income, family status, age bracket,
              gender, interests, etc). Browser/web history data and preferences
              expressed through selection/viewing/purchase of goods, services
              and content, information about your mobile device including (where
              available) type of device, device identification number, mobile
              operating system. Analytics and profiles of the individuals based
              on the data collected on them. For more information about this
              please see our Cookie Policy. Interests or inferred interests and
              marketing preferences.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            Information we collect from our affiliates and third parties
          </h3>
          <p>
            From time to time, we may obtain information about you from our
            affiliates or third parties sources as required or permitted by
            applicable law.
          </p>

          <h4 className="text-lg font-semibold">
            Category of Personal Data / Type of Personal Data:
          </h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Affiliates:</strong> In accordance with applicable law, we
              may obtain information about you from the group of companies
              related to us by common control or ownership (“Affiliates”) as a
              normal part of conducting business, so that we may offer our
              Affiliates’ Services to you. We may obtain information about you
              such as Personal Identification Data, Transactional Information,
              Institutional Information, Usage Information. For example, if you
              want to convert cryptocurrency into fiat and make withdrawals into
              your bank account, we might need to exchange information with
              InfraFund Connect. For more information about how InfraFund
              Connect processes this information you can check its Privacy
              Notice here.
            </li>
            <li>
              <strong>Blockchain Data:</strong> We may analyze public blockchain
              data, such as transaction ID’s, transaction amounts, wallet
              address, timestamps or transactions or events.
            </li>
            <li>
              <strong>Retail Merchant Information:</strong> When conducting a
              transaction with a third-party merchant, the merchant may provide
              us with personal data about you such as name, contact information,
              transaction information.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title:
        '2. Why does InfraFund process my personal data? Which legal bases are we relying on for our collection and processing of your personal data?',
      content: (
        <div className="space-y-4">
          <p>
            Our primary purpose in collecting personal data is to provide our
            services in a secure, efficient, and smooth way. We generally use
            your personal data to deliver, provide, operate, our services, and
            for content and advertising, and for loss prevention and anti-fraud
            purposes. Below you’ll find an explanation on how we use Automated
            individual decision-making, including profiling. InfraFund does not
            rely solely on automated tools to help determine whether a
            transaction or a customer account presents a fraud or legal risk.
          </p>

          <h4 className="text-lg font-semibold">
            Why does InfraFund process my Personal Data? / Legal Basis for our
            use of personal data (EEA and Switzerland EU GDPR):
          </h4>

          <h5 className="text-base font-semibold">
            Managing our contractual relationship with you. To create and
            maintain your account.
          </h5>
          <p>
            This includes when we use your personal data to take and handle
            orders and process payments. The Category of Personal Data processed
            is Personal Identification Data, Institutional Information, Contact
            Information, Financial Information. The consequences of not
            processing your personal data for such purposes is the inability to
            open an account with us or the termination of your account where one
            is already open. Processing is necessary for the performance of a
            contract of which you are a party.
          </p>

          <h5 className="text-base font-semibold">
            To maintain legal and regulatory compliance
          </h5>
          <p>
            Most of our core services such as the exchange services are subject
            to strict and specific laws and regulations requiring us to collect,
            use and store certain personal data and process Personal
            Identification identity information and in some cases Sensitive
            Personal Data[(including biometrics) (as detailed in section I) For
            example to comply with our Know Your Customer (&quot;KYC&quot;)
            obligations under applicable laws and regulations, and in particular
            to comply with Anti-Money Laundering laws and regulations. The
            Category of Personal Data is Personal Identification Data ,
            Institutional Information, Sensitive and Biometric information,
            Government Identifiers, Contact Information, Financial Information.
            If you do not provide personal information required by law, you may
            be unable to open an account, or we may have to close your account
            where it is already opened. Processing is necessary to comply with
            our legal obligations under applicable laws and regulations, and
            Anti-Money Laundering laws and regulations. Processing is necessary
            for reasons of substantial public interest based on EU or EU Member
            State law. We are subject to EU Anti-Money Laundering Directives and
            the relevant EU Member States&apos; law implementing them which
            require us to process for instance information from your ID
            documents including a photographic picture of you and a visual image
            of your face (the so called &quot;liveness check&quot;).
          </p>

          <h5 className="text-base font-semibold">
            Communicate with you on service and transaction- related matters.
          </h5>
          <p>
            We use your personal data to communicate with you in relation to
            InfraFund Services on administrative or account-related information.
            We will communicate with you to keep you updated about our Services
            for example, to inform you of relevant security issues, updates, or
            provide other transaction-related information. Without such
            communications, you may not be aware of important developments
            relating to your account that may affect how you can use our
            services. You may not opt-out of receiving critical service
            communications, such as emails or mobile notifications sent for
            legal or security purposes. Processing is necessary for the
            performance of a contract of which you are a party.
          </p>

          <h5 className="text-base font-semibold">
            To provide customer services:
          </h5>
          <p>
            We process your personal data when you contact us in order to
            provide support with respect to questions, disputes, complaints,
            troubleshoot problems, etc. The Category of Personal Data processed
            is Personal Identification Data, Institutional Information,
            Transactional Information, Communications, Contact Information,
            Financial Information, Browsing Information, Usage Data. Without
            processing your personal data for this purpose, we can’t respond to
            your requests. Processing is necessary for the performance of a
            contract of which you are a party. Processing is necessary for the
            purpose of the legitimate interest pursued by us to improve our
            services and enhance our user experience.
          </p>

          <h5 className="text-base font-semibold">
            To promote safety, security, and integrity of our platform.
          </h5>
          <p>
            We process your personal data in order to enhance security, monitor
            and verify identity or service access, combat malware or security
            risks and to comply with applicable security laws and regulations.
            We process your personal data to verify accounts and related
            activity, find and address violations of our Terms and Conditions,
            investigate suspicious activity, detect, prevent and combat unlawful
            behaviour, detect fraud, and maintain the integrity of our Services.
            The Category of Personal Data processed is Personal Identification
            Information, Institutional Information, Transactional Information,
            Contact Information, Financial Information, Browsing Information,
            Usage Data. Without processing your personal information, we may not
            be able to ensure the security of our Services. We use your personal
            data to provide functionality, analyse performance, fix errors, and
            improve the usability and effectiveness of InfraFund Services.
            Processing is necessary for the performance of a contract of which
            you are a party.
          </p>

          <h5 className="text-base font-semibold">
            To promote safety, security, and integrity of our Services.
          </h5>
          <p>
            Fraud prevention and detection and credit risks. The Category of
            Personal Data processed is Personal Identification Data,
            Institutional Information, Transactional Information, Contact
            Information, Financial Information, Browsing Information, Usage
            Data. We process Personal Identification Data to prevent and detect,
            prevent and mitigate fraud and abuse of our services and in order to
            protect you against account compromise or funds loss and in order to
            ensure the security of our users, InfraFund services and others. We
            may also use scoring methods to assess and manage credit risks.
            Please note that we may engage in automated decision-making for
            purposes of risk and fraud detection. When we do, we implement
            suitable measures to safeguard your rights and freedoms and
            legitimate interests, including the right to obtain human
            intervention, to express your point of view and to contest the
            decision.Please refer below to Section 10 for more information.
            Processing is necessary for the purpose of the legitimate interests
            pursued by us and the interests of our users when, for example, we
            detect and prevent fraud and abuse in order to protect the security
            of our users, ourselves, or others;
          </p>

          <h5 className="text-base font-semibold">
            To provide InfraFund services.
          </h5>
          <p>
            We process your personal data to provide the services to you ,
            process your orders, facilitate transactions and to complete the
            transactions the Users require. For example, when you want to use
            the exchange service on our platform, we ask for certain information
            such as your identification, contact information, and payment
            information. The Category of Personal Data processed is Personal
            Identification Data, Institutional Information, Transactional
            Information, Contact Information, Financial Information, Browsing
            Information, Usage Data. We cannot provide you with services without
            such information. Processing is necessary for the performance of a
            contract of which you are a party. Processing is necessary for the
            purpose of our legitimate interest and your interest in providing
            better documentation for your transactions.
          </p>

          <h5 className="text-base font-semibold">
            To use the services of social media platforms or advertising
            platforms for purposes including marketing
          </h5>
          <p>
            The category of personal data processed is Usage Data, Browsing
            Information. We rely on your consent to process your personal data
            to use the services of advertising platforms. When you consent to
            processing your personal information for a specified purpose, you
            may withdraw your consent at any time and we will stop processing
            your personal information for that purpose. The withdrawal of
            consent does not affect the lawfulness of processing based on
            consent before its withdrawal.
          </p>

          <h5 className="text-base font-semibold">To improve our services.</h5>
          <p>
            We process personal data to improve our services and for you to have
            a better user experience; The Category of Personal Data processed is
            Personal Identification Data, Institutional Information,
            Transactional Information, Browsing Information, Usage Data.
            Processing is necessary for the purpose of the legitimate interest
            pursued by us to improve our services and enhance our user
            experience.
          </p>

          <h5 className="text-base font-semibold">
            To provide you with promotions
          </h5>
          <p>
            We use your information to provide you with promotions, including
            offers, rewards, and other incentives for using our Services. This
            would also include to enable you to partake ina prize draw,
            competition or complete a survey. The Category of Personal Data
            processed is Personal Identification Data, Institutional
            Information, Transactional Information, Browsing Information, Usage
            Data and Online Identifiers. For non-users, processing is necessary
            for the purpose of our legitimate interest and your interest to
            reward your customer loyalty. For users, we rely on your consent to
            process your personal data to provide you with promotions. When you
            consent to processing your personal information for a specified
            purpose, you may withdraw your consent at any time and we will stop
            processing your personal information for that purpose. The
            withdrawal of consent does not affect the lawfulness of processing
            based on consent before its withdrawal.
          </p>

          <h5 className="text-base font-semibold">
            To do research and innovate.
          </h5>
          <p>
            We carry out surveys to learn more about your experience using our
            Services. We also use your information to support research and
            development and drive innovations of our Services and products. This
            information will also be used for Marketing purposes. Processing is
            necessary for the purpose of our legitimate interest to improve and
            run our Services through information obtained from these surveys.
          </p>

          <h5 className="text-base font-semibold">
            For internal business purposes and record keeping.
          </h5>
          <p>
            The Category of Personal Data processed is Personal Identification
            Data, Financial Information, Transaction Information and Browsing
            Information. Processing is necessary for the purpose of the
            legitimate interest pursued by us to keep records to ensure that you
            comply with your contractual obligations pursuant to the agreement
            (“Terms and Conditions”) governing our relationship with you.
            Processing is necessary to comply with our legal obligations to keep
            certain records for internal business and research purposes as well
            as for record keeping purposes.
          </p>

          <h5 className="text-base font-semibold">
            Recommendations and personalisation.
          </h5>
          <p>
            We use your personal information to recommend features and services
            that might be of interest to you, identify your preferences, and
            personalise your experience with InfraFund services; Processing is
            necessary for the purpose of our legitimate interest to provide a
            personalised service to our customers. Processing is necessary for
            the performance of a contract of which you are a party.
          </p>

          <h5 className="text-base font-semibold">
            To provide marketing communications to you.
          </h5>
          <p>
            We use your information based on your consent to send you targeted
            marketing communications through email, mobile, in-app, and push
            notifications. We also use your information to carry out profiling
            for marketing purposes. The Category of Personal Data processed is
            Personal Identification Information, Institutional Information,
            Transactional Information, Browsing Information, Usage Data,
            Marketing and Research Information, Communications. Where required
            by applicable law, we rely on your consent to process your personal
            information for marketing purposes. When you consent to processing
            your personal information for a specified purpose, you may withdraw
            your consent at any time and we will stop processing your personal
            information for that purpose. The withdrawal of consent does not
            affect the lawfulness of processing based on consent before its
            withdrawal. Where we carry out profiling for marketing purposes, for
            example to establish what Services or promotions you may be
            interested in, this processing is based on legitimate interest.
            Transactional account messages and communications regarding our
            business relationship will not be affected even if you opt-out from
            marketing communications.
          </p>

          <h5 className="text-base font-semibold">Events</h5>
          <p>
            (i) To host, and/or organise and events. InfraFund hosts many live,
            in-person events throughout the year. These include events like the
            Blockchain week, for example. If you register for one of our events
            and you are a user, we will access the information in your account
            to provide you with information and services associated with the
            event. You may be asked to provide more information when signing up
            for an event. If you are not a user and you sign up for one of our
            events, we will collect the following information: name, email,
            company, title, industry, address, phone number, whether meal
            preferences, social media domain and the like. (ii) in some cases
            you might pay to attend an Event. In such cases we will access the
            information in your account to provide you with information,
            services associated with the event and facilitating the ticketing
            process. You may be asked to provide more information when signing
            up for an event. (iii) if you are a presenter at one of our events,
            we will collect information about you including your name, employer
            and Contact Information, and photograph, and we may also collect
            information provided by event attendees who evaluated your
            performance as a presenter. We may also make and store a recording
            of your voice and likeness in certain instances. (iv) Some of our
            events are sponsored. InfraFund may provide an attendee list to
            sponsors, co-sponsors and exhibitors of our events. InfraFund may
            also allow sponsors, co-sponsors, exhibitors or other third parties
            relevant for the organisation of the event to send you material by
            mail once per sponsored event, in which case InfraFund engages a
            third-party mailing house and does not share your mailing address
            directly with the sponsor/exhibitor. If you do not wish to have your
            information included in an attendee list or to receive information
            from sponsors, co-sponsors and/or exhibitors, you can express your
            preferences when you register for events. We do give attendees a
            choice not to receive marketing messages from the sponsor or from
            InfraFund. (iv) To provide you with information about the event(s)
            which you have registered, such as event updates and possible
            changes, cancellations or similar information. (v) To fulfil and
            monitor our legal responsibilities for example under public safety
            legislations (vi) In accordance with your preferences, to
            communicate with you about the other events, news and services we
            provide (vii) To plan better future events and attendee experience.
            Processing is necessary for the purpose of our legitimate interest
            to produce, organise and host events. In the case where you pay to
            participate to an Event, the processing is necessary for the
            performance of a contract of which you are a party. Processing is
            necessary for the purpose of our legitimate interest to promote the
            events, inform about the Event or to evaluate the performance of the
            Event. We rely on your consent to process your personal data for
            marketing purposes. When you consent to processing your personal
            information for a specified purpose, you may withdraw your consent
            at any time and we will stop processing your personal information
            for that purpose. The withdrawal of consent does not affect the
            lawfulness of processing based on consent before its withdrawal.
            Further details may be as follows: When you decide to participate in
            an event or act as a presenter for the event, we rely on your
            consent to process your personal data for attendance to an event.
            When you consent to processing your personal data for a specified
            purpose, you may withdraw your consent at any time and we will stop
            processing your personal data for that purpose. If you are a
            presenter at one of our events, we may also like to take
            photographs, and make and store a will collect recording of your
            voice and likeness in certain instances. In these situations
            InfraFund relies on a legitimate interest basis for collecting,
            storing and processing this personal data. When we organise events
            and work with sponsors, co-sponsors and exhibitors and send
            material, we rely on your consent to send you material about the
            event or direct marketing email. When you consent to processing your
            personal data for a specified purpose, you may withdraw your consent
            at any time and we will stop processing your personal data for that
            purpose.
          </p>

          <h5 className="text-base font-semibold">Cookies:</h5>
          <p>
            where we use cookies and similar technologies as part of our
            Service. The Category of Personal Data processed is Information from
            Cookies. Where required by applicable law, we rely on your consent
            to place cookies and similar technologies. When you consent to
            processing your personal information for a specified purpose, you
            may withdraw your consent at any time and we will stop processing
            your personal information for that purpose. The withdrawal of
            consent does not affect the lawfulness of processing based on
            consent before its withdrawal
          </p>

          <h5 className="text-base font-semibold">
            To comply with other legal and regulatory obligations.
          </h5>
          <p>
            We may access, read, preserve, and disclose information when we
            believe it is reasonably necessary to comply with law, legal
            obligations, regulations, law enforcement, government, and other
            legal requests, court orders, or disclosure to tax authorities in
            line with the detailed information set forth under Section 6. The
            Category of Personal Data processed is Personal Identification
            Information, Institutional Information, Financial Information,
            Transactional Information, Browsing Information, Usage Data,
            Blockchain Data. Processing is necessary to comply with our legal
            obligations under applicable laws and regulations We may also rely
            on legitimate interests in responding to legal requests where we are
            not compelled by applicable law but have a good faith belief it is
            required by law in the relevant jurisdiction.
          </p>
        </div>
      ),
    },
    {
      title: '3. Can Children Use InfraFund Services?',
      content: (
        <div className="space-y-2">
          <p>
            InfraFund does not allow anyone under the age of 18 to use InfraFund
            Services and we do not knowingly request or collect any information
            about persons under the age of 18. If you are under the age of 18,
            please do not provide any personal information to InfraFund
            Services.
          </p>
          <p>
            If a User or Customer submitting personal information is suspected
            of being younger than 18 years of age, InfraFund will require the
            relevant Customer or User to close his or her account, and will take
            steps to delete the individual’s information as soon as possible.
          </p>
        </div>
      ),
    },
    {
      title: '4. What About Cookies and Other Identifiers?',
      content: (
        <div className="space-y-2">
          <p>
            We use cookies and similar tools to enhance your user experience,
            provide our services, enhance our marketing efforts and understand
            how customers use our services so we can make improvements.
            Depending on applicable laws in the region you are located in, the
            cookie banner on your browser will tell you how to accept or refuse
            cookies. A copy of our cookie policy is available here.
          </p>
        </div>
      ),
    },
    {
      title: '5. How and Why We Share your Personal Data?',
      content: (
        <div className="space-y-4">
          <p>
            We may share your Personal Data with third parties (including other
            InfraFund entities) if we believe that sharing your Personal Data is
            in accordance with, or required by, any contractual relationship
            with you (including InfraFund Terms & Conditions) or us, applicable
            law, regulation or legal process. When sharing your Personal Data
            with other InfraFund entities, we will use our best endeavours to
            ensure that such entities are either subject to this Privacy Notice,
            or follow practices at least as protective as those described in
            this Privacy Notice. For example, depending on where you reside and
            the entity responsible for running KYC checks. For more information
            please refer to Section 1.
          </p>

          <p>
            We may also share personal data with the following persons or in the
            following circumstances:
          </p>

          <h4 className="text-lg font-semibold">Affiliates:</h4>
          <p>
            Personal data that we process and collect may be transferred between
            InfraFund companies as a normal part of conducting business and
            offering our Services to you. See Section 1 “InfraFund Relationship
            with you” and Section 1. “What Personal Data does InfraFund collect
            and process?”.
          </p>

          <h4 className="text-lg font-semibold">Third parties:</h4>
          <p>
            We employ other companies and individuals to perform functions on
            our behalf. Examples include analysing data, providing marketing
            assistance, processing payments, transmitting content, and assessing
            and managing credit risk. The third-party service providers only
            have access to personal information needed to perform their
            functions but may not use it for other purposes. Further, they must
            process the personal information in accordance with our contractual
            agreements and only as permitted by applicable data protection laws.
            In accordance with and as far as provided by applicable law, your
            personal data may also be shared by third parties (i.e. another data
            controller) upon exercising your right to data portability. Please
            refer to Section 10 for more information on data portability. When
            you use third-party services (like when you connect your InfraFund
            account with your bank account) or websites that are linked through
            our Services, the providers of those services or products may
            receive information about you that InfraFund, you, or others share
            with them. Please note that when you use third-party services or
            InfraFund affiliate services which are not governed by this Privacy
            Policy, their own terms and privacy policies will govern your use of
            those services and products.
          </p>

          <h4 className="text-lg font-semibold">Legal Authorities:</h4>
          <p>
            We may share your information with courts, law enforcement
            authorities, regulators, attorneys or other third parties: (a) to
            comply with laws and legal obligations; (b) for the establishment,
            exercise, or defence of a legal or equitable claim; (c) to respond
            to law enforcement and regulatory requests, including (1) when we
            are compelled to do so by a subpoena, court order, search or seizure
            warrant, or similar legal procedure, or (2) for international law
            enforcement requests, pursuant to a mutual legal assistance treaty
            (MLAT) or letters of request; (d) to comply with one or more forms
            of “travel rules” that require our transmitting of your information
            to another financial institution, regulatory authorities or other
            industry partners; (e) when we believe in good faith that the
            disclosure of personal information is necessary to protect the
            rights, property or safety of our customers, InfraFund, or others,
            including to prevent imminent physical harm or material financial
            loss; (f) to investigate violations of our Terms of Use or other
            applicable policies; or (g) to detect, investigate, prevent or
            address fraud or credit risk, other illegal activity or security and
            technical issues, to report suspected illegal activity or to assist
            law enforcement in the investigation of suspected illegal or
            wrongful activity.
          </p>

          <h4 className="text-lg font-semibold">Business transfers:</h4>
          <p>
            As we continue to develop our business, we might sell or buy other
            businesses or services. In such transactions, user information
            generally is one of the transferred business assets but remains
            subject to the promises made in any pre-existing Privacy Notice
            (unless, of course, the user consents otherwise). Also, in the
            unlikely event that InfraFund or substantially all of its assets are
            acquired by a third party, user information will be one of the
            transferred assets.
          </p>

          <h4 className="text-lg font-semibold">With your Consent:</h4>
          <p>
            We also may disclose your Personal Data as may be described in a
            notice to you at the time the information is collected or before it
            is shared, or in any other manner to which you consent.
          </p>
        </div>
      ),
    },
    {
      title: '6. International transfers of Personal Information',
      content: (
        <div className="space-y-2">
          <p>
            To facilitate our global operations, InfraFund may transfer your
            personal information outside of the European Economic Area (“EEA”),
            UK and Switzerland. The EEA includes the European Union countries as
            well as Iceland, Liechtenstein, and Norway. Transfers outside of the
            EEA are sometimes referred to as “third country transfers”.
          </p>
          <p>
            We may transfer your personal information to our Affiliates,
            third-party partners, and service providers based throughout the
            world. In cases where we intend to transfer personal information to
            third countries or international organisations outside of the EEA,
            InfraFund puts in place suitable technical, organizational and
            contractual safeguards (including Standard Contractual Clauses), to
            ensure that such transfer is carried out in compliance with
            applicable data protection rules.
          </p>
          <p>
            We also rely on decisions from the European Commission where they
            recognise that certain countries and territories outside of the
            European Economic Area ensure an adequate level of protection for
            personal information. These decisions are referred to as “adequacy
            decisions”.
          </p>
        </div>
      ),
    },
    {
      title: '7. How Secure is My Information?',
      content: (
        <div className="space-y-2">
          <p>
            We design our systems with your security and privacy in mind. We
            have appropriate security measures in place to prevent your
            information being accidentally lost, used or accessed in an
            unauthorised way, altered or disclosed. We work to protect the
            security of your personal data during transmission and while stored
            by using encryption protocols and softwares. We maintain physical,
            electronic and procedural safeguards in connection with the
            collection, storage and disclosure of your personal data. In
            addition, we limit access to your personal data to those employees,
            agents, contractors and other third parties who have a business need
            to know.
          </p>
          <p>
            Our security procedures mean that we may ask you to verify your
            identity to protect you against unauthorised access to your account.
            We recommend using a unique password for your InfraFund account that
            is not utilized for other online accounts and to sign off when you
            finish using a shared computer.
          </p>
        </div>
      ),
    },
    {
      title: '8. What About Advertising?',
      content: (
        <div className="space-y-2">
          <p>
            In order for us to provide you with the best user experience, we may
            share your personal data with our marketing partners for the
            purposes of targeting, modelling, and/or analytics as well as
            marketing and advertising. You have a right to object at any time to
            processing of your personal data for direct marketing purposes (see
            Section 10 below).
          </p>
        </div>
      ),
    },
    {
      title: '9. What Rights Do I Have?',
      content: (
        <div className="space-y-4">
          <p>
            Subject to applicable law, as outlined below, you have a number of
            rights in relation to your privacy and the protection of your
            personal data. You have the right to request access to, correct, and
            delete your personal data, and to ask for data portability. You may
            also object to our processing of your personal data or ask that we
            restrict the processing of your personal data in certain instances.
            In addition, when you consent to our processing of your personal
            data for a specified purpose, you may withdraw your consent at any
            time. If you want to exercise any of your rights please contact us
            using the webform available here. These rights may be limited in
            some situations - for example, where we can demonstrate we have a
            legal requirement to process your personal data.
          </p>

          <h4 className="text-lg font-semibold">Right to access:</h4>
          <p>
            you have the right to obtain confirmation that your personal data
            are processed and to obtain a copy of it as well as certain
            information related to its processing. Please follow the FAQ for
            further information on how to access your account statement
            yourself. You can also check your device and IP address login’s via
            the dedicated “Account Activity Records” page located here. Please
            note that you have to login to your account first to obtain access;
          </p>

          <h4 className="text-lg font-semibold">Right to rectify:</h4>
          <p>
            you can request the rectification of your personal data which are
            inaccurate, and also add to it. You can also change your personal
            data in your account at any time.
          </p>

          <h4 className="text-lg font-semibold">Right to delete:</h4>
          <p>
            you can, in some cases, have your personal data deleted. Please
            follow the FAQ for further self-help information on how you can
            request that your account is deleted yourself. Please note that
            personal data may still be retained in the event of account deletion
            to comply with our legal obligations.
          </p>

          <h4 className="text-lg font-semibold">Right to object:</h4>
          <p>
            you can object, for reasons relating to your situation, to the
            processing of your personal data For instance, you have the right to
            object where we rely on legitimate interest or where we process your
            data for direct marketing purposes;
          </p>

          <h4 className="text-lg font-semibold">
            Right to restrict processing:
          </h4>
          <p>
            You have the right, in certain cases, to temporarily restrict the
            processing of your personal data by us, provided there are valid
            grounds for doing so. We may continue to process your personal data
            if it is necessary for the defense of legal claims, or for any other
            exceptions permitted by applicable law;
          </p>

          <h4 className="text-lg font-semibold">
            Right to contest to a decision based solely on automated processing:
          </h4>
          <p>
            You have the right to require that decisions be reconsidered if they
            are made solely by automated means, without human involvement; we
            use automated tools to make sure that you are eligible to be our
            customer taking into account our interests and legal obligations; if
            these automated tools indicate that you do not meet our acceptance
            criteria, we will not onboard you as our customer;
          </p>

          <h4 className="text-lg font-semibold">Right to portability:</h4>
          <p>
            in some cases, you can ask to receive your personal data which you
            have provided to us in a structured, commonly used and
            machine-readable format, or, when this is possible, that we
            communicate your personal data on your behalf directly to another
            data controller;
          </p>

          <h4 className="text-lg font-semibold">
            Right to withdraw your consent:
          </h4>
          <p>
            for processing requiring your consent, you have the right to
            withdraw your consent at any time. Exercising this right does not
            affect the lawfulness of the processing based on the consent given
            before the withdrawal of the latter;
          </p>

          <h4 className="text-lg font-semibold">
            Right to lodge a complaint with the relevant data protection
            authority:
          </h4>
          <p>
            We hope that we can satisfy any queries you may have about the way
            in which we process your personal data. However, if you have
            unresolved concerns, you also have the right to complain to the data
            protection authority in the location in which you live, work or
            believe a data protection breach has occurred.
          </p>

          <p>
            If you have any questions or objection as to how we collect and
            process your personal data, please contact us using the webform
            available here.
          </p>
        </div>
      ),
    },
    {
      title: '10. How Long Does InfraFund Keep My Personal Data?',
      content: (
        <div className="space-y-2">
          <p>
            We keep your personal data to enable your continued use of InfraFund
            Services, for as long as it is required in order to fulfil the
            relevant purposes described in this Privacy Notice, and as may be
            required by law such as for tax and accounting purposes, compliance
            with Anti-Money Laundering laws, or to resolve disputes and/or legal
            claims or as otherwise communicated to you.
          </p>
          <p>
            While retention requirements vary by jurisdiction, information about
            our typical retention periods for different aspects of your personal
            data are described below.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Personal Identifiable Data collected to comply with our legal
              obligations under financial or anti-money laundering laws may be
              retained after account closure for as long as is required under
              such laws.
            </li>
            <li>
              Contact Information such as your name, email address and telephone
              number for marketing purposes is retained on an ongoing basis and
              until you (a) unsubscribe, or we (b) delete your account.
              Thereafter we will add your details to an unsubscribed list to
              ensure we do not inadvertently market to you.
            </li>
            <li>
              Content that you post on our website such as support desk
              comments, photographs, videos, blog posts, and other content may
              be kept after you close your account for audit and crime
              prevention purposes.
            </li>
            <li>
              Recording of voice calls with you may be kept for a period of up
              to six years, for audit/ compliance purposes and to resolve
              disputes and/or legal claims.
            </li>
            <li>
              Information collected via cookies, web page counters and other
              analytics tools is kept for a period of up to one year from the
              date of the collection of the cookie of the relevant cookie.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '11. Notices and Revisions',
      content: (
        <div className="space-y-2">
          <p>
            If you have any concerns about privacy at InfraFund, please contact
            us, and we will try to resolve it. You also have the right to
            contact your local Data Protection Authority.
          </p>
          <p>
            Our business changes regularly, and our Privacy Notice may change
            also. You should check our websites frequently to see recent
            changes. We will update the “Last Updated” date accordingly at the
            beginning of this Privacy Notice. We will announce any material
            changes to this Privacy Notice on our Platform or by sending an
            email that you have provided under your account. Your continued use
            of InfraFund after the changes to this Privacy Notice means that you
            understand and agree to such changes.
          </p>
          <p>
            Unless stated otherwise, our most recent Privacy Notice applies to
            all information that we have about you and your account.
          </p>
        </div>
      ),
    },
    {
      title: '12. Languages',
      content: (
        <div className="space-y-2">
          <p>
            This Privacy Policy may be published in different languages. In case
            of any discrepancy, this English version shall prevail.
          </p>
        </div>
      ),
    },
    {
      title: '13. Contact Information',
      content: (
        <div className="space-y-2">
          <p>
            Our data protection officer can be contacted using the webform
            available below, or via email and will work to address any questions
            or issues that you have with respect to the collection and
            processing of your personal data.
          </p>
          <p>
            If you have a question about your account management, or InfraFund
            products or services the Data Protection Officer will not be able to
            assist you. In that case, please contact our Customer Support team
            using the following link.
          </p>
        </div>
      ),
    },
  ],
};

export default function Privacy() {
  return (
    <div className="flex flex-col justify-center items-start text-white gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
      <h1 className="text-5xl font-bold">Privacy Policy</h1>

      <div className="text-base font-normal space-y-6">
        <p>Last updated: {privacyContent.lastUpdated}</p>
        <div className="space-y-4">
          {privacyContent.intro
            .split('\n')
            .filter((line) => line.trim())
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </div>

        {privacyContent.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="space-y-2">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
