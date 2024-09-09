<template>
  <aside class="fixed top-0 left-0 z-40 w-64 h-screen">
    <!--eslint-disable-->
    <div class="h-full px-3 py-50 overflow-y-auto bg-gray-900">
      <div class="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="33"
          height="45"
          fill="none"
          stroke="#ffffff"
          stroke-linejoin="round"
          class="bold"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </div>
      <svg
        class="flex justify-center mb-3 mt-5 ml-24 items-center shadow-none shadow-cyan-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
      >
        <path
          fill="#1DA1F2"
          d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.395 0-.779-.023-1.17-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14.001-7.497 14.001-13.986 0-.21 0-.42-.015-.63.961-.695 1.8-1.562 2.46-2.549z"
        />
      </svg>

      <ul
        class="space-x-0 space-y-0 left-0 mt-12 pt-11 flex-row items-center justify-cente"
      >
        <li>
          <router-link
            to="#"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-slate-800"
          >
            <!--Logo styling-->
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"
              />
            </svg>
            <span class="flex ms-3 whitespace-nowrap text-white">Inbox</span>
            <span
              class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
              >3</span
            >
          </router-link>
        </li>
        <li>
          <router-link
            to="/login"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-800 group"
          >
            <!--Logo styling-->
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
              />
            </svg>
            <span class="flex ms-3 whitespace-nowrap">Sign In</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/register"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-slate-800 group"
          >
            <svg
              class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"
              />
              <path
                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"
              />
              <path
                d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"
              />
            </svg>
            <span class="flex ms-3 whitespace-nowrap">Sign Up</span>
          </router-link>
        </li>
        <li>
          <!--Logo styling-->
          <router-link
            to="#"
            class="flex items-center p-2 justify-centerrounded-lg text-white hover:bg-slate-800 group"
          >
            <svg
              class="flex-shrink w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              width="50"
              height="50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 9.75L12 4.5l9 5.25M21 10.8v7.2a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-7.2m9-1.8v6.75"
              />
            </svg>
            <span class="flex ms-3 whiteFspace-nowrap rounded group m-b-8"
              >Feeds</span
            >
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
