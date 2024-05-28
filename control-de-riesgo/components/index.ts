export interface Data {
  forms: Form[];
}

export interface Department {
  dep_id: number;
  dep_name: string;
  dep_version: number;
  UNIT_unit_id: number;
  axisform: Form[];
}

export interface Form {
  form_id: number;
  form_name: string;
  form_status: string;
  form_description: string;
  form_version: number;
  form_date_start: Date | null;
  form_date_finish: Date | null;
  DEPARTMENT_dep_id: number;
  section: Section[];
}

export interface Section {
  sect_id: number;
  sect_name: string;
  sect_version: number;
  FORM_form_id: number;
  question: Question[];
}

export interface Question {
  quest_id: number;
  quest_ordern: string;
  quest_question: string;
  quest_deactivationdate: Date | null;
  quest_version: number;
  SECTION_sect_id: number;
  answer: Answer[];
}

export interface Answer {
  answ_id: number;
  answ_answer: string;
  answ_justification: string;
  answ_version: number;
  QUESTION_quest_id: number;
  DEPARTMENT_dep_id: number;
}

export interface DataUser {
  users: User[];
}

export interface User {
  department_dep_id: number;
  userType_usut_id: number;
  usu_email: string;
  usu_id: number;
  usu_idnumber: string;
  usu_lastname: string;
  usu_name: string;
  usu_slastname: string;
  usu_permissons: string;
  usu_torespond: string;
  usu_version: number;
  usu_state: string;
  usertype: {
    usut_role: string;
  };
}

export interface DataUserType {
  usertypes: UserType[];
}
export interface UserType {
  usut_id: number;
  usut_role: string;
  usut_version?: number;
}

export interface DataDepartmentType {
  departmenttypes: DepartmentType[];
}

export interface DepartmentType {
  dep_id: number;
  dep_name: string;
  dep_version: number;
  UNIT_unit_id: number;
}

export interface EmployeeResponse {
  usu_name: string;
  usu_idnumber: string;
  department: string | null;
}

export interface FormResponse {
  form_name: string;
  form_status: "Completed" | "Pending";
}

export interface FormProgressResponse {
  form_name: string;
  answeredQuestions: number;
  totalQuestions: number;
}

export interface Project {
  form_name: string;
  department: string;
  form_date_start: string;
  form_date_finish: string;
  progress: number;
}

export interface User {
  department_dep_id: number;
  userType_usut_id: number;
  usu_email: string;
  usu_id: number;
  usu_idnumber: string;
  usu_lastname: string;
  usu_name: string;
  usu_slastname: string;
  usu_permissons: string;
  usu_torespond: string;
  usu_version: number;
  usu_state: string;
  usertype: {
    usut_role: string;
  };
}