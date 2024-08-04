<script>
    import { addTodo } from '../../stores/todoStore';
    let todo = '';

    const handleSubmit = () => {
        console.log(todo)
        console.log('submit')
        addTodo(todo)
    }
</script>

<form class="form my-6" on:submit|preventDefault={handleSubmit}>
    <div class="form-control mb-4">
        <label for="todo" class="label">
            <span class="label-text font-bold">Todo</span>
        </label>
        <input
            type="text"
            name="todo"
            bind:value={todo}
            placeholder="ex. Learn about authentication in Next.js"
            class="input input-bordered w-full"
        />
    </div>
    <button type="submit" class="btn btn-primary w-full">
        Submit
    </button>
</form>
