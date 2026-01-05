// import { Check } from 'lucide-react';
// import { FormInput } from '../../ui/form-input';
// import { SurveyData } from '../types';

// interface EmailSubmitProps {
//   accountForm: { email: string; termsAgreed: boolean };
//   submitting: boolean;
//   onBack: () => void;
//   onChange: (key: string, value: string | boolean) => void;
//   onSubmit: () => void;
// }

// export default function EmailSubmit({
//   accountForm,
//   submitting,
//   onBack,
//   onChange,
//   onSubmit,
// }: EmailSubmitProps) {
//   const canSubmit =
//     accountForm.email.trim() !== '' && accountForm.termsAgreed && !submitting;
//   const buildSurveyData = (): SurveyData => ({
//     role: selectedAction,
//     type: userType!,
//     confirm_tos: accountForm.termsAgreed,
//     email: accountForm.email,
//     ...(userType === 'individual'
//       ? {
//           first_name: personalForm.firstName,
//           last_name: personalForm.lastName,
//           phone_number: personalForm.phoneNumber,
//         }
//       : {
//           contact_fullname: orgForm.contactFullName,
//           company_name: orgForm.companyName,
//           phone_number: orgForm.phoneNumber,
//         }),
//   });

//   const handleSubmitSurvey = async () => {
//     const data = buildSurveyData();
//     surveyDataRef.current = data;
//     setSubmitting(true);
//     try {
//       const payload = {
//         role: data.role || '',
//         type: data.type,
//         confirm_tos: data.confirm_tos || false,
//         first_name: data.type === 'individual' ? data.first_name || '' : '',
//         last_name: data.type === 'individual' ? data.last_name || '' : '',
//         phone_number: data.phone_number || '',
//         email: data.email || '',
//         contact_fullname:
//           data.type === 'organization' ? data.contact_fullname || '' : '',
//         company_name:
//           data.type === 'organization' ? data.company_name || '' : '',
//         country: 'uk',
//       };

//       const setDomainCookie = (
//         name: string,
//         value: Record<string, unknown>,
//         minutes = 15
//       ) => {
//         const encoded = encodeURIComponent(JSON.stringify(value));
//         document.cookie = `${name}=${encoded}; Path=/; Domain=.infrafund.test; Max-Age=${minutes * 60}; SameSite=Lax`;
//       };

//       setDomainCookie('survey_data', payload, 15);
//       setSubmitSuccess(true);
//       onSuccess?.(data);
//       setTimeout(() => {
//         window.location.href = 'http://dash.infrafund.test:3001/login';
//       }, 800);
//     } catch (err: unknown) {
//       console.error('Client-side error:', err);
//       const error = new Error('Failed to store the data. Please try again.');
//       onError?.(error);
//       alert(`Error:\n${error.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full text-left h-full flex flex-col justify-between py-1 sm:py-1.5">
//       <div>
//         <span className="text-xl sm:text-2xl text-white font-semibold mb-4 sm:mb-6 block">
//           Let's create your account!
//         </span>
//         <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
//           <FormInput
//             label="Email"
//             placeholder="Email"
//             type="text"
//             value={accountForm.email}
//             onChange={(e) => onChange('email', e.target.value)}
//           />
//           <label className="flex items-start sm:items-center space-x-0 sm:space-x-3 space-y-2 sm:space-y-0 flex-col sm:flex-row cursor-pointer">
//             <div className="relative shrink-0">
//               <input
//                 type="checkbox"
//                 className="peer sr-only"
//                 checked={accountForm.termsAgreed}
//                 onChange={(e) => onChange('termsAgreed', e.target.checked)}
//               />
//               <div
//                 className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center transition-colors duration-300 ${
//                   accountForm.termsAgreed ? 'bg-[#00FF87]' : 'bg-[#2B3146]'
//                 }`}
//               >
//                 {accountForm.termsAgreed && (
//                   <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
//                 )}
//               </div>
//             </div>
//             <span className="text-white text-xs sm:text-sm text-left flex-1">
//               By creating an account, I agree to InfraFund’s{' '}
//               <a
//                 href="/terms"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-green-400 hover:text-primary"
//               >
//                 Terms of Service
//               </a>{' '}
//               and{' '}
//               <a
//                 href="/privacy"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-green-400 hover:text-primary"
//               >
//                 Privacy Policy
//               </a>
//               .
//             </span>
//           </label>
//         </div>
//       </div>
//       <div className="flex flex-col sm:flex-row gap-2">
//         <button
//           className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
//           onClick={onBack}
//         >
//           Back
//         </button>
//         <button
//           onClick={canSubmit ? onSubmit : undefined}
//           disabled={!canSubmit}
//           className={`w-full sm:w-1/2 py-2.5 sm:py-3 rounded-md cursor-pointer transition-colors ${
//             canSubmit
//               ? 'bg-primary text-black hover:bg-green-500'
//               : 'bg-[#C7CAD5] text-black opacity-80 cursor-not-allowed'
//           }`}
//         >
//           {submitting ? 'Submitting...' : 'Continue'}
//         </button>
//       </div>
//     </div>
//   );
// }
