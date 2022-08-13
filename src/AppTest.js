import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function AppTest() {
  const [hello, setHello] = useState('');
  const [hello2, setHello2] = useState([]);

  useEffect(() => {
    /* 리턴 타입이 String일 때
    fetch("http://localhost:8080/api/test", { method: "GET" })
      .then((response) => response.text())
      .then((text) => setHello(text));
    */
    //리턴 타입이 객체나 리스트 일 때
    /*fetch("http://localhost:8080/api/test2", { method: "GET" })
      .then((response) => response.json())
      .then((json) => {setHello2(json.data);
      });*/
  }, []);

  const onClickHandler = () => {
    const test = {
      id: 3,
      name: 'aaa',
    };

    fetch('http://localhost:8080/api/test2', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(test),
    })
      .then((response) => response.json())
      .then((json) => {
        setHello2(json);
      });
  };

  return (
    <div>
      {/*hello2.map((h) => (
        <p id={h.id} key={h.id}>
          {h.name}
        </p>
      ))*/}
      <button type="button" onClick={onClickHandler}>
        전송
      </button>
    </div>
  );
}

export default AppTest;
