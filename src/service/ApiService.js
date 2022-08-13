//fetch를 처리해주는 함수를 만들어서 export
import { API_BASE_URL } from "../app-config";

//api = "/api/todo/selectTodoList"
//method = "GET", "POST", "PUT", "DELETE"
//request는 백엔드로 보내줄 데이터
export function call(api, method, request) {
  let headers = new Headers({
    //보내줄 데이터의 타입 지정
    "Content-Type": "application/json",
  });
  //로컬 스토리지에서 토큰 값 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  //토큰 값이 존재하면 헤더에 담아서 API 호출
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  //fetch 옵션 설정
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  //보내줄 데이터가 있으면
  //request 바디에 담기
  if (request) {
    options.body = JSON.stringify(request);
  }

  //fetch 실행 후 결과 값 리턴
  return fetch(options.url, options).then((response) => {
    if (response.status === 403) {
      window.location.href = "/login";
    }

    response.json().then((json) => {
      //api 오류 시 에러 리턴
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  });
}

// export function login(member) {
//   return call("/api/member/login", "POST", member).then((response) => {
//     console.log(response);
//     alert(response.token);
//     //토크이 존재하면 Todo 앱으로 이동
//     if (response.token) {
//       //로그인 성공 시 로컬스토리지에 토큰 값 저장
//       localStorage.setItem("ACCESS_TOKEN", response.token);
//       window.location.href = "/";
//     }
//   });
// }

export function logout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}

export function join(member) {
  return call("/api/member/join", "POST", member);
}
