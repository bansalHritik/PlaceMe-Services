import Faculty from './faculty';

export default interface Department {
  id: string,
  faculties: Faculty,
  hodEmail: string,
  name: string,
  abbrivation: string
}