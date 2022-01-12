import { useState } from 'react';
import store, { StoreContext, useStore } from './stores/TodoContext';

import TodoInput from './Todo/TodoInput/TodoInput';
import TodoList from './Todo/TodoList/TodoList';
import classes from './App.module.css';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { runInAction } from 'mobx';

function App() {
  const { todos } = useStore();

  const AppUI = useLocalObservable(() => ({
    todosVisible: true,
    loading: false,

    receiveData() {
      this.loading = false;
      AppUI.todosVisible = !AppUI.todosVisible;
    },

    async toggleTodoVisible() {
      this.loading = true;
      await new Promise((resolve) => setTimeout(() => resolve(void 0), 1000));
      this.receiveData();
    },
  }));

  return (
    <div className='app'>
      <StoreContext.Provider value={store}>
        <TodoInput />
        <div className={classes['todo-list-wrapper']}>
          {String(AppUI.loading)}
          <h2 onClick={AppUI.toggleTodoVisible}>
            <span>{`${AppUI.todosVisible ? '-' : '+'}`}</span>
            Todos (unfinished {todos.unfinishedTodos.length})
          </h2>
          {AppUI.todosVisible && <TodoList />}
        </div>
      </StoreContext.Provider>
    </div>
  );
}

export default observer(App);
