import { writable, type Writable } from 'svelte/store';
import { supabase } from "../../supabase.js";

interface Todo {
    id: number;
    name: string;
    done: boolean;
}
export const todos: Writable<Todo[]> = writable([]);

export const loadTodos = async () => {
    const { data, error }: { data: null | Todo[], error: any } = await supabase.from('todos').select();
    if (data === null) {
        return;
    }
    if (error) {
        return console.error(error);
    }
    try {
        todos.set(data);
    }
    catch (e) {
        console.error(e);
    }
}
loadTodos();

export const addTodo = async (text: string) => {
    
    const { data, error } = await supabase
        .from('todos')
        .insert([
            { name: text, done: false },
        ])
        .select()

    if (error) {
        return console.error(error);
    }
    loadTodos();
};
export const updateTodoName = async (text: string, id: number) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ 'name': text })
        .eq('id', id)
        .select()
    if (error) {
        return console.error(error);
    }
    loadTodos();

}

export const deleteTodo = async (id: number) => {

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)


    if (error) {
        return console.error(error);
    }

    todos.update((todos) => todos.filter((todo) => todo.id !== id));
};

export const toggleTodoDone = async (id: number, currentState: boolean) => {
    const { error } = await supabase.from('todos').update({ done: !currentState }).match({ id })

    if (error) {
        return console.error(error);
    }

    todos.update((todos) => {
        let index = -1;
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            todos[index].done = !todos[index].done;
        }
        return todos;
    });
};