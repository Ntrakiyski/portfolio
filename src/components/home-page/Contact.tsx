import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';
import MainButton from '../common/MainButton';

const Contact = () => {
  const { contactSection } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="contact" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
        <div className="text-left mb-10">
          <SectionTitle
            tag={contactSection.tag}
            title={contactSection.headline}
            subtitle={contactSection.description}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <a
            href="mailto:nikolay.trakiyski@gmail.com"
            className="block bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 p-6"
          >
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 8.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 15.75v-7.5m19.5 0A2.25 2.25 0 0 0 19.5 6H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.4 5.25a2.25 2.25 0 0 1-2.31 0L2.25 8.25" /></svg>
              <div className="font-semibold text-lg text-gray-900">Email</div>
              <p className="mt-2 text-gray-600">We respond to all emails within 24 hours.</p>
              <div className="mt-4 font-semibold text-gray-900">nikolay.trakiyski@gmail.com</div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nikolaytrakiyski/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 p-6"
          >
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 mb-3" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764 0-.974.784-1.768 1.75-1.768s1.75.794 1.75 1.768c0 .974-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.336-.027-3.056-1.862-3.056-1.863 0-2.149 1.454-2.149 2.957v5.703h-3v-10h2.881v1.367h.041c.401-.76 1.381-1.561 2.842-1.561 3.041 0 3.6 2.003 3.6 4.607v5.587z"/></svg>
              <div className="font-semibold text-lg text-gray-900">LinkedIn</div>
              <p className="mt-2 text-gray-600">Connect or send me a message.</p>
              <div className="mt-4 font-semibold text-gray-900">linkedin.com/in/nikolaytrakiyski</div>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+359893401356"
            className="block bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 p-6"
          >
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.052a1.125 1.125 0 0 0-.933-1.106l-3.543-.709a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.39 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .39-1.21l1.293-.97a1.125 1.125 0 0 0 .417-1.173L7.658 3.21a1.125 1.125 0 0 0-1.106-.933H5.5A2.25 2.25 0 0 0 3.25 4.5v2.25z"/></svg>
              <div className="font-semibold text-lg text-gray-900">Phone</div>
              <p className="mt-2 text-gray-600">Available Mon–Fri, 9am–5pm.</p>
              <div className="mt-4 font-semibold text-gray-900">+359 893 401 356</div>
            </div>
          </a>

          {/* Location - Bulgaria */}
          <div className="block bg-gray-50 border border-gray-200 p-6">
            <div className="flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
              <div className="font-semibold text-lg text-gray-900">Location — Bulgaria</div>
              <p className="mt-2 text-gray-600">Based in Europe, often in:</p>
              <div className="mt-4 font-semibold text-gray-900">Plovdiv, Sithonia, Hossegor</div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
