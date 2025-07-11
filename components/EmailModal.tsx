// components/EmailModal.tsx
import React from 'react';
import { IoLogoGoogle, IoMdMail } from 'react-icons/io';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const email = 'nikolay.trakiyski@gmail.com'; 
  const subject = 'Intersted in collaboration';
  const bodyContent = 'Hello Nikolay,\n\n'; 

  const encodedSubject = encodeURIComponent(subject);
  const encodedBodyContent = encodeURIComponent(bodyContent);

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBodyContent}`;
  const outlookLink = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}&subject=${encodedSubject}&body=${encodedBodyContent}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Choose your email client</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
           <a
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#DB4437] hover:bg-[#C53D30] transition-colors"
          >
            <IoLogoGoogle className="w-5 h-5" />
            Open in Gmail
          </a>
          <a
            href={outlookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#0078D4] hover:bg-[#005A9E] transition-colors"
          >
            <IoMdMail className="w-5 h-5" />
            Open in Outlook
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;