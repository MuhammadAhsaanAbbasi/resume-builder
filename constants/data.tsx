import { EditPersonalDetails } from "@/components/resume/edit/EditPersonalDetails"
import { EditProfileSummary } from "@/components/resume/edit/EditProfileSummary"
import { EducationEdit } from "@/components/resume/edit/EducationEdit"
import { ExperienceEdit } from "@/components/resume/edit/ExperienceEdit"
import { SkillsEdit } from "@/components/resume/edit/SkillsEdit"

export const data: UserData = {
    firstName:'James',
    lastName:'Carter',
    jobTitle:'full stack developer',
    address: "Karachi, Pakistan",
    phone:'(123)-456-7890',
    email:'example@gmail.com',
    themeColor:"#ff6666",
    summary:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experience:[
        {
            id:1,
            title:'Full Stack Developer',
            companyName:'Amazon',
            city:'New York',
            state:'NY',
            startDate:'2021-01-01', // Change to correct format
            endDate:'',
            currentlyWorking:true,
            workSummary:'Designed, developed, and maintained full-stack applications using React & Node.js.\n'+
            '• Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers.\n'+
            '• Maintaining the React Native in-house organization application.'+
            '• Created RESTfulAPIs with Node.js and Express, facilitating data communication between the front-end & back-end systems.'
        },
        {
            id:2,
            title:'Frontend Developer',
            companyName:'Google',
            city:'Charlotte',
            state:'NC',
            startDate:'2019-05-01', // Change to correct format
            endDate:'2021-01-01',
            currentlyWorking:false,
            workSummary:`Designed, developed, and maintained full-stack applications using React and Node.js. \n
            \n • Implemented responsive user interfaces with React, ensuring seamless user experiences across various devices and browsers. \n
            \n • Maintaining the React Native in-house organization application.\n
            \n • Created RESTful APIs with Node.js and Express, facilitating data communication between the front-end & back-end systems.`
        }
    ],
    education:[
        {
            id:1,
            universityName:'Western Illinois University',
            startDate:'2018-08-01',
            endDate:'2019-12-01',
            degree:'Master',
            major:'Computer Science',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        },
        {
            id:2,
            universityName:'Western Illinois University',
            startDate:'2018-08-01',
            endDate:'2019-12-01',
            degree:'Master',
            major:'Computer Science',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        }
    ],
    skills:[
        {
            id:0,
            name:'React',
            rating:80,
        },
        {
            id:1,
            name:'Next.js',
            rating:100,
        },
        {
            id:2,
            name:'MongoDB',
            rating:80,
        },
        {
            id:3,
            name:'PostgreSQL',
            rating:100,
        }
    ]
}


export const activeSection = [
    {
        id:0,
        section: EditPersonalDetails,
    },
    {
        id: 1,
        section: EditProfileSummary,
    },
    {
        id: 2,
        section: ExperienceEdit,
    },
    {
        id: 3,
        section: EducationEdit,
    },
    {
        id: 4,
        section: SkillsEdit,
    }
]