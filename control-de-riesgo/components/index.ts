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
