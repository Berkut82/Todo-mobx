import { useStore } from '../../stores/TodoContext';

import classes from './TodoInput.module.css';

const TodoInput = () => {
  const { todos } = useStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const value = String(formData.get('todo-input') || '');
    todos.add(value);
    formElement.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={classes['todo-input-group']}>
      <input name='todo-input' placeholder='Add todo...' />
      <button type='submit'>Add Todo</button>
    </form>
  );
};
export default TodoInput;
