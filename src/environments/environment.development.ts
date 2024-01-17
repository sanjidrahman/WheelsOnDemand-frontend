export const environment = {
    API_URL: 'https://wheelsondemand.onrender.com',
    CLIENT_ID: '944511069717-viocd97ecmdd9k559qg24hvnv2n3pog5.apps.googleusercontent.com',
    STATIC_FILE_API: 'https://wheelsondemand.onrender.com/admin/getFile/',
    RAZOR_KEY: 'rzp_test_lyu1lwSUPIvVBo',
    GOOGLE_API_KEY: 'AIzaSyA_QGKPsHA2xF2dtYKdOsauoZkpzHvAxSY',
    MAP_SCRIPT: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDQF4CxmfbJg0HUURmVGfCX0NR6sSbGsOo&libraries=places&callback=initMap'
};

export interface EnvJwtStructure {
    sub: string;
    exp: number;
    id: string,
    role: string
}
