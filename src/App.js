import "./App.css";
import { useState, useEffect, useCallback } from "react";
import TodoInsert from "./components/todos/TodoInsert";
import TodoList from "./components/todos/TodoList";
import TodoTemplate from "./components/todos/TodoTemplate";
import { logout } from "./service/ApiService";
import { AppBar, Toolbar, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "./app-config";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/api/todo/selectTodoList",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response.data.data.length > 0) {
          setTodos(response.data.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        window.location.href = "/login";
      });
  }, []);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: todos.length + 1,
        text: text,
        checked: false,
      };

      //setTodos 그냥 화면만 변경이 됨
      //setTodos(todos.concat(todo));

      //todo입력하고 db에 저장한 한 후에
      //다시 selectTodoList 해온 값을 리턴
      // call("/api/todo/insertTodo", "POST", todo).then((response) =>
      //   setTodos(response.data)
      // );
      axios({
        method: "post",
        url: API_BASE_URL + "/api/todo/insertTodo",
        data: todo,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      }).then((response) => {
        console.log(response.data);
        setTodos(response.data.data);
      });
    },
    [todos]
  );

  //DELETE 요청으로
  const onRemove = useCallback((id) => {
    const todo = {
      id: id,
    };

      // //setTodos(todos.filter((todo) => id !== todo.id));
      // call('/api/todo/removeTodo', 'DELETE', id).then(
      //   (response) => setTodos(response.data)
      // );
    // call("/api/todo/deleteTodo", "DELETE", todo).then((response) =>
    //   setTodos(response.data)
    // );
    axios({
      method: "delete",
      url: API_BASE_URL + "/api/todo/removeTodo",
      data: todo,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((response) => {
      setTodos(response.data.data);
    });
  }, []);

  //PUT 요청으로
  const onChecked = useCallback(
    (id) => {
      //todos에서 현재 클릭 된 todo 하나만 filter로 꺼내기
      //map 함수로 하나만 꺼낸 todo의 checked 반대로 바꾸기
      //filter랑 map은 배열을 리턴하기 때문에
      //인덱스가 0인 todo 추출해서 사용
      const todo = todos
        .filter((t) => t.id === id)
        .map((t) => ({ ...t, checked: !t.checked }));

      console.log(todo[0]);

      // call("/api/todo/updateTodo", "PUT", todo[0]).then((response) =>
      //   setTodos(response.data)
      // );
      axios({
        method: "put",
        url: API_BASE_URL + "/api/todo/updateTodo",
        data: todo[0],
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      }).then((response) => {
        setTodos(response.data.data);
      });
    },
    [todos]
  );
  //로딩중이 아닐때는 Todo 앱 렌더링
  let todoListPage = (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={logout}>
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ fontSize: "1rem" }}
                />
                &nbsp;로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onChecked={onChecked} />
      </TodoTemplate>
    </div>
  );

  //로딩중일때는 로딩 메시지 렌더링
  let loadingPage = <h1>로딩 중...</h1>;

  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div>{content}</div>;
}

export default App;
