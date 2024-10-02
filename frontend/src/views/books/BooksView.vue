<template>
  <AppSidebar>
    <TopBar />
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 mt-5">Search Results</h1>
      <div v-if="books.length === 0" class="text-center">
        <p class="text-xl text-gray-500">No books found.</p>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="book in books"
          :key="book.bookId"
          class="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            :src="book.thumbnail"
            alt="Book Cover"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ book.title }}</h2>
            <p class="text-gray-700">Yazar: {{ book.authors.join(', ') }}</p>
            <p class="text-gray-600">Yayınevi: {{ book.publisher }}</p>
            <p class="text-gray-600">
              Yayımlanma Tarihi: {{ book.publishedDate }}
            </p>
            <p class="text-gray-600">Sayfa Sayısı: {{ book.pageCount }}</p>
            <p class="text-gray-600 mt-2 truncate">{{ book.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </AppSidebar>
</template>

<script>
import AppSidebar from '@/components/AppSidebar.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'BookResults',
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.loadBooksFromQuery();
  },
  methods: {
    loadBooksFromQuery() {
      const booksParam = this.$route.query.books;
      if (booksParam) {
        this.books = JSON.parse(booksParam);
      }
    },
  },
  components: {
    TopBar,
    AppSidebar,
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
