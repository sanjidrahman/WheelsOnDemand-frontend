export const environment = {
    API_URL: 'http://localhost:3000',
    CLIENT_ID: '944511069717-viocd97ecmdd9k559qg24hvnv2n3pog5.apps.googleusercontent.com',
    STATIC_FILE_API: 'http://localhost:3000/admin/getFile/',
    RAZOR_KEY: 'rzp_test_lyu1lwSUPIvVBo',
    GOOGLE_API_KEY: 'AIzaSyA_QGKPsHA2xF2dtYKdOsauoZkpzHvAxSY'
};

export interface EnvJwtStructure {
    sub: string;
    exp: number;
    id: string,
    role: string
}
