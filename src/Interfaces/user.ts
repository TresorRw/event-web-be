export interface IUser {
  _id: string;
  email: string;
  role: "organizer" | "attendee";
  displayName: string;
}
