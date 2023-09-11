import "./App.css";

function App() {
  return (
    <div class="dark">
      <div className="layout">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Welcome to the Memory Game 🧠
            </h5>
            <div>
              <label
                for="playerName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Please tell us your name!
              </label>
              <input
                type="text"
                name="playerName"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your name"
                required
              ></input>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Play!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
