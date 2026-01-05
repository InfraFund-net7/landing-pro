export enum Step {
  'categorySelect',
  'organisationType',
  'RulesSubmit',
  'ContactForm',
  'userInfo',
  'EmailSubmit',
}

export type SurveyData = {
  role: string;
  type: 'individual' | 'organization';
  confirm_tos: boolean;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email: string;
  contact_fullname?: string;
  company_name?: string;
};
