export class AppSettings {
  static BASE_URL = 'http://ys-training.gq/';
  static API_BASE_URL = `${AppSettings.BASE_URL}api/`;
  static API_REGISTER_URL = `${AppSettings.API_BASE_URL}account/register`;
  static API_LOGIN_URL = `${AppSettings.BASE_URL}token`;
  static API_STUDENTS_LIST_URL = `${AppSettings.API_BASE_URL}students`;
  static API_COURSES_LIST_URL = `${AppSettings.API_BASE_URL}courses`;
  static API_STUDENT_URL = `${AppSettings.API_BASE_URL}students/`;
  static API_STUDENT_ENROLL_URL = `${AppSettings.API_STUDENT_URL}enroll`;
  static API_STUDENT_UNENROLL_URL = `${AppSettings.API_STUDENT_URL}unenroll`;


  static EVENT_IS_LOGGED_IN = 'EVENT_IS_LOGGED_IN';
  static EVENT_IS_LOGGED_OUT = 'EVENT_IS_LOGGED_OUT';
  static EVENT_SELECTED_STUDENT_UPDATED = 'EVENT_SELECTED_STUDENT_UPDATED';
}
