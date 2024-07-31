
export interface UserProfile {
    firstName: string;
    lastName: string;
    gender: string;
    joiningDate: string; // or Date if you plan to use JavaScript Date objects
    purpose: string;
    roomSharing: string;
    frequency: string;
    userType: string;
    mobileNumber: string;
    alternativeMobileNumber: string;
    email: string;
    idProof: string;
    status: string;
    paidAmount: number;
    pendingAmount: number;
    paymentHistory: string; // Could be an array if detailed payment history is stored
    roomNumber: string;
    advancePayment: number;
    hostelName: string;
  }