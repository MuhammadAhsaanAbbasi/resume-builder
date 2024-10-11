declare interface ResumeParams {
    id: 8,
    documentId: string,
    title: string,
    userId: string,
    userName: string,
    resumeId: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
}

declare interface Experience {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
}

declare interface Education {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
}

declare interface Skill {
    id: number;
    name: string;
    rating: number;
}

declare interface UserData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    themeColor: string;
    summery: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}