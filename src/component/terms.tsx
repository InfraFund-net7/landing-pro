import React from 'react';

interface TermsSection {
  title: string;
  content: React.ReactNode;
}

interface TermsContent {
  sections: TermsSection[];
  lastUpdated: string;
  riskWarning: string;
  intro: string;
}

const termsContent: TermsContent = {
  lastUpdated: '14 June 2024',
  intro: `These Terms constitute a legally binding agreement between you (“you” or “your”) and InfraFund (“InfraFund”, “we”, “our” or “us”). The Terms govern your use of the InfraFund Services made available to you on or through the Platform or otherwise. InfraFund Services may be provided by InfraFund or, if specified in these Terms, any Product Terms or any additional terms, by any InfraFund Affiliate.

By registering for a InfraFund Account, accessing the Platform and/or using the InfraFund Services, you agree that you have read, understood and accepted these Terms, together with any additional documents or terms referred to in these Terms. You acknowledge and agree that you will be bound by and will comply with these Terms, as updated and amended from time to time.

If you do not understand and accept these Terms in their entirety, you should not register for a InfraFund Account or access or use the Platform or any InfraFund Service.`,
  riskWarning: `As with any asset, the value of Digital Assets can fluctuate significantly and there is a material risk of economic loss when buying, selling, holding or investing in Digital Assets. You should therefore consider whether trading or holding Digital Assets is suitable for you in light of your financial circumstances.

Further information on the risks associated with using the InfraFund Services is set out in our Risk Warning, which may be updated from time to time. You should read the Risk Warning carefully, however it does not explain all of the risks that may arise, or how such risks relate to your personal circumstances.

It is important that you fully understand the risks involved before making a decision to use the InfraFund Services.

We are not your broker, intermediary, agent or advisor and we have no fiduciary relationship or obligation to you in connection with any Transactions or other activities you undertake when using the InfraFund Services. We do not provide investment or consulting advice of any kind and no communication or information that we provide to you is intended as, or should be construed as, advice of any kind.

It is your responsibility to determine whether any investment, investment strategy or related transaction is appropriate for you according to your personal investment objectives, financial circumstances and risk tolerance and you are responsible for any associated loss or liability. We do not recommend that any Digital Asset should be bought, earned, sold or held by you. Before making the decision to buy, sell or hold any Digital Asset, you should conduct your own due diligence and consult your financial advisor. We are not responsible for the decisions you make to buy, earn, sell or hold Digital Assets based on the information provided by us, including any losses you incur arising from those decisions.`,
  sections: [
    {
      title: '1. Introduction',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">1.1. About us</h3>
          <p>
            The InfraFund group is an ecosystem centred around an online
            exchange for Digital Assets trading. The InfraFund group provides
            users with a trading platform to buy and sell Digital Assets, an
            integrated custody solution allowing users to store their Digital
            Assets and other Digital Asset-related services.
          </p>

          <h3 className="text-xl font-semibold">1.2. These Terms</h3>
          <p>
            By registering to open a InfraFund Account you are entering into a
            legally binding agreement with us. These Terms will govern your use
            of the InfraFund Services and tell you who we are, how we will
            provide the InfraFund Services to you, how these Terms may be
            changed or terminated, what to do if there is a problem, along with
            other important information.
          </p>
          <p>
            You must read these Terms, together with the documents referenced in
            the Terms, carefully and let us know if you do not understand
            anything.
          </p>
          <p>
            Where any Local Terms apply to your use of the InfraFund Services,
            such Local Terms shall govern your use of the InfraFund Services.
          </p>

          <h3 className="text-xl font-semibold">1.3. Additional documents</h3>
          <p>
            These Terms refer to a number of additional documents which also
            apply to your use of the InfraFund Services. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> Our Privacy Notice, which sets out the terms
              on which we process any personal data we collect about you, or
              that you provide to us. By using the InfraFund Services, you
              understand and agree to such processing and you promise that all
              data provided by you is accurate and up to date.
            </li>
            <li>
              <strong>b.</strong> Our Risk Warning, which sets out important
              information on the risks that can arise when buying, selling,
              holding or investing in Digital Assets.
            </li>
            <li>
              <strong>c.</strong> The Fee Structure page on our Website.
            </li>
            <li>
              <strong>d.</strong> Product Terms, which set out additional terms
              and conditions that will apply to your use of specific InfraFund
              Services.
            </li>
          </ul>
          <p>
            You acknowledge that you will be bound by, and agree that you will
            comply with, any relevant additional terms and conditions that apply
            to your use of the InfraFund Services.
          </p>
        </div>
      ),
    },
    {
      title: '2. Eligibility',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">2.1. Eligibility criteria</h3>
          <p>
            To be eligible to register for a InfraFund Account and use the
            InfraFund Services, you must:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> be an individual, corporation, legal person,
              entity or other organisation with the full power, authority and
              capacity to (1) access and use the InfraFund Services; and (2)
              enter into and comply with your obligations under these Terms;
            </li>
            <li>
              <strong>b.</strong> if you are an individual, be at least 18 years
              old;
            </li>
            <li>
              <strong>c.</strong> if you act as an employee or agent of a legal
              entity, and enter into these Terms on their behalf, you must be
              duly authorised to act on behalf of and bind such legal entity for
              the purposes of entering into these Terms;
            </li>
            <li>
              <strong>d.</strong> not have been previously suspended or removed
              from using InfraFund Services;
            </li>
            <li>
              <strong>e.</strong> not be a Restricted Person;
            </li>
            <li>
              <strong>f.</strong> not currently have an existing InfraFund
              Account; and
            </li>
            <li>
              <strong>g.</strong> not be located, incorporated, otherwise
              established in, or resident of, or have business operations in:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> a jurisdiction where it would be illegal under
              Applicable Law for you to access or use the InfraFund Services, or
              cause us or any third party to contravene any Applicable Law; or
            </li>
            <li>
              <strong>ii.</strong> a country listed in our List of Prohibited
              Countries.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            2.2. Amending our eligibility criteria
          </h3>
          <p>
            We may amend our eligibility criteria at any time in our sole
            discretion. Where possible, we will give you notice in advance of
            the change. However, we may occasionally need to make changes
            without telling you in advance. This may include where:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> we are making the change as a result of legal
              and/or regulatory changes;
            </li>
            <li>
              <strong>b.</strong> the changes being made are in your interest;
              and/or
            </li>
            <li>
              <strong>c.</strong> there is any other valid reason which means
              there is no time to give you notice.
            </li>
          </ul>
          <p>
            Where we are unable to give you advance notice, we will let you know
            of the change as soon as possible after it is made.
          </p>
        </div>
      ),
    },
    {
      title: '3. How we contact each other',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">3.1. How you can contact us</h3>
          <p>
            For more information on InfraFund, you may refer to the information
            found on our Website. If you have questions, feedback or complaints
            you can contact us via our Customer Support team at
            https://www.infrafund.net/chat. These Terms may specify contact
            details for particular notices. This address is not monitored for
            those notices.
          </p>

          <h3 className="text-xl font-semibold">
            3.2. How we will contact you
          </h3>
          <p>
            We will contact you using the details you provide to us. This may
            include contacting you by email, SMS or telephone. It is important
            that you ensure that your contact details are correct and up to
            date. If your contact details change, you must let us know
            immediately. If you do not, we will not be responsible if you do not
            receive information, notices or other important information from us.
          </p>
        </div>
      ),
    },
    {
      title: '4. InfraFund Services',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">4.1. Specific product terms</h3>
          <p>
            Once you have opened a InfraFund Account, you will be able to use
            the InfraFund Services in accordance with these Terms and the
            Product Terms that govern your use of each specific InfraFund
            Service.
          </p>

          <h3 className="text-xl font-semibold">4.2. Intra-group services</h3>
          <p>
            You acknowledge and agree that some of the InfraFund Services may be
            provided by InfraFund Affiliates.
          </p>
        </div>
      ),
    },
    {
      title: '5. Chat Service',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            5.1. Availability of Chat Service
          </h3>
          <p>
            We may make our interactive online chat service available to you
            (“Chat Service”) at any time in connection with your use of any of
            the InfraFund Services. By using the Chat Service, you may interact
            with a bot, chatbot, or other non-human. We will disclose the use of
            a chatbot, or other non-human, to the extent required by Applicable
            Law. When engaging with us through use of the Chat Service, you
            authorise us to monitor and save your chats.
          </p>

          <h3 className="text-xl font-semibold">5.2. Important information</h3>
          <p>
            The Chat Service is provided as a convenience, often to facilitate
            your understanding of the InfraFund Services. Our Chat Service will
            make reasonable efforts to provide you with accurate and current
            information based on your question or need. Nothing we communicate
            in the Chat Service will be considered a legal agreement,
            representation or warranty as to the InfraFund Services, processes,
            decisions, or response times. Any personal data shared with us when
            using the Chat Service will be subject to the applicable
            privacy-related policies and notices described in our Privacy
            Notice.
          </p>

          <h3 className="text-xl font-semibold">5.3. User Chats</h3>
          <p>
            In addition, we may make available to you chats that allow you to
            interact directly with other users of the Platform (“User Chat”).
          </p>

          <h3 className="text-xl font-semibold">5.4. Prohibited actions</h3>
          <p>
            You must not use the Chat Service or any User Chat to send any
            abusive, defamatory, dishonest, or obscene message or any messages
            intended to manipulate a market or to spread false or misleading
            information or messages that are otherwise in contravention of
            Applicable Laws, and doing so may result in termination of the Chat
            Service session and may lead to restrictions on the availability of
            InfraFund Services to you.
          </p>
        </div>
      ),
    },
    {
      title: '6. Fees and calculations',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">6.1. Payment of fees</h3>
          <p>
            You agree to pay all applicable fees in connection with your use of
            the InfraFund Services as set out on the Fee Structure page on our
            Website, or otherwise communicated to you in any relevant Product
            Terms.
          </p>
          <p>
            You authorise us to deduct all applicable fees, commissions,
            interest, charges and other sums that you owe from your InfraFund
            Account under these Terms or any Product Terms in accordance with
            the method of calculation set out on our Fee Structure page. If you
            owe us an amount in one Digital Asset and do not have sufficient
            assets in that Digital Asset, we may deduct the sums owed in another
            Digital Asset to effect payment (in which case we will convert the
            Digital Asset you hold into the Digital Asset in which the sums owed
            to us are denominated (or the Fiat Currency equivalent), at the rate
            currently offered on the Platform or at such other commercially
            reasonable rate as we may determine). In the event that there are
            insufficient Digital Assets in your InfraFund Account, you
            acknowledge that any amount due and payable from you under this
            clause is a debt immediately due and owing by you to us in such
            amount and form (whether in the form of a Digital Asset or
            otherwise) as we may determine, acting in a commercially reasonable
            manner.
          </p>

          <h3 className="text-xl font-semibold">6.2. Amending our fees</h3>
          <p>
            We may adjust our fees from time to time in accordance with clause
            ‎18.3 of these Terms.
          </p>

          <h3 className="text-xl font-semibold">6.3. Calculations</h3>
          <p>
            Any calculations made by InfraFund in connection with the InfraFund
            Services are final and binding on you in the absence of Manifest
            Error. Calculations will be made in accordance with the stated
            methodology for the relevant InfraFund Service in our good faith
            discretion.
          </p>
        </div>
      ),
    },
    {
      title: 'INFORMATION ABOUT YOUR INFRAFUND ACCOUNT',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            7. Creating a InfraFund Account
          </h3>
          <h4 className="text-lg font-semibold">7.1. Account opening</h4>
          <p>
            You must create and maintain a InfraFund Account in order to access
            the InfraFund Services and the Platform. This may be a InfraFund
            Account for an individual user, or a Corporate InfraFund Account
            where the user is a corporation, entity or other organisation.
          </p>
          <p>
            All InfraFund Accounts are provided at our absolute discretion. We
            reserve the right to refuse any application for a InfraFund Account
            without reason or to limit the number of InfraFund Accounts that you
            may hold.
          </p>

          <h4 className="text-lg font-semibold">7.2. Sole benefit</h4>
          <p>By opening a InfraFund Account you agree that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> where you are an individual user, you will use
              your InfraFund Account only for yourself, and not on behalf of any
              third party, unless you have obtained our prior written consent to
              do so; and
            </li>
            <li>
              <strong>b.</strong> where you are a corporate user, your Permitted
              Users will use the Corporate InfraFund Account only for your
              benefit, and not on behalf of any third party, unless our prior
              written consent has been obtained. Additionally, you will not
              offer direct market access to the Platform to any other party,
              including through the use of a sub-account, unless and until such
              other party has completed identity verification deemed appropriate
              by InfraFund and has separately onboarded onto the Platform. Any
              other party so verified shall be considered a “Permitted User” as
              that term is described herein. For avoidance of doubt, any entity
              or individual using a InfraFund Sub-Account must be separately
              verified to be considered a “Permitted User” and to be permitted
              to use the InfraFund Services.
            </li>
          </ul>
          <p>
            You are fully responsible for all activity that occurs under your
            InfraFund Account.
          </p>

          <h4 className="text-lg font-semibold">7.3. Identity verification</h4>
          <p>
            You will need to comply with our identity verification procedures
            before you are permitted to open a InfraFund Account and access and
            use the InfraFund Services, whether independently or through a
            third-party service, by providing us with certain information about
            yourself and, where relevant, all of your Permitted Users. All
            information that you provide must be complete, accurate and
            truthful. You must update this information whenever it changes.
          </p>
          <p>
            You authorise us to make inquiries, whether directly or through
            third parties, that we consider necessary to verify your identity,
            and that of any Permitted Users, or protect you and/or us against
            fraud, money laundering, terrorist financing or other financial
            crime, and to take any action we deem necessary based on the results
            of such inquiries.
          </p>
          <p>
            When we carry out inquiries, you acknowledge and understand that
            your personal data, and that of any Permitted Users, may be
            disclosed to identity verification, compliance data recordation,
            credit reference, fraud prevention, or financial crime agencies and
            that these agencies may respond to our inquiries in full.
          </p>
          <p>
            You can review our Privacy Notice to have more information about how
            we process your personal data.
          </p>

          <h4 className="text-lg font-semibold">7.4. Enhanced due diligence</h4>
          <p>
            We may also require you to comply with our enhanced due diligence
            procedures by submitting additional information about yourself, your
            business or your Permitted Users, providing additional records or
            documentation, or having face to face meetings with representatives
            of InfraFund.
          </p>

          <h4 className="text-lg font-semibold">7.5. Records</h4>
          <p>
            We keep your personal data to enable your continued use of InfraFund
            Services, for as long as it is required in order to fulfil the
            relevant purposes described in this Privacy Notice, and as may be
            required by law such as for tax and accounting purposes, compliance
            with anti-money laundering laws, or as otherwise communicated to
            you. Please review our Privacy Notice for more information on how we
            collect and use your personal data relating to the use and
            performance of our Sites and the InfraFund Services.
          </p>

          <h4 className="text-lg font-semibold">7.6. Sub-Accounts</h4>
          <p>
            At our discretion, you may create and access a InfraFund
            Sub-Account. Each natural person associated with a InfraFund
            Sub-Account is subject to the identity verification requirements set
            out in this clause ‎7. Only one natural person or corporate entity
            may be associated with a particular InfraFund Sub-Account.
          </p>
        </div>
      ),
    },
    {
      title: '8. Information requests',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            8.1. When we may request information
          </h3>
          <p>
            We may require information from you at any time for the purposes of
            complying with any Applicable Law, identity verification
            requirements, or in connection with the detection of money
            laundering, terrorist financing, fraud, or any other financial
            crime, or for any other valid reason. You agree to provide us with
            any such information we request and permit us to keep a record of
            the information for the lifetime of your InfraFund Account as long
            as it is required to fulfil their intended purposes, or such other
            period as prescribed by Applicable Law.
          </p>

          <h3 className="text-xl font-semibold">
            8.2. What happens when you provide information
          </h3>
          <p>
            Your access to your InfraFund Account and the Transaction limits
            that apply to your use of the InfraFund Services may be altered as a
            result of information collected about you on an ongoing basis. If
            there is a reasonable suspicion that any information provided by you
            is wrong, untruthful, outdated, or incomplete, we may send you a
            notice to request corrections, remove relevant information, or do
            such other things that we consider necessary to ensure that the
            information provided by you is true and correct.
          </p>

          <h3 className="text-xl font-semibold">
            8.3. If you fail to provide any requested information
          </h3>
          <p>
            You must comply with any information request we send to you. If you
            decline to provide the requested information, or otherwise do not
            comply in a timely manner, we reserve the right to suspend or
            terminate your access to your InfraFund Account, or to all or part
            of the InfraFund Services immediately, without notice.
          </p>
        </div>
      ),
    },
    {
      title: '9. Accessing your InfraFund Account',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">9.1. Access</h3>
          <p>
            To access your InfraFund Account you or, where relevant, your
            Permitted Users, must have the necessary equipment (such as a
            computer or smartphone) and access to the internet. Your InfraFund
            Account can be accessed directly using the Platform or by such other
            mode of access (including APIs) as we may prescribe. You are only
            permitted to access your InfraFund Account by using the Access IDs
            we provide to you or your Permitted Users for such purposes. We may
            require multi-factor authentication to keep your InfraFund Account
            safe and secure.
          </p>
          <p>
            The use of the Platform and other access methods may be subject to
            such additional terms as we communicate to you.
          </p>

          <h3 className="text-xl font-semibold">
            9.2. Restricting access to third parties
          </h3>
          <p>
            You must ensure that any InfraFund Account(s) registered under your
            name will not be used by any person other than yourself or, with
            respect to Corporate InfraFund Accounts, your Permitted Users, other
            than in accordance with these Terms.
          </p>
        </div>
      ),
    },
    {
      title: '10. Account information and Transaction records',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">10.1. Your Account History</h3>
          <p>
            You will be able to access your Account History on the Platform. You
            must review your Account History carefully and let us know if you
            see any entries or Transactions that you do not recognise or you
            think are incorrect within fourteen (14) calendar days of the date
            that your Account History is provided or made available to you.
          </p>

          <h3 className="text-xl font-semibold">10.2. Errors</h3>
          <p>
            We may rectify any error in your Account History at any time, and
            reserve the right to void, cancel or reverse any Transaction
            involving or deriving from a Manifest Error or to amend the details
            of such Transaction to reflect what we reasonably consider to be the
            correct or fair details of such a Transaction.
          </p>
          <p>
            You acknowledge and agree that where you execute any Transaction
            with Improper Intent and/or in the case of Manifest Error, InfraFund
            is authorised by you (without any payment or penalty or liability
            due by InfraFund and provided that such action is in compliance with
            Applicable Law) to either:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> cancel/void such Transaction and treat such
              Transaction as if they had never been entered into; or
            </li>
            <li>
              <strong>b.</strong> amend the price(s) of such Transaction (upon
              notice from InfraFund to you of the amended price(s)) to reflect
              the prevailing market price(s) as at the relevant time, as
              determined by InfraFund by reference to an available source for
              fair market pricing;
            </li>
          </ul>
          <p>
            If InfraFund cancels a Transaction pursuant to the rights referred
            herein, InfraFund will reverse any transfers of Digital Assets that
            have been made to and/or from your InfraFund Account in connection
            with such Transaction as if that Transaction had never taken place.
          </p>
          <p>
            If InfraFund amends a Transaction pursuant to the rights referred
            herein, InfraFund will confirm the details of the amended terms of
            the Transaction to you through an agreed communication channel and
            will affect such transfers of Digital Assets to and/or from your
            InfraFund Account as are required to reflect the terms of the
            amended Transaction.
          </p>
          <p>
            You acknowledge and agree that you shall be solely responsible for
            your own transactions with any third parties that may have been
            entered into in connection with or reliance on any Transaction(s)
            that may be subject to any cancellation/amendment pursuant to
            InfraFund’s rights herein.
          </p>

          <h3 className="text-xl font-semibold">10.3. Information sharing</h3>
          <p>
            We may be required under these Terms or Applicable Law to share
            information about your InfraFund Account and Account History with
            third parties and InfraFund Affiliates. You acknowledge and agree
            that we are entitled to disclose such information. For more
            information about how we process your personal data you can review
            our Privacy Notice.
          </p>
        </div>
      ),
    },
    {
      title: 'USING YOUR ACCOUNT',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">11. Instructions</h3>
          <h4 className="text-lg font-semibold">11.1. Giving Instructions</h4>
          <p>
            You must ensure that any Instruction submitted is complete and
            accurate. We are not required to verify the accuracy, authenticity
            or validity of any Instruction and will not monitor or reject
            Instructions on the basis that they are, or appear to be,
            duplicates. However, if we are in doubt as to the accuracy,
            authenticity or validity of an Instruction, we may refuse to act
            upon or defer acting upon any Instruction, or seek further
            information with respect to the Instruction.
          </p>
          <p>
            Instructions are irrevocable and therefore once an Instruction has
            been submitted you, or your Permitted Users, have no right to
            rescind or withdraw it without our written consent. Your Instruction
            is not deemed to be received by us until it has been received by our
            server. Our record of all Instructions will be conclusive and
            binding on you for all purposes.
          </p>

          <h4 className="text-lg font-semibold">
            11.2. Acting on your Instructions
          </h4>
          <p>
            By submitting an Instruction you or your Permitted Users are
            authorising us to initiate the Transaction on your InfraFund
            Account. We are therefore authorised to credit or debit (or provide
            settlement information to third parties for the purposes of the
            third party crediting or debiting) your Digital Assets from your
            InfraFund Account in accordance with your Instruction. If you have
            insufficient Digital Assets or Fiat Currency in your InfraFund
            Account to effect the Transaction (i.e. less than the required
            amount to settle the Transaction and to pay all the fees associated
            with the Transaction), then we have the right to refuse to effect
            any Transaction. InfraFund may also refuse to act on instructions to
            the extent permitted by these Terms. It is your responsibility to
            hold sufficient Digital Assets or Fiat Currency credited in your
            InfraFund Account.
          </p>

          <h4 className="text-lg font-semibold">
            11.3. Protection of Instructions
          </h4>
          <p>
            You are aware that Instructions and information transmitted on the
            Platform or by email are generally transmitted via the internet and
            may be routed via public, transnational installations which are not
            specifically protected. We cannot guarantee that the Instructions
            and information transmitted will be completely protected against
            unauthorised access, and you accept the associated risks.
          </p>

          <h4 className="text-lg font-semibold">11.4. Withdrawals</h4>
          <p>
            Subject to these Terms and any applicable Product Terms, and
            provided that you have sufficient balance on your InfraFund Account
            and the relevant Digital Assets are not on hold in your InfraFund
            Account in connection with any InfraFund Service, you may give
            Instructions to InfraFund to transfer Digital Assets to an external
            wallet address by submitting a withdrawal request on the Platform.
            Upon receipt of the withdrawal request, InfraFund will: (i) deduct
            your InfraFund Account balance; and (ii) initiate an on-chain
            transfer to an external wallet designated by you. InfraFund may not
            process a withdrawal request if, in our reasonable opinion, we
            consider that Applicable Law prevents the execution of the relevant
            withdrawal. InfraFund may also suspend withdrawals at such time
            deemed appropriate by InfraFund to resolve any incidents on the
            Platform. Once such incidents have been resolved, InfraFund will
            resume withdrawals.
          </p>
        </div>
      ),
    },
    {
      title: '12. Transactions',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            12.1. Entering into Transactions
          </h3>
          <p>
            You may enter into Transactions directly with us, or directly with
            other users, which may or may not be facilitated by us.
          </p>
          <p>
            We do not represent or warrant that any Transaction will be
            completed successfully or within a specific time period.
          </p>

          <h3 className="text-xl font-semibold">
            12.2. Unauthorised Transactions
          </h3>
          <p>
            You are responsible for the control and use of your InfraFund
            Account. As such, we will assume that you, or a Permitted User, have
            authorised any Instruction sent from your InfraFund Account unless
            we are notified otherwise. It is important that you monitor your
            Account History to ensure any unauthorised or suspicious activity on
            your InfraFund Account is identified and notified to us as soon as
            possible. We are not responsible for any claim or losses resulting
            from a Transaction executed as a result of an unauthorised
            Instruction unless you have notified us in accordance with this
            clause and it is confirmed by our internal investigation that you,
            or a Permitted User, have not authorised the Instruction in any way,
            even by mistake, negligence, error or as a consequence of a fraud
            and it is proven that the unauthorized Instruction is solely due to
            a technical issue attributable to InfraFund.
          </p>

          <h3 className="text-xl font-semibold">
            12.3. Retention of Transaction information
          </h3>
          <p>
            To facilitate compliance with global industry standards for data
            retention, you agree to permit us (but agree to not require us) to
            keep a record of all Transaction information for the lifetime of
            your InfraFund Account as long as it is required to fulfil their
            intended purposes, or such other period as prescribed by Applicable
            Law. Please review our Privacy Notice for more information on how we
            collect and use data relating to the use and performance of our
            Sites and the InfraFund Services.
          </p>
        </div>
      ),
    },
    {
      title: '13. Material interests and conflicts',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">13.1. InfraFund group</h3>
          <p>
            You understand that InfraFund is a member of a group of companies
            which is involved in activities connected with Digital Assets.
          </p>

          <h3 className="text-xl font-semibold">13.2. Nature of our duties</h3>
          <p>
            You understand and agree that neither your relationship with us nor
            any InfraFund Service we provide to you, nor any other matter, will
            give rise to any duties on our part or on the part of any InfraFund
            Affiliate, whether legal, equitable, fiduciary in nature, save as
            are expressly set out in these terms. In particular, we and any
            InfraFund Affiliate may from time to time act in more than one
            capacity, and in those capacities we may receive fees or commissions
            from more than one user (including you). You agree that we may act
            in such capacities and provide any other InfraFund Services or carry
            out any business with or for you, any InfraFund Affiliate or any
            other user.
          </p>

          <h3 className="text-xl font-semibold">13.3. Material interests</h3>
          <p>
            You understand and agree that neither we nor any InfraFund Affiliate
            will be required to: (1) have regard to any information known to us,
            or to any InfraFund Affiliate, which is a material interest; (2)
            disclose any such information to you; or (3) use any such
            information for your benefit. You further acknowledge that from time
            to time we may receive general market information in the course of
            providing InfraFund Services to you, which we may use in the
            ordinary course of our business.
          </p>

          <h3 className="text-xl font-semibold">13.4. Conflicts of interest</h3>
          <p>
            We have established and maintain effective organisational and
            administrative arrangements with a view to taking all appropriate
            steps to identify and manage conflicts of interest between us and
            our users and relevant third parties, so as to prevent conflicts of
            interest from adversely affecting the interests of our users. In
            cases where such organisational and administrative arrangements are
            not sufficient to ensure that the risks of damage to your interests
            will be prevented, we will inform you of the nature and/or sources
            of the relevant conflicts of interest and the steps taken to
            mitigate those risks in order to allow you to make an informed
            decision as to whether to continue to transact with us. We reserve
            the right at all times to decline to act for you where we are not
            able to manage a conflict of interest in any other way.
          </p>
        </div>
      ),
    },
    {
      title: '14. Transaction limits',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            14.1. Your Transaction limits
          </h3>
          <p>Your InfraFund Account may be subject to a limit on:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> the amount or volume of Transactions you may
              undertake in connection with your InfraFund Account; and/or
            </li>
            <li>
              <strong>b.</strong> the amount or value of Fiat Currency or
              Digital Assets you may transfer into or out of your InfraFund
              Account,
            </li>
          </ul>
          <p>
            in each case in a given period (e.g. daily). Any applicable limits
            are shown in your InfraFund Account.
          </p>

          <h3 className="text-xl font-semibold">
            14.2. Changes to your Transaction limits
          </h3>
          <p>
            We reserve the right to change any Transaction limit that applies to
            your InfraFund Account at any time at our absolute discretion. It
            may also be possible for you to request a change in your limits. Any
            change will be made in our absolute discretion and will be subject
            to any further conditions that we deem necessary.
          </p>
        </div>
      ),
    },
    {
      title: '15. Supported Digital Assets',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            15.1. Supported Digital Assets
          </h3>
          <p>
            The InfraFund Services are only available in connection with
            Supported Digital Assets, which may change from time to time. A list
            of the Supported Digital Assets is published on our Website. We may
            remove or suspend one or more Digital Assets from the list of
            Supported Digital Assets and we will use reasonable commercial
            efforts to notify you in advance, meaning that you will no longer be
            able to access such Digital Assets as part of the InfraFund Services
            and will only be permitted to withdraw the Digital Assets from your
            InfraFund Account. If Digital Assets that are no longer Supported
            Digital Assets remain in your InfraFund Account beyond a specified
            period notified to you, InfraFund may in its reasonable discretion
            convert such Digital Assets into a different type of Digital Asset
            that is a stablecoin. InfraFund shall notify you in advance of any
            conversion and you may withdraw such Digital Assets within a
            reasonable period as specified by InfraFund to you, prior to their
            conversion into stablecoins.
          </p>
          <p>
            We assume no liability in connection with any attempt to use your
            InfraFund Account for Digital Assets that we do not support nor for
            the conversion to a different type of Digital Asset, as described in
            this clause. In addition we assume no liability or obligation
            whatsoever with regard to unsupported Digital Assets sent to a
            InfraFund Account or with regard to Supported Digital Assets sent to
            an incompatible Digital Asset wallet address. If you send
            unsupported Digital Assets to a InfraFund Account or Supported
            Digital Assets to an incompatible Digital Asset wallet address, then
            you will lose those Digital Assets. For some lost Digital Assets,
            InfraFund may in its sole discretion offer you the option to attempt
            a recovery. We may charge fees to process the recovery attempt on
            your behalf. We will calculate all fees at our discretion, and
            notify you of the applicable fees at or before the time you
            authorize the recovery attempt. InfraFund does not guarantee in any
            way the amount of assets (if any) that may be recovered in a
            recovery attempt. The actual amount recovered may differ from the
            estimated recovery amount. InfraFund does not evaluate or provide
            any assurance as to the authenticity, safety, or security of
            unsupported Digital Assets. You acknowledge and agree that InfraFund
            is not liable for any loss incurred during the recovery attempt or
            subsequent use of the recovered Digital Asset.
          </p>

          <h3 className="text-xl font-semibold">15.2. Forks</h3>
          <p>
            We may temporarily suspend any InfraFund Services in relation to a
            particular Digital Asset while we determine whether or not to
            support a Fork. We are under no obligation to support a Fork of a
            Digital Asset that you hold in your InfraFund Account, regardless of
            whether any resulting version of such Forked Digital Asset is a
            Dominant Digital Asset or not. If we elect to support a Fork of a
            Digital Asset, we will make a public announcement through our
            Website or by such other means as we may deem appropriate.
          </p>
          <p>
            You acknowledge that we have no control over, nor do we have the
            ability to influence, the creation or implementation of a Fork. We
            can provide no assurances about the security, functionality or
            supply of any Digital Asset, including both the new Dominant Digital
            Asset or other Digital Assets subject to the relevant Fork. You may
            not be able to trade the Forked Digital Assets on the Platform and
            you may lose any value associated with the relevant Digital Assets.
          </p>

          <h3 className="text-xl font-semibold">15.3. Forks and Airdrops</h3>
          <p>
            InfraFund makes no promises, guarantees or warranties on the outcome
            of or support for potential or proposed Forks, Forked Digital Assets
            or Airdrops. InfraFund may determine in its sole discretion whether
            to claim, list or distribute any Airdrop, Forked Digital Asset or
            any other Digital Asset, as well as the terms and conditions
            (including eligibility criteria) that will apply to any claim,
            listing or distribution of any Airdrop or Forked Digital Asset. If
            you wish to participate in a Fork or Airdrop, please withdraw the
            affected Digital Asset to your own private wallet well ahead of the
            potential or proposed Fork or Airdrop.
          </p>

          <h3 className="text-xl font-semibold">15.4. Backed Digital Assets</h3>
          <p>
            We may from time to time support Digital Assets that purport to be
            backed by or otherwise tied or pegged in value to another asset,
            including without limitation Digital Assets, Fiat Currency or
            commodities such as silver or gold (“Backed Digital Assets”). You
            acknowledge and agree that (a) you have read, understood and
            accepted all of the terms and conditions and risks associated with
            each particular Backed Digital Asset before entering into any
            Transaction relating to that Backed Digital Asset and (b) InfraFund
            does not and will not in any circumstances have any no obligation
            whatsoever to purchase, repurchase or effect or facilitate the
            redemption of your Backed Digital Assets. We reserve the right to
            change, suspend, or discontinue any service in relation to any
            Backed Digital Asset at any time in our sole discretion. We make no
            representation as to whether any particular Backed Digital Asset
            will hold its value as against any asset, nor as to the amount or
            quality of reserves or collateral held by each issuer or any third
            party in relation to any Backed Digital Asset.
          </p>
        </div>
      ),
    },
    {
      title: '16. Account security',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">16.1. Your responsibility</h3>
          <p>
            You are responsible for taking appropriate action to protect your
            hardware and data from viruses and malicious software, and any
            inappropriate material. Except as provided by Applicable Law, you
            are responsible for backing up and maintaining duplicate copies of
            any information you store or transfer through the InfraFund
            Services. We are not responsible for any claim or losses resulting
            from your failure to comply with this clause.
          </p>

          <h3 className="text-xl font-semibold">16.2. Security measures</h3>
          <p>
            At all times, you and any Permitted Users shall maintain adequate
            security and control of all of your Access IDs. You are responsible
            for taking the necessary security measures (or ensuring that your
            Permitted Users take such measures) to protect your InfraFund
            Account and to keep your Access ID secure, including by:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> strictly abiding by all of our mechanisms or
              procedures;
            </li>
            <li>
              <strong>b.</strong> creating a strong password and maintaining
              security and control of your Access IDs;
            </li>
            <li>
              <strong>c.</strong> keeping the Email Account and telephone number
              provided to us up to date in order to receive any notices or
              alerts that we may send you;
            </li>
            <li>
              <strong>d.</strong> never allowing remote access or sharing your
              computer and/or computer screen with someone else when you are
              logged on to your InfraFund Account;
            </li>
            <li>
              <strong>e.</strong> remembering that under no circumstances will
              we ask you to share your passwords or 2-factor authentication
              codes; and
            </li>
            <li>
              <strong>f.</strong> logging out from the Sites or the Platform at
              the end of each visit.
            </li>
          </ul>
          <p>
            You must keep the Email Account and Access IDs secure against any
            attacks and unauthorised access. You must notify us immediately if
            you have knowledge or have reason for suspecting that the security
            of your Email Account, or that of a Permitted User, has been
            compromised or if there has been any unauthorised use of your or any
            Permitted User’s Email Account.
          </p>

          <h3 className="text-xl font-semibold">
            16.3. Monitoring your Account History
          </h3>
          <p>
            It is important that you monitor your Account History to ensure any
            unauthorised or suspicious activity on your InfraFund Account is
            identified and notified to us as soon as possible. You acknowledge
            that any Security Breach may result in unauthorised access to your
            InfraFund Account by third parties and the loss or theft of any
            Digital Assets and/or funds held in your InfraFund Account and any
            associated accounts, including your linked bank account(s) and
            credit card(s).
          </p>

          <h3 className="text-xl font-semibold">
            16.4. If you suspect a Security Breach
          </h3>
          <p>If you suspect a Security Breach, you must ensure that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> we are notified immediately using the details
              set out in clause ‎3.1 and continue to be provided with accurate
              and up to date information throughout the duration of the Security
              Breach;
            </li>
            <li>
              <strong>b.</strong> your InfraFund Account is immediately locked
              via the disable account function on the Platform or via any other
              method as may be prescribed by us from time to time; and
            </li>
            <li>
              <strong>c.</strong> you take any other steps that we may
              reasonably require to reduce, manage or report any Security
              Breach.
            </li>
          </ul>
          <p>
            We reserve the right to request, and you agree to promptly provide,
            any and all information and documents we deem relevant or necessary
            in connection with an actual or suspected Security Breach. You
            further acknowledge and agree that we may provide such information
            to any third party that we deem necessary in order to investigate or
            resolve any Security Breach.
          </p>
        </div>
      ),
    },
    {
      title: 'OTHER IMPORTANT INFORMATION',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">17. Privacy</h3>
          <h4 className="text-lg font-semibold">17.1. The Privacy Notice</h4>
          <p>
            Our collection and use of personal data in connection with these
            Terms, the InfraFund Services, the Platform and any Site is as
            provided in our Privacy Notice (as updated from time to time). You
            acknowledge that we may process personal data in relation to you,
            that you have provided to us, or we have collected from you in
            connection with these Terms and in accordance with Privacy Notice.
            Your personal data will be processed in accordance with the Privacy
            Notice, which shall form part of these Terms.
          </p>
          <p>You represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> you acknowledge that you have read and
              understood our Privacy Notice.
            </li>
            <li>
              <strong>b.</strong> our business changes regularly and our Privacy
              Notice will change also. Therefore, if from time to time we
              provide you with a replacement version of the Privacy Notice, you
              will promptly read the Privacy Notice.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '18. Changes to the Terms, etc.',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            18.1. How and when we can make changes
          </h3>
          <p>
            We can make changes to these Terms and any terms and conditions
            incorporated by reference (including any Product Terms) at any time
            and your continued use of the InfraFund Services constitutes your
            consent to such changes. Changes to these Terms will be published on
            our website and may also be notified to users separately by email,
            through the app or by such other means as InfraFund determines in
            its discretion.
          </p>
          <p>
            Generally, InfraFund will try to notify users prior to changes to
            these Terms taking effect. However, we may occasionally need to make
            changes that are effective immediately, in which case users will be
            notified as soon as possible after the changes take effect. The
            circumstances in which changes to these Terms may take effect
            immediately may include, for example and without limitation, where:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> the change is to address legal and/or
              regulatory requirements;
            </li>
            <li>
              <strong>b.</strong> the changes are to make these Terms clearer;
              and/or
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            18.2. When changes come into effect
          </h3>
          <p>
            Save where changes come into effect immediately, any update to the
            Terms will come into effect after the changes have been notified to
            users. If you do not wish to accept the changes, you are free to
            close your InfraFund Account in accordance with clause ‎19.1 of
            these Terms. Your continued access to or use of any InfraFund
            Services will be deemed acceptance of the updated Terms.
          </p>

          <h3 className="text-xl font-semibold">18.3. Changes to fees</h3>
          <p>
            We may also make changes to the fees set out in the Fee Structure
            page on our Website, which includes introducing new fees and/or
            charges. If you do not wish to accept the changes, you are free to
            close your InfraFund Account in accordance with clause ‎19.1 of
            these Terms. Your continued access to or use of the InfraFund
            Services will be deemed acceptance of the updated Terms.
          </p>
        </div>
      ),
    },
    {
      title: '19. Closing your InfraFund Account',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            19.1. Your right to close your InfraFund Account
          </h3>
          <p>
            You may terminate your InfraFund Account at any time by following
            the account termination procedures as prescribed by us from time to
            time. You will not be charged for terminating your InfraFund
            Account, although you will be required to pay any outstanding
            amounts owed to us. You authorise us to cancel or suspend any
            pending transactions at the time of cancellation, and to deduct any
            outstanding amounts that you owe us from your InfraFund Account.
          </p>
          <p>
            In certain cases, you may not be able to close your InfraFund
            Account, including where:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> you are trying to evade an investigation by
              relevant authorities;
            </li>
            <li>
              <strong>b.</strong> you have a pending Transaction or an open
              Claim;
            </li>
            <li>
              <strong>c.</strong> your InfraFund Account has any outstanding
              amounts owed to us; or
            </li>
            <li>
              <strong>d.</strong> your InfraFund Account is subject to a freeze,
              hold, limitation or reserve.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            19.2. What happens when your InfraFund Account is closed
          </h3>
          <p>
            If your InfraFund Account is closed, you will be required to
            withdraw all Digital Assets held in your InfraFund Account. In the
            event that you fail to withdraw your Digital Assets, or if you have
            not accessed your InfraFund Account for a continuous period of 90
            days, will send you notice of our intention to treat your account as
            dormant.
          </p>

          <h3 className="text-xl font-semibold">
            19.3. What happens when your account becomes dormant
          </h3>
          <p>
            If you do not respond to the notice in clause 19.2 within 30 days,
            we may:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> mark your InfraFund Account as a dormant
              account;
            </li>
            <li>
              <strong>b.</strong> convert the Digital Assets to a different type
              of Digital Asset. In doing so, we will not be liable for any loss
              of profit, tax obligations or any other loss, damage or expense
              incurred by you resulting from such conversion;
            </li>
            <li>
              <strong>c.</strong> transfer such dormant account and/or any
              Digital Assets held in that account to any third party (including,
              without limitation, another InfraFund Affiliate, any third-party
              custodian or an isolated wallet) if we consider it is reasonably
              necessary to do so. If this happens, you have the right to
              retrieve your Digital Assets, subject to satisfying our (or the
              relevant third party’s) reasonable verification requirements and
              any other applicable terms and conditions;
            </li>
            <li>
              <strong>d.</strong> adjust your dormant account such that you will
              receive a contractual claim on the quantity and type of Digital
              Assets, which were held on your InfraFund Account before being
              converted into a dormant account;
            </li>
            <li>
              <strong>e.</strong> charge a dormant account fee which may be to
              cover the cost of maintaining the Digital Assets with any
              InfraFund Affiliate or any third party, with such fee to be
              withdrawn directly from the dormant account on a monthly basis;
              and
            </li>
            <li>
              <strong>f.</strong> close a dormant account at any time.
            </li>
          </ul>
          <p>
            You acknowledge that we will be under no obligation to pay any
            reward, incentive or interest which we might otherwise have agreed
            to pay, under the applicable Product Terms, to your dormant account
            in relation to the Digital Assets credited to it.
          </p>
        </div>
      ),
    },
    {
      title: '20. Termination, suspension, holds and restrictions',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">20.1. Our right</h3>
          <p>
            We may at any time modify or discontinue, temporarily or
            permanently, any portion or feature of the InfraFund Services. In
            particular, we may: (1) refuse to complete or block, cancel, or,
            where permitted by Applicable Law, reverse any Transaction you have
            authorised; (2) terminate, suspend, or restrict your access to any
            or all of the InfraFund Services; (3) terminate, suspend, close,
            hold or restrict your access to any or all of your InfraFund
            Account(s); (4) refuse to transmit information or Instructions to
            third parties (including but not limited to third-party wallet
            operators); and/or (5) take whatever action we consider necessary,
            in each case with immediate effect and for any reason including, but
            not limited to where:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> you are not, or are no longer, eligible to use
              one or more InfraFund Services;
            </li>
            <li>
              <strong>b.</strong> we reasonably suspect that:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> the person logged into your InfraFund Account
              is not you, or we suspect that the InfraFund Account has been or
              will be used for any illegal, fraudulent, or unauthorised
              purposes;
            </li>
            <li>
              <strong>ii.</strong> the person logged into your Corporate
              InfraFund Account is not a Permitted User, or we suspect that the
              Corporate InfraFund Account has been or will be used for any
              illegal, fraudulent, or unauthorised purposes;
            </li>
            <li>
              <strong>iii.</strong> more than one natural person has access to
              and/or transacts using the same InfraFund Account, or we suspect
              that InfraFund Account has been or will be used for any illegal,
              fraudulent, or unauthorised purposes;
            </li>
            <li>
              <strong>iv.</strong> information provided by you is wrong,
              untruthful, outdated, or incomplete;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>c.</strong> we have reasonable concerns in relation to
              your creditworthiness or financial status, including:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> in the event that you are an individual, you
              become bankrupt, of unsound mind, commit an act of bankruptcy, or
              have action to place you in bankruptcy commenced against you;
            </li>
            <li>
              <strong>ii.</strong> in the event that you are acting on behalf of
              a partnership, any of the partners die or become bankrupt or of
              unsound mind, commit an act of bankruptcy, or have action to place
              any of the partners in bankruptcy commenced, or if action is
              commenced to dissolve and/or alter the partners or the
              constitutions of the partnership;
            </li>
            <li>
              <strong>iii.</strong> in the event that you are acting on behalf
              of a corporation, the corporation is unable to pay its debts as
              and when they are due, or action is commenced to place the
              corporation in insolvency, judicial management, receivership,
              administrative management, or any similar or analogous
              proceedings;
            </li>
            <li>
              <strong>iv.</strong> you convene a meeting of your creditors or
              propose or make any compromise or arrangement with or any
              assignment for the benefit of your creditors;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>d.</strong> pending submission of such information and
              documents in accordance with clause ‎8;
            </li>
            <li>
              <strong>e.</strong> pending submission of enhanced due diligence
              in accordance with clause ‎7.4;
            </li>
            <li>
              <strong>f.</strong> we reasonably consider that we are required to
              do so by Applicable Law, or any court or authority to which we are
              subject in any jurisdiction;
            </li>
            <li>
              <strong>g.</strong> we have determined or suspect:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> that you have breached these Terms or any
              Product Terms;
            </li>
            <li>
              <strong>ii.</strong> that you have breached any express or implied
              warranties in these Terms, or any representations you have made;
            </li>
            <li>
              <strong>iii.</strong> that any Transaction is unauthorised,
              erroneous, fraudulent, or unlawful or we have determined or
              suspect that your InfraFund Account or the InfraFund Services are
              being used in a fraudulent, unauthorised, or unlawful manner;
            </li>
            <li>
              <strong>iv.</strong> there is any occurrence of money laundering,
              terrorist financing, fraud or any other crime in connection with
              your InfraFund Account or your use of the InfraFund Services;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>h.</strong> the use of your InfraFund Account is subject
              to any pending, ongoing or threatened litigation, investigation,
              or judicial, governmental or regulatory proceedings and/or we
              perceive a heightened risk of legal or regulatory non-compliance
              associated with your InfraFund Account activity;
            </li>
            <li>
              <strong>i.</strong> you owe amounts to InfraFund that are not
              satisfied, whether due to a chargeback or on any other basis;
            </li>
            <li>
              <strong>j.</strong> any email communication to your Email Account
              is returned as undeliverable;
            </li>
            <li>
              <strong>k.</strong> an issue has arisen with the verification of
              your identity;
            </li>
            <li>
              <strong>l.</strong> you have taken any action that may circumvent
              our controls such as opening multiple InfraFund Accounts without
              our written consent or abusing promotions which we may offer from
              time to time; or
            </li>
            <li>
              <strong>m.</strong> there is any other valid reason which means we
              need to do so.
            </li>
          </ul>
          <p>
            We will take reasonable steps to provide you with appropriate
            notice. However, there might be times when we are required not to do
            so by Applicable Law.
          </p>

          <h3 className="text-xl font-semibold">20.2. Your acknowledgement</h3>
          <p>You acknowledge and agree that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> the examples set out in clause ‎20.1 above of
              when we might take action to terminate, suspend, close or restrict
              your access to your InfraFund Account and/or the InfraFund
              Services is a non-exhaustive list; and
            </li>
            <li>
              <strong>b.</strong> our decision to take certain actions,
              including, without limitations, to terminate, suspend, or restrict
              your access to your InfraFund Account or the InfraFund Services,
              may be based on confidential criteria that are essential to our
              risk management and security protocols. You agree that we are
              under no obligation to disclose the details of our risk management
              and security procedures to you.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">
            20.3. What happens when we exercise our right
          </h3>
          <p>
            Where we terminate, suspend, hold or restrict your access to one or
            more InfraFund Services:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> if you have Instructions, trades, positions or
              Transactions that are open, they may be closed by you, or by us,
              depending on the circumstances of the termination, suspension,
              hold, restriction or other action we take;
            </li>
            <li>
              <strong>b.</strong> any chargeback resulting from the use of your
              InfraFund Account or InfraFund Services may result in an immediate
              suspension and/or restriction of your InfraFund Account and
              InfraFund Services;
            </li>
            <li>
              <strong>c.</strong> to reactivate suspended and/or restricted
              InfraFund Account or InfraFund Services, you may be required to
              reimburse us for the full value of the chargeback, including any
              amounts that are owing to us including any applicable fees; and
            </li>
            <li>
              <strong>d.</strong> you are liable for any credited amounts in
              case of a chargeback, and you authorise and grant us the right to
              deduct costs and fees directly from any assets in your InfraFund
              Account without notice.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">20.4. Unlawful possession</h3>
          <p>
            If we are informed and reasonably believe that any Digital Assets or
            Fiat Currencies held in your InfraFund Account are stolen or
            otherwise are not lawfully possessed by you (whether by error or
            otherwise), we may, but have no obligation to, place a hold on the
            affected funds and your InfraFund Account. Where we place a hold on
            some or all of any Digital Assets or Fiat Currencies held in your
            InfraFund Account, or on your entire InfraFund Account, we may
            continue such hold until such time as evidence, acceptable to us,
            proves that you are entitled to possession of the Digital Assets
            and/or Fiat Currency held in your InfraFund Account. We will not get
            involved in any dispute, or the resolution of the dispute, relating
            to any Digital Assets and/or Fiat Currency held in your InfraFund
            Account.
          </p>

          <h3 className="text-xl font-semibold">
            20.5. Access to InfraFund Services in other jurisdictions
          </h3>
          <p>
            Residents of some countries may only be able to access some, but not
            all, InfraFund Services. We may change the InfraFund Services that
            are available to you from time to time. If you travel to a location
            included on our List of Prohibited Countries, InfraFund Services may
            not be available and your access to the InfraFund Services may be
            blocked. You acknowledge that this may impact your ability to trade
            on the Platform and/or monitor any existing orders or open positions
            or otherwise use the InfraFund Services. You must not attempt in any
            way to circumvent any such restriction, including by use of any
            virtual private network to modify your internet protocol address.
          </p>
        </div>
      ),
    },
    {
      title: 'INTELLECTUAL PROPERTY',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">21. Background IP</h3>
          <p>The InfraFund IP shall remain vested in InfraFund.</p>

          <h3 className="text-xl font-semibold">22. Licence of InfraFund IP</h3>
          <p>
            We grant to you a non-exclusive licence for the duration of these
            Terms, or until we suspend or terminate your access to the InfraFund
            Services, whichever is sooner, to use the InfraFund IP, excluding
            the Trade Marks, solely as necessary to allow you to receive the
            InfraFund Services for non-commercial personal or internal business
            use, in accordance with these Terms.
          </p>

          <h3 className="text-xl font-semibold">23. Licence of User IP</h3>
          <h4 className="text-lg font-semibold">23.1. Your grant of licence</h4>
          <p>
            You grant to us a perpetual, irrevocable, royalty-free, worldwide
            and non-exclusive licence to use the User IP to the extent it:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> forms part of, or is necessary for the use of,
              any Created IP; and
            </li>
            <li>
              <strong>b.</strong> is necessary to allow us to provide you with
              the InfraFund Services, from time to time.
            </li>
          </ul>

          <h4 className="text-lg font-semibold">
            23.2. Our right to sub-licence
          </h4>
          <p>
            The licence granted by you under this clause ‎includes our right to
            sub-licence to a third party to the extent required to enable us and
            any InfraFund Affiliates to provide you with the InfraFund Services,
            or any part of them.
          </p>

          <h3 className="text-xl font-semibold">24. Created IP</h3>
          <h4 className="text-lg font-semibold">24.1 Created IP</h4>
          <p>
            The Created IP shall automatically vest in us from time to time on
            the date on which it is created.
          </p>

          <h4 className="text-lg font-semibold">24.2 Assignment</h4>
          <p>
            You hereby assign to us (and agree to procure that any agents,
            representatives or contractors assign), with full title guarantee,
            title to all present and future rights and interest in the Created
            IP.
          </p>
          <p>
            If requested to do so, you shall (and agree to procure that any
            agents, representatives or contractors shall), without charge to us,
            sign and/or execute all documents and do all such acts as we may
            require to perfect the assignments under this clause.
          </p>
        </div>
      ),
    },
    {
      title: '25. General',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">25.1 We are not responsible</h3>
          <p>
            You agree and acknowledge that: (1) we are not responsible for any
            User Material (whether provided by you or by third parties) which
            may be made available on the Platform or the Sites; and (2) use of
            any such User Material is at your own risk and that we do not
            provide any warranties in relation to the same.
          </p>

          <h3 className="text-xl font-semibold">25.2 Our rights</h3>
          <p>
            We shall have the right at our sole and absolute discretion to
            remove, modify or reject any content that you submit to, post or
            display on the Platform or the Sites (including any User Material)
            for any reason. We reserve the right to take any actions as we deem
            appropriate at our sole discretion, including giving a written
            warning to you, removing any User Material, recovering damages or
            other monetary compensation from you, suspending or terminating your
            InfraFund Account (if any), or suspending your access to the
            Platform and/or the Sites. We shall also have the right to restrict
            or ban you from any and all future use of any InfraFund Services.
          </p>

          <h3 className="text-xl font-semibold">25.3 Recording</h3>
          <p>
            You agree that we may record any communications, electronic, by
            telephone, over video call, or otherwise, that we have with you in
            relation to these Terms, and that any recordings that we keep will
            constitute evidence of the communications between you and us. You
            agree that telephone conversations and video calls may be recorded
            so that we can respond to inquiries, ensure compliance with
            applicable laws, improve our services and provide customer support.
          </p>
        </div>
      ),
    },
    {
      title: 'YOUR OBLIGATIONS AND LIABILITY',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">26. Prohibited use</h3>
          <p>
            By opening a InfraFund Account or carrying out any Transaction, and
            without prejudice to any other restriction or limitation set out in
            these terms, you agree that you and any Permitted User will not:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> breach these Terms or any agreement entered
              into pursuant to, or in connection with, these Terms, including,
              but not limited to, any Product Terms;
            </li>
            <li>
              <strong>b.</strong> use InfraFund Services in a manner that
              violates our Prohibited Use Policy;
            </li>
            <li>
              <strong>c.</strong> use InfraFund Services for resale or
              commercial purposes, including transactions on behalf of other
              persons or entities, unless expressly agreed by us in writing;
            </li>
            <li>
              <strong>d.</strong> use the InfraFund Services for anything which,
              in InfraFund’s sole opinion, is conduct designed to control or
              artificially affect the price of any Digital Asset (market
              manipulation) including, without limitation, pump and dump
              schemes, wash trading, self-trading, front running, quote
              stuffing, and spoofing or layering) regardless of whether
              prohibited by Applicable Law;
            </li>
            <li>
              <strong>e.</strong> engage in fraudulent activities, or cause us
              to suspect that you or any Permitted User have engaged in
              fraudulent activities and/or Transactions;
            </li>
            <li>
              <strong>f.</strong> use InfraFund Services to conduct or
              participate in lotteries; gambling activities; bidding fee
              auctions; sports forecasting or odds making; fantasy sports
              leagues with cash prizes; internet gaming; contests; sweepstakes;
              or games of chance;
            </li>
            <li>
              <strong>g.</strong> (1) receive, or attempt to receive, funds from
              both us and another user for the same Transaction during the
              course of a Claim; (2) conduct your business or use the InfraFund
              Services in a manner that results in, or may result in,
              complaints, disputes, claims, reversals, chargebacks, fees, fines,
              penalties, or other liability to us, other users, third parties,
              or yourself; and (3) allow your InfraFund Account to have a
              negative value or quantity of Digital Assets;
            </li>
            <li>
              <strong>h.</strong> provide false, inaccurate or misleading
              information in connection with your use of the InfraFund Services,
              in communications with us, or otherwise connected with these
              Terms;
            </li>
            <li>
              <strong>i.</strong> (1) use any deep linking, web crawlers, bots,
              spiders or other automatic devices, programs, scripts, algorithms
              or methods, or any similar or equivalent manual processes to
              access, obtain, copy or monitor any part of the Platform, or
              replicate or bypass the navigational structure or presentation of
              InfraFund Services in any way, in order to obtain or attempt to
              obtain any materials, documents or information in any manner not
              purposely provided through InfraFund Services; (2) attempt to
              access any part or function of the Platform without authorisation,
              or connect to InfraFund Services or any of our servers or any
              other systems or networks of any InfraFund Services provided
              through the Platform by hacking, password mining or any other
              unlawful or prohibited means; (3) probe, scan or test the
              vulnerabilities of InfraFund Services or any network connected to
              the Platform, or violate any security or authentication measures
              on InfraFund Services or any network connected to InfraFund
              Services; (4) reverse look-up, track or seek to track any
              information of any other users or visitors of InfraFund Services;
              (5) take any actions that impose an unreasonable or
              disproportionately large load on the infrastructure of systems or
              networks of InfraFund Services or InfraFund, or the infrastructure
              of any systems or networks connected to InfraFund Services; (6)
              use any devices, software or routine programs to interfere with
              the normal operation of InfraFund Services or any transactions on
              InfraFund Services, or any other person’s use of InfraFund
              Services; or (7) forge headers, impersonate, or otherwise
              manipulate identification, to disguise your identity or the origin
              of any messages or transmissions you send to us;
            </li>
            <li>
              <strong>j.</strong> modify or adapt the whole or any part of the
              Platform or combine or incorporate the Platform into another
              programme or application;
            </li>
            <li>
              <strong>k.</strong> disassemble, decompile, reverse-engineer or
              otherwise attempt to derive the source code, object code
              underlying concepts, ideas and algorithms of the Platform or any
              components thereof;
            </li>
            <li>
              <strong>l.</strong> modify, replicate, duplicate, copy, download,
              store, further transmit, disseminate, transfer, disassemble,
              broadcast, publish, remove or alter any copyright statement or
              label, or licence, sub-licence, sell, mirror, design, rent, lease,
              private label, grant security interests in such InfraFund IP or
              any part of the intellectual properties, or create derivative
              works or otherwise take advantage of any part of the InfraFund IP;
            </li>
            <li>
              <strong>m.</strong> facilitate any viruses, Trojan horses, worms
              or other computer programming routines that may damage,
              detrimentally interfere with, surreptitiously intercept, or
              expropriate any system, data or information in connection with the
              InfraFund Services;
            </li>
            <li>
              <strong>n.</strong> (1) use an anonymizing proxy; (2) use any
              temporary, disposable, self-destructive, or similar email address
              when opening a InfraFund Account and/or using the InfraFund
              Services; (3) use any device, software, or routine to bypass our
              robot exclusion headers, or interfere or attempt to interfere with
              our Sites or the InfraFund Services; and (4) take any action that
              may cause us to lose any of the services from our internet service
              providers, or other suppliers;
            </li>
            <li>
              <strong>o.</strong> create, or purport to create, any security
              over your Fiat Currency or Digital Assets held in any of your
              InfraFund Account without our prior written consent;
            </li>
            <li>
              <strong>p.</strong> violate, or attempt to violate, (1) any
              Applicable Law; or (2) ours or any third party’s copyright,
              patent, trademark, trade secret, or other intellectual property
              rights, or rights of publicity or privacy; and/or
            </li>
            <li>
              <strong>q.</strong> access, use, or attempted to access or use,
              InfraFund Services directly or indirectly with (1) jurisdictions
              InfraFund has deemed high risk, including but not limited to,
              Cuba, Iran, North Korea, Syria, Crimea region or (2) persons
              InfraFund has deemed high risk, including but not limited to,
              individuals or entities named as a restricted person or party on
              any list maintained by the United States of America., United
              Kingdom, European Union or United Nations, including the sanctions
              lists maintained by the U.S. Office of Foreign Assets Control or
              the Denied Persons List or Entity List maintained by the U.S.
              Department of Commerce.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '27. Representations and warranties',
      content: (
        <div className="space-y-4">
          <p>
            You hereby represent and warrant to us, at all times, the following:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> all documents and information you provide to
              us are true, accurate, complete, and up to date in all respects,
              and may be relied upon by us in determining whether or not you are
              eligible to access the Platform or to use the InfraFund Services;
            </li>
            <li>
              <strong>b.</strong> all decisions made in connection with these
              Terms were solely and exclusively based on your own judgement and
              after your own independent appraisal of your financial resources,
              ability and willingness to take relevant risks and financial
              objectives;
            </li>
            <li>
              <strong>c.</strong> you have full power, authority, and capacity
              to (1) access and use the Platform and/or the InfraFund Services;
              and (2) enter into and deliver, and perform your obligations under
              these Terms and any agreement entered into pursuant to, or in
              connection with, these Terms, including, but not limited to, any
              Product Terms;
            </li>
            <li>
              <strong>d.</strong> if you are a corporation, partner in a
              partnership, or trustee of a trust:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> the corporation, partnership or trust has and
              will be operated in a way that is compliant with Applicable Law,
              and any partnership or trust deeds (or other like documents);
            </li>
            <li>
              <strong>ii.</strong> you will notify us immediately if there is
              any change, by way of resignation, removal, appointment or death,
              of any of the directors, partners, trustees, settlor(s) or
              ultimate beneficial owners or any person authorised to operate
              your InfraFund Account; and
            </li>
            <li>
              <strong>iii.</strong> you will inform us immediately if the
              corporation, partnership, or trust is dissolved either on a
              voluntary or involuntary basis;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>e.</strong> all consents, permissions, authorisations,
              approvals and agreements of third parties and all authorisations,
              approvals, permissions, consents, registrations, declarations,
              filings with any Regulatory Authority, governmental department,
              commission, agency or other organisation having jurisdiction over
              you which are necessary or desirable for you to obtain in order to
              (1) access and use the Platform and/or the InfraFund Services; and
              (2) enter into and deliver, and perform the Transactions
              contemplated under these Terms and any agreement entered into
              pursuant to, or in connection with, these Terms, have been
              unconditionally obtained in writing, disclosed to us in writing,
              and have not been withdrawn or amended;
            </li>
            <li>
              <strong>f.</strong> these Terms and any agreement entered into
              pursuant to, or in connection with, these Terms constitute valid
              and legally binding obligations, enforceable against you in
              accordance with their respective terms;
            </li>
            <li>
              <strong>g.</strong> that you are not a Restricted Person;
            </li>
            <li>
              <strong>h.</strong> if you are a legal entity, you are duly
              incorporated, duly organised, and validly existing under the laws
              of your jurisdiction and have full power to conduct your business.
              If you are an individual, you are not less than 18 years old; and
            </li>
            <li>
              <strong>i.</strong> your access and use of the Platform and/or the
              InfraFund Services, your execution and delivery of, and the
              performance of your obligations under these Terms and any
              agreement entered into pursuant to, or in connection with, these
              Terms, will not:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> if you are a legal entity, partner in a
              partnership or trustee of a trust result in a breach of or
              conflict with any provision of your constitution, articles of
              association, partnership agreement, trust deed or equivalent
              constitutive documents;
            </li>
            <li>
              <strong>ii.</strong> result in a breach of, or constitute a
              default under, any instrument, agreement, document or undertaking
              to which you are a party or by which you or any of your property
              is bound or subject; and
            </li>
            <li>
              <strong>iii.</strong> result in you, or cause us or any third
              party to, breach any Applicable Law, decree or judgement of any
              court, or any award of any arbitrator or those of any governmental
              or Regulatory Authority in any jurisdiction.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '28. Technology disclaimers',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            28.1. No representation or warranty
          </h3>
          <p>
            InfraFund Services and any information provided on the Sites and the
            Platform, including Chat Services, are provided on an “as is” and
            “as available” basis without any representation or warranty, whether
            express or implied, to the maximum extent permitted by Applicable
            Law. Specifically, we disclaim any implied warranties of title,
            merchantability, fitness for a particular purpose and/or
            non-infringement. We do not make any representations or warranties
            that access to the Sites, the Platform, any of your InfraFund
            Account(s), InfraFund Services, or any of the materials contained
            therein, will be continuous, uninterrupted, timely or error-free.
            This could result in the inability to trade on the Platform for a
            period of time and may also lead to time delays.
          </p>

          <h3 className="text-xl font-semibold">28.2. Suspension of access</h3>
          <p>
            We may, from time to time, suspend access to your InfraFund Account
            and/or the InfraFund Services, for both scheduled and emergency
            maintenance. We will make reasonable efforts to ensure that
            Transactions on the Platform are processed in a timely manner, but
            we make no representations or warranties regarding the amount of
            time needed to complete processing, which is dependent upon many
            factors outside of our control.
          </p>

          <h3 className="text-xl font-semibold">28.3. Content</h3>
          <p>
            Although we make reasonable efforts to update the information on the
            Sites and the Platform, we make no representations, warranties or
            guarantees, whether express or implied, that the content on the
            Sites and the Platform, including information in relation to the
            InfraFund Services, is accurate, complete or up to date.
          </p>

          <h3 className="text-xl font-semibold">28.4. Third-party websites</h3>
          <p>
            Links to third-party websites (including, without limitation,
            content, materials, and/or information in the third-party websites)
            may be provided as a convenience but they are not controlled by us.
            You acknowledge and agree that we are not responsible for any aspect
            of the content, materials, information or services contained in any
            third-party websites accessible or linked from the Platform or the
            Sites.
          </p>

          <h3 className="text-xl font-semibold">
            28.5. Network Access and Compatibility
          </h3>
          <p>
            You are responsible for obtaining the data network access necessary
            to use the InfraFund Services. You are responsible for acquiring and
            updating compatible hardware or devices necessary to access and use
            the InfraFund Services and Sites and any updates thereto. InfraFund
            does not guarantee that the InfraFund Services, or any portion
            thereof, will function on any particular hardware or devices. The
            InfraFund Services may be subject to malfunctions and delays
            inherent in the use of the internet and electronic communications.
          </p>
        </div>
      ),
    },
    {
      title: '29. Indemnity',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">29.1. Third-party claims</h3>
          <p>
            You hereby undertake and agree to indemnify us and hold us harmless
            upon demand from and against any claims, suits, actions, demands,
            disputes, allegations, or investigations brought by any third-party,
            governmental authority, or industry body, and all claims,
            liabilities, damages (actual and consequential), losses (including
            any direct, indirect or consequential losses, loss of profit, loss
            of reputation), costs, and expenses, including without limitation
            all interest, penalties and legal and other reasonable attorneys’
            fees and other professional costs and expenses (“Losses”), arising
            out of or in any way connected with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> your access to or use of your InfraFund
              Account and/or the InfraFund Services;
            </li>
            <li>
              <strong>b.</strong> your breach or alleged breach of these Terms
              or your contravention of any other clause or sub-clause of these
              Terms, including any Product Terms and any other terms and
              conditions incorporated by reference;
            </li>
            <li>
              <strong>c.</strong> your contravention of any Applicable Law; and
            </li>
            <li>
              <strong>d.</strong> your violation of the rights of any third
              party.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">29.2. Release</h3>
          <p>
            You hereby irrevocably and unconditionally agree to release us from
            any and all claims and demands (and waive any rights you may have
            against us now or in future in relation to any Losses you may suffer
            or incur), arising directly or indirectly out of or in connection
            with any dispute that you have with any other user or other third
            party in connection with the InfraFund Services (including any
            Digital Asset Transactions) or the subject matter of these Terms.
          </p>
        </div>
      ),
    },
    {
      title: '30. Liability',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">30.1 Our Liability</h3>
          <p>
            Neither InfraFund nor any InfraFund Affiliate will have any
            responsibility or liability for any loss suffered by you or any
            third party, except to the extent that such loss arises solely and
            directly as a result of the gross negligence, willful misconduct,
            actual fraud or material and continuing breach of obligation under
            these Terms by InfraFund. Without prejudice to the foregoing and
            notwithstanding any other clause in these Terms, in no event will
            the liability of InfraFund and all InfraFund Affiliates in aggregate
            exceed the amount of fees paid by you to InfraFund in the 12 month
            period immediately before the event giving rise to the loss. Such
            sum shall be paid by us to you in full and final settlement and
            satisfaction of ours and any InfraFund Affiliate’s entire liability
            for any and all losses and claims, howsoever arising, from the
            relevant events. You acknowledge and agree that neither InfraFund
            nor any InfraFund Affiliate is aware of any special circumstances
            pertaining to you, and that damages are an adequate remedy and that
            you shall not be entitled to any other claims or remedies at law or
            in equity, including but not limited to, any claim in rem,
            injunction, and/or specific performance.
          </p>

          <h3 className="text-xl font-semibold">
            30.2 Limitations on liability
          </h3>
          <p>
            Notwithstanding any other clause in these Terms, you hereby
            acknowledge and agree that in no event will we or any InfraFund
            Affiliate be responsible or liable to you or any other person or
            entity for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> any direct or indirect losses (including loss
              of profits, business or opportunities), damages, or costs, whether
              arising out of or in connection with the InfraFund Services or
              otherwise, including but not limited to:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> any risk identified in the Risk Warning, as
              updated from time to time;
            </li>
            <li>
              <strong>ii.</strong> the operation of the protocols underlying any
              Digital Asset, their functionality, security, or availability;
            </li>
            <li>
              <strong>iii.</strong> whether Backed Digital Assets hold their
              value as against any asset, or if the issuer of the Backed Digital
              Asset holds sufficient reserves in relation to any Backed Digital
              Asset;
            </li>
            <li>
              <strong>iv.</strong> any action or inaction in accordance with
              these Terms;
            </li>
            <li>
              <strong>v.</strong> any inaccuracy, defect or omission of Digital
              Assets price data, any error or delay in the transmission of such
              data, and interruption in any such data;
            </li>
            <li>
              <strong>vi.</strong> regular or unscheduled maintenance we carry
              out including any service interruption and change resulting from
              such maintenance;
            </li>
            <li>
              <strong>vii.</strong> the theft of a device enabled to access and
              use InfraFund Services;
            </li>
            <li>
              <strong>viii.</strong> other users’ actions, omissions or breaches
              of these Terms, and any damage caused by actions of any other
              third parties;
            </li>
            <li>
              <strong>ix.</strong> (1) for any damage or interruptions caused by
              any computer viruses, spyware, or other malware that may affect
              your computer or other equipment, or any phishing, spoofing, or
              other attack; (2) in the event that your hardware fails, is
              damaged or destroyed or any records or data stored on your
              hardware are corrupted or lost for any reason; or (3) for your use
              of the internet to connect to the InfraFund Services or any
              technical problems, system failures, malfunctions, communication
              line failures, high internet traffic or demand, related issues,
              security breaches or any similar technical problems or defects
              experienced;
            </li>
            <li>
              <strong>x.</strong> our decision to reject your application to
              open a InfraFund Account(s);
            </li>
            <li>
              <strong>xi.</strong> any termination, suspension, hold or
              restriction of access to any InfraFund Account or InfraFund
              Services, including your inability to withdraw Digital Assets,
              issue Instructions or enter into Transactions during the period of
              any suspension, hold or restriction, in accordance with these
              Terms or any Product Terms;
            </li>
            <li>
              <strong>xii.</strong> any Transaction limits applied to your
              InfraFund Account;
            </li>
            <li>
              <strong>xiii.</strong> any election by us to support or not
              support Digital Assets;
            </li>
            <li>
              <strong>xiv.</strong> us being unable to contact you using the
              contact information you provided;
            </li>
            <li>
              <strong>xv.</strong> us closing a dormant account;
            </li>
            <li>
              <strong>xvi.</strong> the failure of a Transaction or the length
              of time needed to complete any Transaction;
            </li>
            <li>
              <strong>xvii.</strong>
            </li>
            <li>
              <strong>xviii.</strong> our refusal or delay in acting upon any
              Instruction;
            </li>
            <li>
              <strong>xix.</strong> any breach of security of your Email Account
              or a Security Breach;
            </li>
            <li>
              <strong>xx.</strong> losses suffered by you as a result of third
              party action, including third party fraud or scams that involve
              InfraFund only as the recipient of your Fiat Currency or Digital
              Assets, and/or the conversion of Fiat Currency to Digital Assets;
            </li>
            <li>
              <strong>xxi.</strong> losses suffered by you as a result of the
              transfer of Digital Assets away from our platform at your request;
            </li>
            <li>
              <strong>xxii.</strong> any losses arising or in connection with
              new offerings of Digital Assets, initial coin offerings (ICOs), or
              the decision to list or not list Digital Assets on the Platform;
            </li>
            <li>
              <strong>xxiii.</strong> a Network Event, a Fork or an Airdrop;
            </li>
            <li>
              <strong>xxiv.</strong> the correctness, quality, accuracy,
              security, completeness, reliability, performance, timeliness,
              pricing or continued availability of the InfraFund Services or for
              delays or omissions of the InfraFund Services, or for the failure
              of any connection or communication service to provide or maintain
              your access to the InfraFund Services, or for any interruption in
              or disruption of your access or any erroneous communications
              between us, regardless of cause; and
            </li>
            <li>
              <strong>xxv.</strong> any Transactions, Instructions, or
              operations effected by you or purported to be effected by you
              through your Email Account or InfraFund Account;
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>b.</strong> any loss of business, profits, anticipated
              savings or opportunities, or any special, punitive, aggravated,
              incidental, indirect or consequential losses or damages, whether
              arising out of or in connection with our Sites, the Platform, your
              InfraFund Account, the InfraFund Services, these Terms, the
              Product Terms, the Privacy Notice and/or any agreement entered
              into pursuant to, or in connection with, these Terms or otherwise;
            </li>
            <li>
              <strong>c.</strong> any losses or damages you may incur due to
              Manifest Error and/or in the event of extreme market volatility
              and/or as a result of any cancellation/amendment of any
              Transactions, howsoever arising, whether direct or indirect,
              special or consequential, including, but not limited to, loss of
              profit and loss of opportunity even if InfraFund was aware of the
              possibility of such loss or damage arising or if such loss or
              damage was reasonably foreseeable; and/or
            </li>
            <li>
              <strong>d.</strong> any losses forming part of a Claim that has
              not been commenced by way of formal legal action WITHIN ONE
              CALENDAR YEAR of the commencement of matters giving rise to the
              Claim. YOU AGREE AND ACKNOWLEDGE THAT THIS CLAUSE VARIES ANY
              LIMITATION PERIOD OTHERWISE APPLICABLE BY LAW, AND THAT IF
              APPLICABLE LAW PROHIBITS THIS, THIS CLAUSE WILL BE READ AS A
              LIMITATION PERIOD OF THE MINIMUM ENFORCEABLE LENGTH. WITHOUT
              PREJUDICE TO THE GENERALITY OF THE FOREGOING, YOUR ATTENTION IS
              ALSO DRAWN TO CLAUSE 32 AGREEING THAT CLAIMS SHALL BE RESOLVED
              EXCLUSIVELY BY WAY OF BINDING ARBITRATION.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">30.3 Damage or interruption</h3>
          <p>
            We are not liable for any damage or interruptions caused by any
            computer viruses, spyware, scareware, Trojan horses, worms, or other
            malware that may affect your computer or other equipment, or any
            phishing, spoofing, or other attack. We advise the regular use of a
            reputable and readily available virus screening and prevention
            software. You should also be aware that SMS and email services are
            vulnerable to spoofing and phishing attacks and should use care in
            reviewing messages purporting to originate from us. You and, where
            relevant, your Permitted Users are responsible for all login
            credentials, including usernames and passwords and must keep
            security details safe at all times.
          </p>

          <h3 className="text-xl font-semibold">30.4 Fiat Currency</h3>
          <p>
            For the avoidance of doubt, any balance on your InfraFund Account
            displayed and denominated in a Fiat Currency shall not be taken to
            mean that InfraFund directly holds Fiat Currency, nor does it mean
            that InfraFund receives, holds, or releases any Fiat Currency or
            engages in deposit taking, remittance or similar activity in respect
            of Fiat Currency.
          </p>
        </div>
      ),
    },
    {
      title: 'RESOLVING DISPUTES: FORUM, ARBITRATION, CLASS ACTION WAIVER',
      content: (
        <div className="space-y-4">
          <p>
            For the avoidance of doubt, nothing in this section will deprive you
            of any mandatory legal right from which you benefit under Applicable
            Law.
          </p>

          <h3 className="text-xl font-semibold">
            31. Notice of Claim and Dispute Resolution Period
          </h3>
          <h4 className="text-lg font-semibold">
            31.1. Please contact InfraFund first if you have any concerns with
            the Services
          </h4>
          <p>
            InfraFund wants to address your concerns without resorting to formal
            legal proceedings, if possible. A ticket number will be assigned to
            you if your concerns cannot be addressed to your satisfaction at
            first instance. The issuance of the ticket number commences the
            internal dispute resolution procedure. InfraFund will attempt to
            resolve the dispute internally as soon as possible. The parties
            agree to negotiate in good faith to resolve the dispute (which
            discussions shall remain confidential and be subject to applicable
            rules protecting settlement discussions from use as evidence in any
            legal proceeding).
          </p>

          <h4 className="text-lg font-semibold">
            31.2. In the event the dispute cannot be resolved satisfactorily
          </h4>
          <p>
            and you wish to assert a Claim against InfraFund, then you agree to
            set forth the basis of such Claim in writing in a “Notice of Claim,”
            as a form of prior notice to InfraFund. The Notice of Claim must (1)
            describe the nature and basis of the claim or dispute, (2) set forth
            the specific relief sought, (3) provide the original ticket number,
            and (4) include your custody account email. The Notice of Claim
            should be submitted to the following web address:
            https://www.infrafund.net/chat. After you have provided the Notice
            of Claim to InfraFund, the dispute referenced in the Notice of Claim
            may be submitted by either InfraFund or you to arbitration in
            accordance with the below clause (Agreement to Arbitrate).
          </p>

          <h4 className="text-lg font-semibold">
            31.3. For the avoidance of doubt
          </h4>
          <p>
            the submission of a dispute to InfraFund for resolution internally
            and the delivery of a Notice of Claim to InfraFund are prerequisites
            to commencement of an arbitration proceeding (or any other legal
            proceeding).
          </p>

          <h4 className="text-lg font-semibold">
            31.4. During the arbitration
          </h4>
          <p>
            the amount of any settlement offer made by you or InfraFund shall
            not be disclosed to the arbitrator.
          </p>
        </div>
      ),
    },
    {
      title: '32. Agreement to Arbitrate',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            32.1. Aside from where Applicable Law requires or provides you with
            a choice otherwise
          </h3>
          <p>
            you and InfraFund agree that, subject to the immediately preceding
            clause above (Notice of Claim and Dispute Resolution Period), any
            Claim shall be determined by mandatory final and binding individual
            (not class) arbitration administered by the Hong Kong International
            Arbitration Centre (“HKIAC”) in accordance with the HKIAC Rules for
            the time being in force, which rules are deemed incorporated by
            reference in this clause.
          </p>

          <h3 className="text-xl font-semibold">
            32.2. The seat of arbitration shall be Hong Kong.
          </h3>

          <h3 className="text-xl font-semibold">
            32.3. The Tribunal shall consist of one (1) arbitrator to be
            appointed in accordance with the HKIAC Rules for the time being in
            force.
          </h3>

          <h3 className="text-xl font-semibold">
            32.4. The language of the arbitration shall be in English.
          </h3>

          <h3 className="text-xl font-semibold">
            32.5. You and InfraFund further agree that the arbitrator shall have
            the exclusive power to rule on his or her own jurisdiction,
            including without limitation any objections with respect to the
            existence, scope or validity of the Agreement to Arbitrate, or to
            the arbitrability of any Claim.
          </h3>

          <h3 className="text-xl font-semibold">
            32.6. The arbitration provisions set forth in this clause will
            survive termination of these Terms.
          </h3>

          <h3 className="text-xl font-semibold">
            32.7. Limitation period for filing
          </h3>
          <p>
            Any arbitration against InfraFund must be commenced by filing and
            serving a Notice of Arbitration in accordance with the HKIAC Rules
            within one (1) year after the date that the user asserting the Claim
            first found out or reasonably should have found out the alleged act,
            omission or default giving rise to the Claim (“Limitation Period”).
            For the avoidance of doubt, the Limitation Period shall include the
            Dispute Resolution Period set out at clause 31.1. There shall be no
            right to any remedy or relief for any Claim by the user if the
            Notice of Arbitration in respect of that Claim is not filed and
            served on InfraFund within that Limitation Period. If the Limitation
            Period is contrary to applicable law, the user shall be required to
            bring any Claim against InfraFund within the shortest time period
            permitted by the applicable law. A Notice of Arbitration may be
            served on InfraFund in accordance with the Applicable Laws and rules
            of service.
          </p>

          <h3 className="text-xl font-semibold">32.8. Notice</h3>
          <p>
            if InfraFund commences arbitration against you, InfraFund will give
            you notice at the email address or mailing address you have
            provided. You agree that any notice sent to this email or mailing
            address shall be deemed effective for all purposes, including
            without limitation to determinations of the adequacy of service. It
            is your obligation to ensure that the email address and/or mailing
            address on file with InfraFund is up-to-date and accurate.
          </p>
        </div>
      ),
    },
    {
      title: '33. Confidentiality',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            33.1. The parties agree that the arbitration shall be kept
            confidential
          </h3>
          <p>
            The existence of the arbitration, the existence or content of the
            Claim, all documents and information provided or exchanged in
            connection with the arbitration, and any submissions, orders or
            awards made in the arbitration shall be kept confidential and no
            party shall disclose any of the foregoing to any third party except
            the tribunal, the HKIAC, the parties, their counsels, experts,
            witnesses, accountants and auditors, insurers and reinsurers, and
            any other persons necessary to the conduct of the arbitration.
            Notwithstanding the foregoing, a party may disclose such
            confidential information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> if the written consent of the other party is
              obtained;
            </li>
            <li>
              <strong>b.</strong> to the extent required by applicable law or by
              the regulations of any regulatory or supervisory authority of
              competent jurisdiction to which the party is or may become subject
              to or pursuant to any order of court or other competent authority
              or tribunal of competent jurisdiction;
            </li>
            <li>
              <strong>c.</strong> in connection with the commencement, pursuit
              or defence by a party of any bona fide legal proceedings to
              enforce or challenge any award rendered in the arbitration; and
            </li>
            <li>
              <strong>d.</strong> to the extent that the relevant confidential
              information is in the public domain otherwise than by breach of
              this agreement.
            </li>
          </ul>
          <p>
            This term of confidentiality in this clause shall survive
            termination of these Terms and conclusion or stay of any arbitration
            brought pursuant to these Terms.
          </p>
        </div>
      ),
    },
    {
      title: '34. Governing law',
      content: (
        <div className="space-y-2">
          <p>
            Aside from where Applicable Law requires or provides you with a
            choice otherwise, these Terms (including this arbitration agreement)
            shall be governed by, and construed in accordance with, the laws of
            Hong Kong.
          </p>
        </div>
      ),
    },
    {
      title: '35. Class action waiver',
      content: (
        <div className="space-y-2">
          <p>
            You and InfraFund agree that any Claims shall be brought against
            InfraFund in an arbitration on an individual basis only and not as a
            plaintiff or class member in a purported class or representative
            action. You further agree to waive any right for such Claims to be
            brought, heard, or arbitrated as a class, collective,
            representative, or private attorney general action, to the extent
            permissible by applicable law. Combining or consolidating individual
            arbitrations into a single arbitration is not permitted without the
            consent of InfraFund.
          </p>
        </div>
      ),
    },
    {
      title: 'GENERAL',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">36. General terms</h3>
          <h4 className="text-lg font-semibold">36.1. Applicable Law</h4>
          <p>
            You and any Permitted User must comply with all Applicable Law,
            licensing requirements and third party rights (including data
            privacy laws and anti-money laundering and countering the financing
            of terrorism laws) in your use of the InfraFund Services, your
            InfraFund Account and the Platform.
          </p>

          <h4 className="text-lg font-semibold">36.2. Notices</h4>
          <p>
            We may give notice by email to your Email Account. It is your
            responsibility to ensure that the Email Account is up to date and
            accurate. Notices may be given, and are deemed to be received, if
            sent to your Email Account, whether or not a notice of delivery
            failure is received.
          </p>
          <p>
            You may give us notices only as we direct, which may change from
            time to time.
          </p>
          <p>
            Any notices, consent or other communication given under these Terms
            must be in writing, in English, and signed or otherwise authorised
            by the party giving it.
          </p>

          <h4 className="text-lg font-semibold">36.3. Announcements</h4>
          <p>
            All official announcements, news, promotions, competitions and
            Airdrops will be listed on the Website. These announcements are
            important, and may relate to issues that may impact the value of
            your Digital Assets, or their security. You are responsible for
            monitoring the Website and reading and considering these
            announcements.
          </p>

          <h4 className="text-lg font-semibold">36.4. Entire agreement</h4>
          <p>
            The Terms, together with any applicable Product Terms, constitute
            the whole agreement between you and us with respect to the InfraFund
            Services. Each party acknowledges that it has not relied on, and
            shall have no right or remedy in respect of, any statement,
            representation, assurance or warranty (whether made negligently or
            innocently) other than as expressly set out in the Terms or any
            Product Terms.
          </p>

          <h4 className="text-lg font-semibold">36.5. Assignment</h4>
          <p>
            You may not assign or transfer any of your rights or obligations
            under the Terms without our prior written consent, which may, in
            some cases, require additional information to be provided or
            enhanced due diligence to be performed. However, we may assign or
            transfer any of our rights or obligations under the Terms at any
            time to anyone else, including, without limitation, in connection
            with any merger, acquisition, or other corporate reorganisation
            involving InfraFund.
          </p>

          <h4 className="text-lg font-semibold">36.6. Invalidity</h4>
          <p>
            If, at any time, any clause or sub-clause of the Terms is or becomes
            illegal, invalid, or unenforceable in any respect, neither the
            legality, validity or enforceability of the remaining clauses or
            sub-clauses will in any way be affected or impaired.
          </p>

          <h4 className="text-lg font-semibold">36.7. Records</h4>
          <p>
            You agree that we may record any telephone, email and chat
            conversations with you, as well as any other forms of
            communications, including communication used to give Instructions or
            effect Transactions, between you and us, and that the recordings may
            be used as evidence in any proceedings relating to any agreement
            with you. These records will be our sole property.
          </p>

          <h4 className="text-lg font-semibold">36.8. Language</h4>
          <p>
            These Terms may be translated into a language other than the English
            language. Any such translation is provided solely for your
            convenience. In the event of inconsistency or ambiguity, the English
            text will prevail.
          </p>

          <h4 className="text-lg font-semibold">36.9. Third party rights</h4>
          <p>
            Other than in relation to InfraFund Affiliates, nothing expressed or
            referred to in these Terms will be construed to give any person
            other than the parties to these Terms any legal or equitable right,
            remedy, or claim under or with respect to these Terms or any clause
            or sub-clause of these Terms. The Terms and all of its clauses and
            sub-clauses are for the sole and exclusive benefit of the parties to
            these Terms and their successors and permitted assigns.
          </p>

          <h4 className="text-lg font-semibold">36.10. Survival</h4>
          <p>
            All clauses and sub-clauses of these Terms, which by their nature
            extend beyond the expiration or termination of these Terms, will
            continue to be binding and operate after the termination or
            expiration of these Terms.
          </p>

          <h4 className="text-lg font-semibold">
            36.11. Relationship of the parties
          </h4>
          <p>
            InfraFund is not an agent of you in the performance of these Terms.
            These Terms shall not be interpreted as facts or evidence of an
            association, joint venture, partnership, or franchise between the
            parties.
          </p>

          <h4 className="text-lg font-semibold">36.12. Digital Assets</h4>
          <p>
            We record in your InfraFund Account the quantity and type of any
            Digital Assets that are held to your credit. Digital Assets held by
            InfraFund to your credit will not be segregated on-chain in
            different wallets from Digital Assets held to the credit of other
            users or Digital Assets maintained by InfraFund for operating and
            business purposes. InfraFund uses an internal ledger to record
            customer entitlements to the quantity and type of Digital Assets.
            Each user will have an account which is a ledger-based (off-chain)
            account (or sub-account) within the InfraFund system with a unique
            identifier (UID) and associated login credentials, against which the
            relevant user credit balances are recorded. InfraFund is not a
            trustee of, and does not owe any trustee duties in relation to, any
            Digital Assets held to your credit. When you Instruct InfraFund to
            transfer or otherwise deal with Digital Assets, InfraFund will not
            use any specifically identifiable Digital Assets to act on your
            Instructions. Subject to these Terms, InfraFund will use Digital
            Assets in the same quantity and of the same type as those credited
            to your InfraFund Account when acting on your Instructions.
            Similarly, you will not have the right to recover any specific
            Digital Assets, rather you will have the right to receive the same
            quantity and same type of Digital Assets as those credited to your
            InfraFund Account.
          </p>

          <h4 className="text-lg font-semibold">36.13. Force Majeure</h4>
          <p>
            We will not be liable for any delay or failure to perform as
            required by these Terms to the extent the delay or failure is caused
            by a Force Majeure Event.
          </p>

          <h4 className="text-lg font-semibold">36.14. No waiver</h4>
          <p>
            No delay or omission by us in exercising any right or remedy under
            the Terms will operate as a waiver of the future exercise of that
            right or remedy or of any other rights or remedies under the Terms.
            The rights and remedies provided in the Terms are cumulative and not
            exclusive of any rights or remedies provided by Applicable Law.
          </p>

          <h4 className="text-lg font-semibold">36.15. Set-off</h4>
          <p>
            In addition to any legal or other remedy available under the Terms
            or by law, we may set-off any amounts you owe to us under the Terms
            or otherwise. You must pay all sums that you owe to us free and
            clear without any set-off, counterclaim, deduction or withholding of
            any kind, save as may be required by Applicable Law.
          </p>

          <h4 className="text-lg font-semibold">36.16. Privacy of others</h4>
          <p>
            If you receive information about another user through the Platform
            or from utilising the InfraFund Services, you must keep the
            information confidential and only use it in connection with the
            InfraFund Services and always in accordance with Applicable Law. You
            must not disclose or distribute any user information to a third
            party or use the information in any manner except as reasonably
            necessary to effect a Transaction.
          </p>

          <h4 className="text-lg font-semibold">
            36.17. Publication of breaches
          </h4>
          <p>
            Where you have breached these Terms, InfraFund may publish, or
            otherwise provide its users with details of the breach, including
            any information that you have provided InfraFund. InfraFund may only
            do so where it determines that doing so is necessary for the
            protection of other users, and consistent with Applicable Law.
          </p>

          <h4 className="text-lg font-semibold">
            36.18. Death of InfraFund Account holder
          </h4>
          <p>
            In the event of your death or incapacity, the representative(s) or
            legal beneficiary/beneficiaries of your estate may give us written
            notice. If we have reason to believe you have died, we may suspend
            your InfraFund Account. Your InfraFund Account will be suspended
            until:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> a representative of your estate or authorised
              beneficiary completes a successful inheritance application to
              receive the assets in your InfraFund Account in accordance with
              our requirements which may be amended from time to time without
              notice; ; or
            </li>
            <li>
              <strong>b.</strong> you provide satisfactory proof that you are
              not deceased.
            </li>
          </ul>
          <p>
            Our ability to provide your representative(s) with the assets in
            your InfraFund Account is subject to the restrictions imposed by
            Applicable Law and these Terms. We do not commit to any particular
            timeline for the transfer of assets held to the credit of your
            InfraFund Account.
          </p>

          <h4 className="text-lg font-semibold">36.19. Tax</h4>
          <p>
            It is your responsibility to determine what, if any, taxes apply to
            the payments you make or receive, and it is your responsibility to
            collect, report, and remit the correct tax to the appropriate tax
            authority. You agree that we are not responsible for determining
            whether any taxes apply to your use of the InfraFund Services, or
            for collecting, reporting or remitting any taxes arising from any
            Transaction or use of the InfraFund Services.
          </p>
          <p>
            You acknowledge that we may make certain reports to tax authorities
            regarding Transactions made on the Platform, and that we may, in our
            sole discretion or as required by Applicable Law, provide you with
            additional documentation or records needed by you to calculate any
            tax obligations. We may also withhold and deduct at source any taxes
            due under Applicable Law in our sole discretion.
          </p>
        </div>
      ),
    },
    {
      title: '37. Definitions and interpretation',
      content: (
        <div className="space-y-4">
          <p>In these Terms:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> clause headings and numbering are for
              convenience only and do not affect the meaning, priority or
              interpretation of any clause or sub-clause of these Terms;
            </li>
            <li>
              <strong>b.</strong> the words “include” or “including” shall mean
              including without limitation and include without limitation
              respectively;
            </li>
            <li>
              <strong>c.</strong> any undertaking to do or not do a thing shall
              be deemed to include an undertaking not to permit or suffer the
              doing of that act or thing;
            </li>
            <li>
              <strong>d.</strong> words importing the singular include the
              plural and vice versa and words importing a gender include any
              gender;
            </li>
            <li>
              <strong>e.</strong> any reference to a document is to that
              document as amended, varied or novated from time to time otherwise
              than in breach of these Terms or that document; and
            </li>
            <li>
              <strong>f.</strong> in the event of inconsistency between these
              Terms (including any documents referred to in these Terms) the
              inconsistency shall be solved by giving such provisions and
              documents the following order of precedence:
            </li>
          </ul>
          <ul className="list-disc pl-10 space-y-1">
            <li>
              <strong>i.</strong> the Product Terms;
            </li>
            <li>
              <strong>ii.</strong> the Privacy Notice; and
            </li>
            <li>
              <strong>iii.</strong> these Terms.
            </li>
          </ul>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>g.</strong> except where the context requires others, the
              following terms shall have the following meanings:
            </li>
          </ul>
          <p>
            <strong>Access IDs</strong> means your InfraFund Account details,
            username, passwords, personal identification numbers, API keys, API
            secret keys, or any other codes or forms of authentication that you
            use to access your InfraFund Account or the InfraFund Services or to
            send Instructions.
          </p>
          <p>
            <strong>Account History</strong> means the written record (including
            electronic records) of your Transactions and your InfraFund Account.
          </p>
          <p>
            <strong>Airdrop</strong> means the attempted distribution or
            distribution by a Digital Asset network of any Digital Asset to
            Digital Asset addresses of a supported network.
          </p>
          <p>
            <strong>API</strong> means application program interface.
          </p>
          <p>
            <strong>Applicable Law</strong> means all relevant or applicable
            statutes, laws (including rules of common law), principles of
            equity, rules, regulations, regulatory principles and requirements,
            notices, orders, writs, injunctions, judgements, bye-laws, rulings,
            directives, proclamations, circulars, mandatory codes of conduct,
            guidelines, practice notes and interpretations (whether of a
            governmental body, regulatory or other authority, or self-regulatory
            organisation of which InfraFund is a member), that are applicable to
            the provision, receipt or use of the InfraFund Services, or any
            other products or deliverables provided, used or received in
            connection with the InfraFund Services, these Terms, or any Product
            Terms.
          </p>
          <p>
            <strong>Backed Digital Assets</strong> has the meaning given to it
            in clause ‎15.3.
          </p>
          <p>
            <strong>InfraFund, we, our or us</strong> means Nest Services
            Limited (a company incorporated under the laws of the Republic of
            Seychelles with registration number 238045 and address at House of
            Francis, Room 303, Ile Du Port, Mahe, Seychelles).
          </p>
          <p>
            <strong>InfraFund Account</strong> means any accounts (including
            Corporate InfraFund Accounts) or sub-accounts (including any
            InfraFund Sub-Account), which are opened by InfraFund for you to
            record your use of InfraFund Services.
          </p>
          <p>
            <strong>InfraFund Affiliates</strong> means with respect to Nest
            Services Limited: any other person which, directly or indirectly,
            Controls, is Controlled by, or is under common Control with, Nest
            Services Limited.
          </p>
          <p>
            <strong>InfraFund API</strong> means an API made available by a
            InfraFund Affiliate to you as a service, or third-party applications
            relying on such an API.
          </p>
          <p>
            <strong>InfraFund IP</strong> means the Created IP and all other
            Intellectual Property Rights owned by or licensed, on a
            sub-licenseable basis, to us as at the date of the Terms and any
            other Intellectual Property Rights owned or acquired by or licensed,
            on a sub-licenseable basis, to us after the date of these Terms, and
            which are provided by us to you in the course of providing you with
            the InfraFund Services.
          </p>
          <p>
            <strong>InfraFund Services</strong> means the services offered by us
            to you through the Platform.
          </p>
          <p>
            <strong>InfraFund Sub-Account</strong> means a sub-account that is
            set up under a primary InfraFund Account.
          </p>
          <p>
            <strong>Chat Service</strong> has the meaning given to it in clause
            ‎5.
          </p>
          <p>
            <strong>Claim</strong> means any dispute, claim, difference or
            controversy between you and InfraFund (and/or any InfraFund
            Affiliates) arising out of, in connection with, or relating in any
            way to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(a)</strong> these Terms or any Product Terms, including
              their existence, validity, subject matter, interpretation,
              performance, breach, negotiation, termination, enforceability or
              the consequences of their nullity;
            </li>
            <li>
              <strong>(b)</strong> your relationship with InfraFund (and/or any
              InfraFund Affiliates) as a user (whether based in contract, tort,
              statute, fraud, misrepresentation, or any other legal theory, and
              whether the claims arise during or after the termination of these
              Terms); or
            </li>
            <li>
              <strong>(c)</strong> any non-contractual obligations arising out
              of or relating to these Terms, or any Product Terms, or your
              relationship with InfraFund (and/or any InfraFund Affiliates).
            </li>
          </ul>
          <p>
            <strong>Control</strong> means the power of a person to secure that
            the affairs of another are conducted in accordance with the wishes
            of the first person whether by means of:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>(a)</strong> in the case of a company, being the
              beneficial owner of more than fifty percent (50%) of the issued
              share capital of or of the voting rights in that company, or
              having the right to appoint and remove a majority of the directors
              or otherwise control the votes at board meetings of that company
              by virtue of any powers conferred by the organisational documents,
              shareholders’ agreement, a majority of the board of directors or
              any other document regulating the affairs of that company or by
              any other means; or
            </li>
            <li>
              <strong>(b)</strong> in the case of a partnership, being the
              beneficial owner of more than fifty percent (50%) of the capital
              of that partnership, or having the right to control the
              composition of or the votes to the majority of the management of
              that partnership by virtue of any powers conferred by the
              partnership agreement or any other document regulating the affairs
              of that partnership or by any other means.
            </li>
          </ul>
          <p>
            <strong>Corporate InfraFund Account</strong> means a InfraFund
            Account maintained for a corporation, entity, or other organisation
            for the provision of InfraFund Services.
          </p>
          <p>
            <strong>Created IP</strong> means any Intellectual Property Rights
            created by you pursuant to these Terms, including the User
            Materials, but excluding any other User IP.
          </p>
          <p>
            <strong>Digital Assets</strong> means a digital representation of
            value or rights which may be transferred and stored electronically,
            using distributed ledger technology or similar technology,
            including, but not limited to, cryptocurrencies, stablecoins,
            non-fungible tokens and tokenised derivatives of any other digital
            asset.
          </p>
          <p>
            <strong>Dominant Digital Asset</strong> means a Forked Digital Asset
            that has dominance over one or more other versions of a Digital
            Asset that was subject to the relevant Fork, as determined by us in
            our sole discretion.
          </p>
          <p>
            <strong>Email Account</strong> means the email account(s) associated
            with your InfraFund Account(s), as agreed with InfraFund from time
            to time, in accordance with any processes identified by InfraFund
            when using the Platform.
          </p>
          <p>
            <strong>Fiat Currency</strong> means any government or central bank
            issued national, or supra-national, currency, or other monetary
            obligation denominated in such currency and which is not a Digital
            Asset.
          </p>
          <p>
            <strong>Force Majeure Events</strong> means:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> any fire, strike, riot, civil unrest,
              terrorist act, war or industrial action;
            </li>
            <li>
              <strong>b.</strong> any natural disaster such as floods,
              tornadoes, earthquakes and hurricanes;
            </li>
            <li>
              <strong>c.</strong> any epidemic, pandemic or public health
              emergency of national or international concern;
            </li>
            <li>
              <strong>d.</strong> any act or regulation made by a government,
              supra national body or authority that we believe stops us from
              providing InfraFund Services on the Platform;
            </li>
            <li>
              <strong>e.</strong> the suspension or closure of any InfraFund
              Affiliate;
            </li>
            <li>
              <strong>f.</strong> the nationalisation of any InfraFund
              Affiliate;
            </li>
            <li>
              <strong>g.</strong> the imposition of limits or unusual terms by a
              government on any Digital Assets traded on our Platform;
            </li>
            <li>
              <strong>h.</strong> technical failures in transmission,
              communication or computer facilities including power failures and
              electronic or equipment failures;
            </li>
            <li>
              <strong>i.</strong> the failure of any supplier, intermediate
              broker, agent, principal custodian, sub-custodian, dealer,
              exchange, staking platform, liquidity pool, bridge provider,
              issuer of a Backed Digital Asset, market maker, clearing house or
              regulatory organisation to perform its obligations to us;
            </li>
            <li>
              <strong>j.</strong> any labour or trade disputes, strikes,
              industrial actions or lockouts (other than in each case by
              InfraFund or the InfraFund Affiliates); and/or
            </li>
            <li>
              <strong>k.</strong> an event which significantly disrupts the
              market for Digital Assets, which could include excessive movements
              in the price, supply or demand of a Digital Asset, whether
              regulated or unregulated.
            </li>
          </ul>
          <p>
            <strong>Fork</strong> means any planned, unplanned, sudden,
            scheduled, expected, unexpected, publicised, not well-known,
            consensual, and/or controversial changes to the underlying operating
            rules of certain Digital Assets that may occur from time to time, in
            such a way as to result in the creation of one or more related
            versions of an existing Digital Asset.
          </p>
          <p>
            <strong>Forked Digital Asset</strong> means a Digital Asset that
            results from a Fork.
          </p>
          <p>
            <strong>Improper Intent</strong> means InfraFund reasonably
            determines that there may be actual or suspected market manipulation
            and market abuse on your part, including (without limitation),
            capitalising on opportunities where the executable price of a
            Transaction does not reflect prevailing market rates, or taking
            unfair advantage of the way in which InfraFund offers prices.
          </p>
          <p>
            <strong>Instruction</strong> means any instruction, request, or
            order given to InfraFund by you or a Permitted User in relation to
            the operation of your InfraFund Account or to execute any
            Transaction, through such medium and in such form and manner as
            InfraFund may require and “Instruct” shall be construed accordingly.
          </p>
          <p>
            <strong>Intellectual Property Rights</strong> means: (a) copyright,
            patents, database rights and rights in trade marks, designs,
            know-how and confidential information (whether registered or
            unregistered); (b) applications for registration, and rights to
            apply for registration, of any of the foregoing rights; and (c) all
            other intellectual property rights and equivalent or similar forms
            of protection existing anywhere in the world.
          </p>
          <p>
            <strong>Local Terms</strong> means the terms governing your use of
            the InfraFund Services provided in any particular jurisdiction.
          </p>
          <p>
            <strong>Losses</strong> has the meaning given to it in clause ‎29.1.
          </p>
          <p>
            <strong>Manifest Error</strong> means any error, omission or
            misquote (whether an error of InfraFund or any third party) which is
            manifest or palpable, including a misquote by any representative of
            InfraFund taking into account the current market and currently
            advertised quotes, or any error of any information, source,
            official, official result or pronunciation.
          </p>
          <p>
            <strong>Mobile App</strong> means any mobile application developed
            or provided by us or any of the InfraFund Affiliates that enables
            you to use or otherwise access InfraFund Services.
          </p>
          <p>
            <strong>Network Event</strong> means in relation to a Digital Asset,
            any event (other than an Airdrop or Fork) in respect of the
            blockchain or the smart contract that underlies a Digital Asset,
            which is beyond InfraFund’s control, and results in either (a) a
            loss of control or ownership by InfraFund or a third party of any
            amount of such Digital Asset; or (b) transaction records on the
            blockchain being altered, reversed or otherwise invalidated, whether
            by way of a fraudulent act or consensus, which shall include without
            limitation any double spending attack, 51-percent attack, or
            blockchain reorganization, in each case as determined by InfraFund
            in good faith and in its sole discretion.
          </p>
          <p>
            <strong>Permitted User</strong> means any person identified by you
            and communicated to us, in accordance with these Terms, that is
            authorised to act on a user’s behalf with respect to any Corporate
            InfraFund Account, or with our prior written consent, on behalf of a
            third party with respect to a InfraFund Sub-Account associated with
            a Corporate InfraFund Account.
          </p>
          <p>
            <strong>Platform</strong> means the digital platform that we or any
            of the InfraFund Affiliates may make accessible to you via Sites,
            the Mobile App, a InfraFund API or by such other means as InfraFund
            Affiliates may prescribe from time to time for the use of InfraFund
            Services.
          </p>
          <p>
            <strong>Privacy Notice</strong> means the privacy notice located at
            https://www.infrafund.net/public-privacy-policy
          </p>
          <p>
            <strong>Product Terms</strong> means the product-specific terms and
            conditions that apply to the use of a InfraFund Service, in addition
            to these Terms.
          </p>
          <p>
            <strong>Regulatory Authority</strong> means any foreign, domestic,
            state, federal, cantonal, municipal or local governmental,
            executive, legislative, judicial, administrative, supervisory or
            regulatory authority, agency, quasi-governmental authority, court,
            commission, government organisation, self-regulatory organisation
            having regulatory authority, tribunal, arbitration tribunal or panel
            or supra-national organisation, or any division or instrumentality
            thereof, including any tax authority.
          </p>
          <p>
            <strong>Restricted Person</strong> means a person or legal entity
            who (a) is included in any trade embargoes or economic sanctions,
            terrorist or corrupt foreign officials list (such as the United
            Nations Security Council Sanctions List, issued by a government
            agency including the list of specially designated nationals
            maintained by the office of foreign assets control of the U.S.
            Department of the Treasury (OFAC), or the denied persons or entity
            list of the U.S. Department of Commerce), or by the United Kingdom,
            European Union, Canada) tor (b) resides, or is established, or has
            operations in, in any country listed in the List of Prohibited
            Countries.
          </p>
          <p>
            <strong>Risk Warning</strong> means the general risk warning
            published on the Website.
          </p>
          <p>
            <strong>Security Breach</strong> means
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>a.</strong> your InfraFund Account(s) or any of your
              Access IDs have been compromised;
            </li>
            <li>
              <strong>b.</strong> the loss, theft, or unauthorised use of any of
              your Access IDs or any unauthorised access to and use of your
              InfraFund Account or the InfraFund Services on your behalf; or
            </li>
            <li>
              <strong>c.</strong> any other security incident (including a
              cyber-security attack) affecting you and/or InfraFund.
            </li>
          </ul>
          <p>
            <strong>Sites</strong> means our Website and any other websites,
            pages, features, or content we own or operate.
          </p>
          <p>
            <strong>Supported Digital Assets</strong> means those Digital Assets
            that are available in connection with your use of the InfraFund
            Services.
          </p>
          <p>
            <strong>Terms</strong> means these terms of use, together with any
            other documents expressly incorporated by reference, including the
            Product Terms, in each case as amended or supplemented from time to
            time.
          </p>
          <p>
            <strong>Trade Marks</strong> means the Intellectual Property Rights
            in the trade marks, service marks and logos used and displayed on or
            through the Platform, the Sites and/or the InfraFund Services.
          </p>
          <p>
            <strong>Transaction</strong> means selling, purchasing, or entering
            into any other type of transactions, or agreeing to sell, purchase
            or enter into any other type of transactions involving Digital
            Asset(s), their derivatives, other asset(s) or product(s) as
            InfraFund may from time to time permit to be carried out on the
            Platform, and transferring Digital Assets or Fiat Currency into or
            out of your InfraFund Account.
          </p>
          <p>
            <strong>User IP</strong> means the Intellectual Property Rights
            owned by or licensed to you as at the date of these Terms and any
            other Intellectual Property Rights owned or acquired by or licensed
            to you after the date of these Terms, excluding InfraFund IP.
          </p>
          <p>
            <strong>User Materials</strong> means the Intellectual Property
            Rights in any reviews, posts, information, data, and comments you or
            other users provide to us on the Sites (through our “Contact Us”
            pages or otherwise), the Platform, through use of InfraFund
            Services, or otherwise.
          </p>
          <p>
            <strong>Website</strong> means the website located at
            www.InfraFund.net
          </p>
        </div>
      ),
    },
  ],
};

export default function Terms() {
  return (
    <div className="flex flex-col justify-center items-start text-white gap-8 py-[175px] px-4 md:px-6 lg:px-12 xl:px-[90px]">
      <h1 className="text-5xl font-bold">TERMS OF USE</h1>

      <div className="text-base font-normal space-y-6">
        <p>Last updated: {termsContent.lastUpdated}</p>
        <div className="space-y-4">
          {termsContent.intro
            .split('\n')
            .filter((line) => line.trim())
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">RISK WARNING</h2>
          <div className="space-y-2">
            {termsContent.riskWarning
              .split('\n')
              .filter((line) => line.trim())
              .map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
          </div>
        </section>

        {termsContent.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold">{section.title}</h2>
            <div className="space-y-2">{section.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
