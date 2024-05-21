import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import apiData from '@/../api.json';
import type { IData } from "@/types/table";

export const useTableStore = defineStore('table', () => {
  const data:IData[] = ref([]);
  const getData = computed(():IData => data.value);
  const isDataLoading = ref(false);
  const toggleLoading = () => isDataLoading.value = !isDataLoading.value;
  const getDataLoading = computed(() => isDataLoading.value);
  const fetchData = () => {
    const time = Math.floor(Math.random() * 3500);
    console.log(`Duration time is ${time} ms`);
    toggleLoading();
    setTimeout(()=> {
      data.value = apiData.results;
      toggleLoading();
    }, time);
  };

  // sort
  const isSortedBefore = ref(false);
  const sortData = (sortName: string) => {
    if (isSortedBefore.value) getData.value.sort((a, b) => a[sortName].localeCompare(b[sortName]));
    else getData.value.sort((a, b) => b[sortName].localeCompare(a[sortName]));

    isSortedBefore.value =!isSortedBefore.value;
  };
  const sortDataByDate = () => {
    if (isSortedBefore.value) getData.value.sort((a, b) => new Date(a.dob.date) - new Date(b.dob.date));
    else getData.value.sort((a, b) => new Date(b.dob.date) - new Date(a.dob.date));

    isSortedBefore.value =!isSortedBefore.value;
  };
  const sortDataByCountry = () => {
    if (isSortedBefore.value) getData.value.sort((a, b) => a.location.country.localeCompare(b.location.country));
    else getData.value.sort((a, b) => b.location.country.localeCompare(a.location.country));

    isSortedBefore.value =!isSortedBefore.value;
  };
  const sortDataByName = () => {
    if (isSortedBefore.value) getData.value.sort((a, b) => a.name.first.localeCompare(b.name.first));
    else getData.value.sort((a, b) => b.name.first.localeCompare(a.name.first));

    isSortedBefore.value =!isSortedBefore.value;
  };

  // filter
  const searchByName = ref<string | number>('');
  const filteredData = computed(():IData => getData.value.filter((item: IData) => Object.values(item.name).join(' ').toLowerCase().includes(searchByName.value.trimStart().trimEnd().toLowerCase())));

  //pagination
  const page = ref<number>(1);
  const perPage = ref<number>(20);

  const paginatedData = computed(():IData => filteredData.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

  const buttons = computed((): number => Math.ceil(filteredData.value.length / perPage.value));
  const nextPage = () => {
    if (page.value !== buttons.value) page.value += 1;
  };
  const prevPage = () => {
    if (page.value !== 1) page.value -= 1;
  };
  const goToPage = (numPage: number) => page.value = numPage;
  const changePerPageCount = (count: number) => perPage.value = count;

  // url
  const checkLastPage = () => {
    if (!buttons.value) return;
    else if (page.value > buttons.value) page.value = buttons.value;
  };
  watch(() => searchByName.value, (newValue) => {
    if (!getDataLoading.value) checkLastPage();

    const url = new URL(window.location.href);
    url.searchParams.set('name', newValue);
    history.pushState(null, null, url);
  });
  watch(() => page.value, (newValue) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', newValue);
    history.pushState(null, null, url);
  });
  watch(() => perPage.value, (newValue) => {
    if (!getDataLoading.value) checkLastPage();

    const url = new URL(window.location.href);
    url.searchParams.set('perPage', newValue);
    history.pushState(null, null, url);
  });

  const checkUrl = () => {
    const url = new URL(window.location.href);
    const hasName: string = url.searchParams.get('name');
    const hasPage: string = url.searchParams.get('page');
    const hasPerPage: string = url.searchParams.get('perPage');

    if (hasName) searchByName.value = hasName;
    if (hasPage) page.value = Number(hasPage)
    if (hasPerPage) perPage.value = Number(hasPerPage);
  };

  return {
    getData,
    fetchData,
    nextPage,
    prevPage,
    goToPage,
    paginatedData,
    page,
    perPage,
    changePerPageCount,
    filteredData,
    searchByName,
    getDataLoading,
    buttons,
    checkUrl,
    sortData,
    sortDataByDate,
    sortDataByCountry,
    sortDataByName,
  }
});
