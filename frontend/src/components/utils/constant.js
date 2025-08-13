// export const USER_API_END_POINT="http://localhost:8000/api/v1/user"
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job"
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application"
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company"



// Base URLs
const PROD_BASE_URL = "https://job-portal-full-stack-project-three.vercel.app/api/v1";
const DEV_BASE_URL = "http://localhost:8000/api/v1";

// Select base URL according to environment
const BASE_URL = process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

// Endpoints
export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
