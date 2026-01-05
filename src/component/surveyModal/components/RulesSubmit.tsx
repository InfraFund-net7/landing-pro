// import { Check } from 'lucide-react';
// import { useState } from 'react';
// import { CustomButton } from '../../ui/custom-button';

// interface RulesSubmitProps {
//   userType: 'individual' | 'organization' | null;
//   confirmations: { ukResident: boolean; niNumber: boolean; over18: boolean };

//   individualErrors: Record<'ukResident' | 'niNumber' | 'over18', string | null>;
//   orgErrors: Record<'ukBased' | 'companyHouse' | 'active', string | null>;
//   onIndividualConfirm: (
//     key: 'ukResident' | 'niNumber' | 'over18',
//     checked: boolean
//   ) => void;
//   onOrgConfirm: (
//     key: 'ukBased' | 'companyHouse' | 'active',
//     checked: boolean
//   ) => void;
//   onBack: () => void;
//   onContinue: () => void;
// }

// export default function RulesSubmit({
//   userType,
//   confirmations,
//   onIndividualConfirm,
//   onOrgConfirm,
//   onBack,
//   onContinue,
// }: RulesSubmitProps) {
//   const [orgConfirmations, setOrgConfirmations] = useState({
//     ukBased: true,
//     companyHouse: true,
//     active: true,
//   });
//   const [individualErrors, setIndividualErrors] = useState<
//     Record<keyof typeof confirmations, string | null>
//   >({ ukResident: null, niNumber: null, over18: null });
//   const [orgErrors, setOrgErrors] = useState<
//     Record<'ukBased' | 'companyHouse' | 'active', string | null>
//   >({ ukBased: null, companyHouse: null, active: null });
//   const canContinue =
//     userType === 'individual'
//       ? confirmations.over18
//       : orgConfirmations.ukBased && orgConfirmations.companyHouse;

//   const handleOrgConfirm = (
//     key: keyof typeof orgConfirmations,
//     checked: boolean
//   ) => {
//     setOrgConfirmations((prev) => {
//       const newConf = { ...prev, [key]: checked };
//       return newConf;
//     });
//     if (key === 'ukBased' || key === 'companyHouse' || key === 'active') {
//       let errorMsg: string | null = null;
//       if (!checked) {
//         if (key === 'ukBased') {
//           errorMsg =
//             'We are currently only accepting investments from UK-based companies.';
//         } else if (key === 'companyHouse') {
//           errorMsg = 'A valid UK Companies House number is required.';
//         } else if (key === 'active') {
//           errorMsg =
//             'We only accept applications from currently active companies.';
//         }
//       }
//       setOrgErrors((prev) => ({ ...prev, [key]: errorMsg }));
//     }
//     if (!checked) {
//       setCurrentStep(4);
//       return;
//     }
//     const newConf = { ...orgConfirmations, [key]: true };
//     if (newConf.ukBased && newConf.companyHouse && newConf.active) {
//       setCurrentStep(3);
//     }
//   };

//   return (
//     <div className="w-full space-y-4 sm:space-y-6 h-full flex flex-col justify-between py-1 sm:py-2">
//       <div className="space-y-4">
//         <span className="text-lg sm:text-xl md:text-2xl text-white font-semibold block text-center md:text-left">
//           First, please confirm the following.
//         </span>
//         <div className="space-y-3 sm:space-y-4">
//           {userType === 'individual' ? (
//             <>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={confirmations.ukResident}
//                       onChange={(e) =>
//                         onIndividualConfirm('ukResident', e.target.checked)
//                       }
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     I am currently a UK resident
//                   </span>
//                 </label>
//                 {individualErrors.ukResident && (
//                   <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
//                     {individualErrors.ukResident}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={confirmations.niNumber}
//                       onChange={(e) =>
//                         onIndividualConfirm('niNumber', e.target.checked)
//                       }
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     I have a valid UK national insurance number
//                   </span>
//                 </label>
//                 {individualErrors.niNumber && (
//                   <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
//                     {individualErrors.niNumber}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors w-full">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={confirmations.over18}
//                       onChange={(e) =>
//                         onIndividualConfirm('over18', e.target.checked)
//                       }
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     I am at least 18 years old
//                   </span>
//                 </label>
//                 {individualErrors.over18 && (
//                   <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
//                     {individualErrors.over18}
//                   </p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={orgConfirmations.ukBased}
//                       onChange={(e) =>
//                         onOrgConfirm('ukBased', e.target.checked)
//                       }
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     Our company is based in UK.
//                   </span>
//                 </label>
//                 {orgErrors.ukBased && (
//                   <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
//                     {orgErrors.ukBased}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={orgConfirmations.companyHouse}
//                       onChange={(e) =>
//                         onOrgConfirm('companyHouse', e.target.checked)
//                       }
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     We have a valid UK company house number.
//                   </span>
//                 </label>
//                 {orgErrors.companyHouse && (
//                   <p className="text-red-400 text-xs sm:text-sm text-left animate-fadeIn pl-9 sm:pl-0">
//                     {orgErrors.companyHouse}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-1 text-left">
//                 <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-700 rounded-xl p-3 sm:p-5 cursor-pointer hover:bg-slate-600 transition-colors">
//                   <div className="relative shrink-0">
//                     <input
//                       type="checkbox"
//                       className="peer sr-only"
//                       checked={orgConfirmations.active}
//                       onChange={(e) => onOrgConfirm('active', e.target.checked)}
//                     />
//                     <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2B3146] rounded-xl flex items-center justify-center transition-colors duration-300 peer-checked:bg-[#00FF87]">
//                       <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#2B3146] peer-checked:text-black transition-colors duration-300" />
//                     </div>
//                   </div>
//                   <span className="text-white text-sm sm:text-base text-left flex-1">
//                     Our company is currently active.
//                   </span>
//                 </label>
//                 {orgErrors.active && (
//                   <p className="text-red-400 text-xs sm:text-sm animate-fadeIn pl-9 sm:pl-0">
//                     {orgErrors.active}
//                   </p>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-col sm:flex-row gap-2">
//         <button
//           className="w-full sm:w-1/2 py-2.5 sm:py-3 bg-[#1C2332] text-primary rounded-md transition-colors cursor-pointer"
//           onClick={onBack}
//         >
//           Back
//         </button>
//         <CustomButton
//           variant="filled"
//           disabled={!canContinue}
//           className={`w-full sm:w-1/2 py-2.5 sm:py-3 rounded-lg transition-colors ${
//             canContinue
//               ? 'bg-green-600 hover:bg-green-500 cursor-pointer'
//               : 'bg-green-600/50 cursor-not-allowed'
//           }`}
//           onClick={canContinue ? onContinue : undefined}
//         >
//           Continue
//         </CustomButton>
//       </div>
//     </div>
//   );
// }
