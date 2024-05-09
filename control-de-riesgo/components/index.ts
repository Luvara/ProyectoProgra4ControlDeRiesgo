export interface Data {
  forms: Form[];
}

export interface Form {
  form_id: number;
  form_name: string;
  form_status: string;
  form_description: string;
  form_version: number;
  DEPARTMENT_dep_id: number;
  sections: Section[];
}

export interface Section {
  sect_id: number;
  sect_name: string;
  sect_version: number;
  FORM_form_id: number;
  questions: Question[];
}

export interface Question {
  quest_id: number;
  quest_ordern: string;
  quest_question: string;
  quest_deactivationdate: any;
  quest_version: number;
  SECTION_sect_id: number;
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
  usu_torespond: string;
  usu_version: number;
  
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
