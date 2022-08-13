import React from 'react';
import TodoListItem from './TodoListItem';
import '../../styles/todos/TodoList.scss';

const TodoList = ({ todos, onRemove, onChecked }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onChecked={onChecked}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
