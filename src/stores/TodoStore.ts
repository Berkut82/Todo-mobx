import { makeAutoObservable } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

const TodoStore = () =>
  makeAutoObservable({
    list: [] as Todo[],
    add(title: string) {
      if (title.length < 3) return;

      this.list.push({
        id: Date.now(),
        title,
        isDone: false,
      });
    },

    toggle(todo: Todo) {
      todo.isDone = !todo.isDone;
    },

    remove(todo: Todo) {
      this.list = this.list.filter((t) => t.id !== todo.id);
    },

    get unfinishedTodos() {
      return this.list.filter((t: Todo) => !t.isDone);
    },
  });

export default TodoStore;
