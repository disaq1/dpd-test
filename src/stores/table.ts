import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import type { IData } from "@/types/table";
import apiData from '@/../api.json';

export const useTableStore = defineStore('table', () => {
  const data = ref<IData[]>([]);
  const getData = computed(():IData[] => data.value);
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
  const sortData = (sortName) => {
    if (isSortedBefore.value) getData.value.sort((a, b) => a[sortName].localeCompare(b[sortName]));
    else getData.value.sort((a, b) => b[sortName].localeCompare(a[sortName]));

    isSortedBefore.value =!isSortedBefore.value;
  };
  const sortDataByDate = () => {
    if (isSortedBefore.value) getData.value.sort((a: IData, b: IData) => new Date(a.dob.date) - new Date(b.dob.date));
    else getData.value.sort((a: IData, b: IData) => new Date(b.dob.date) - new Date(a.dob.date));

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
  const searchByName = ref<string>('');
  const filteredData = computed(():IData[] => getData.value.filter((item: IData) => Object.values(item.name).join(' ').toLowerCase().includes(searchByName.value.trimStart().trimEnd().toLowerCase())));

  //pagination
  const page = ref<number>(1);
  const perPage = ref<number>(20);

  const paginatedData = computed(():IData[] => filteredData.value.slice((page.value - 1) * perPage.value, page.value * perPage.value));

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
  watch(() => searchByName.value, (newValue: string) => {
    if (!getDataLoading.value) checkLastPage();

    const url = new URL(window.location.href);
    newValue ? url.searchParams.set('name', newValue) : url.searchParams.delete('name');
    history.pushState(null, null, url);
  });
  watch(() => page.value, (newValue: number) => {
    const url = new URL(window.location.href);
    newValue ? url.searchParams.set('page', String(newValue)) : url.searchParams.delete('page');
    history.pushState(null, null, url);
  });
  watch(() => perPage.value, (newValue: number) => {
    if (!getDataLoading.value) checkLastPage();

    const url = new URL(window.location.href);
    newValue ? url.searchParams.set('perPage', String(newValue)) : url.searchParams.delete('perPage');
    history.pushState(null, null, url);
  });

  const checkUrl = () => {
    const url = new URL(window.location.href);
    const hasName: string | null = url.searchParams.get('name');
    const hasPage: string | null = url.searchParams.get('page');
    const hasPerPage: string | null = url.searchParams.get('perPage');

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
