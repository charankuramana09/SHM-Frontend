export interface HostelMember {
    firstName: string;
    lastName: string;
    gender: string;
    joiningDate: Date;
    purpose: string;
    roomSharing: string;
    frequency: string;
    userType: string;
    mobileNumber: number;
    alternateMobileNumber: number;
    email: string;
    idProof: string;  // Handle as base64 string or binary
    status: boolean;
    paidAmount: number;
    pendingAmount: number;
    advancePayment: number;
    hostelName: string;
    paymentETA: Date;
    roomNumber: number;
    roomType: string;
  }
  