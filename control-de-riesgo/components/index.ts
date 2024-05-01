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
  id: number
  number: string
  name: string
  lastname: string
  slastname: string
  email: string
  torespond: string
  version: number
  department: string
  userType: string
}


