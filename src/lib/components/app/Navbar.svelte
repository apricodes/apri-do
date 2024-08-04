<script>
  import Avatar from "../account/Avatar.svelte";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-xl">Apri-Do</a>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input
        type="text"
        placeholder="Search"
        class="input input-bordered w-24 md:w-auto"
      />
    </div>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <Avatar></Avatar>
        </div>
      </div>
      <ul
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a class="justify-between" href="/account"> Profile </a>
        </li>
        <li class="justify-between" ><a href="/">To-Dos</a></li>
      </ul>
    </div>
  </div>
</div>
