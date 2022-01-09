export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string;
  photoUrl: string | null;
}
