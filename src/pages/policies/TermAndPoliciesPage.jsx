import React from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { HelmetItem } from '../../components/utils/HelmetItem';
// Constants
import { CompanyName } from '../../utils/Constants';
// Data
import { TermsAndPoliciesDataArray } from '../../utils/data/TermsData';
import { termsAndPoliciesAdditionalMeta, termsAndPoliciesStructuredData } from '../../utils/data/MetaData';

function TermAndPoliciesPage() {
  const headers = [
    { id: 'agreements', title: 'Agreements' },
    { id: 'policies', title: 'Policies' },
    { id: 'compliance', title: 'Compliance' },
    { id: 'other', title: 'Other' },
  ];

  return (
    <>
      {/* Tab Data */}
      <HelmetItem
        PageName="Terms and Policies"
        desc={`Explore the terms of service and privacy policies of ${CompanyName}.`}
        keywords={`terms, policies, privacy, compliance, ${CompanyName}`}
        additionalMeta={termsAndPoliciesAdditionalMeta}
        structuredData={termsAndPoliciesStructuredData}
      />

      {/* Page */}
      <div className="grid min-h-screen bg-main-background font-poppins">
        <div className="grid grid-rows-reg">
          {/* Navigation */}
          <Navbar />

          <div className="flex">
            {/* Sidebar */}
            <nav className="w-64 h-screen sticky top-0 overflow-y-auto bg-gray-100 p-4">
              {/* Policy options */}
              <ul className="space-y-2 text-sm">
                {headers.map((header, index) => (
                  <li key={index}>
                    <h3 className="text-lg font-semibold text-gray-800">{header.title}</h3>
                    <ul className="pl-4 space-y-1">
                      {TermsAndPoliciesDataArray.filter(
                        (section) => section.group === header.id
                      ).map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="text-hyperlink-blue hover:underline block"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-8 space-y-12 scroll-smooth">
              {headers.map((header, index) => (
                <section key={index} id={header.id}>
                  <h2 className="text-3xl font-bold mb-8">{header.title}</h2>
                  {TermsAndPoliciesDataArray.filter(
                    (section) => section.group === header.id
                  ).map((section, index) => (
                    <div key={index} id={section.id}>
                      <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                      {section.content.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermAndPoliciesPage;
