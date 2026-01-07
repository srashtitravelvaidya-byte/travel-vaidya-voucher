
export interface Passenger {
  id: string;
  name: string;
  age: string;
  weight: string;
  gender: 'M' | 'F' | 'O';
  idNumber: string;
}

export interface Contact {
  name: string;
  role: string;
  phone: string;
}

export interface CrewContact {
  location: string;
  contacts: Contact[];
}

export interface VoucherData {
  tourName: string;
  bookingId: string;
  flyingDate: string;
  arrivalDate: string;
  baseLocation: string;
  sector: string;
  passengers: Passenger[];
  amountPaid: string;
  bookedBy: string;
  guestAddress: string;
  guestContact: string;
  emergencyContact: string;
  guestEmail: string;
  addOnServices: string;
  crewContacts: CrewContact[];
}
