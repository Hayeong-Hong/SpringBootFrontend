let backendHost;

const hostname = window && window.location && window.location.hostname; //단축평가 연산자

if(hostname === "localhost"){
    backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;