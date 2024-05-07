export interface Data {
  forms: Form[]
}

export interface Form {
  formName: string
  sections: Section[]
}

export interface Section {
  title: string
  questions: Question[]
}

export interface Question {
  id: number
  order: number
  active: boolean
  text: string
  response: any
  observation: string
  file: any
}
export interface DataUser {
  users: User[]
}

export interface User {
  department_dep_id: number
  userType_usut_id: number
  usu_email: string
  usu_id: number
  usu_idnumber: string
  usu_lastname: string
  usu_name: string
  usu_slastname: string
  usu_torespond: string
  usu_version: number
}

export interface DataUserType {
  usertypes: UserType[]
}
export interface UserType {
  usut_id: number
  usut_role: string
  usut_version?: number
}

export interface DataDepartmentType {
  departmenttypes: DepartmentType[]
}

export interface DepartmentType {
  dep_id: number
  dep_name: string
  dep_version: number
  UNIT_unit_id: number
}



