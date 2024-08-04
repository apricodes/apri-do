<script>
    import AddTodoSection from '../lib/components/todo/AddTodoSection.svelte';
    import TodoSection from '../lib/components/todo/TodoSection.svelte';
    import { todos } from '../lib/stores/todoStore';

    // Automatically reassigning $todos when todoList changes
</script>

<div class="flex min-h-screen flex-col bg-base-100">
    <main class="flex-grow container mx-auto p-6">
        <h1 class="text-3xl font-bold text-center text-gray-900 md:text-4xl mb-8">
            My Todos
        </h1>
        <div class="card bg-base-200 shadow-lg p-4 mb-6">
            <AddTodoSection />
        </div>
        <div class="space-y-4">
            {#each $todos as todo}
                <TodoSection {todo} />
            {/each}
        </div>
    </main>

    <footer class="footer p-4 bg-base-300 text-xs sm:text-sm">
        <div class="container mx-auto text-center">
            <span>© 2024 My Todos App</span>
        </div>
    </footer>
</div>
