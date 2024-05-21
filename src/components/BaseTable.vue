<template>
    <template v-if="tableStore.getDataLoading">
        <div>
            Загрузка
        </div>
    </template>
    <template v-else>
        <h4>
            Максимум персон в таблице
        </h4>
        <div>
            <button
                v-for="count in perPageCounts"
                :key="count"
                :class="{ 'blue': tableStore.perPage == count }"
                @click="tableStore.changePerPageCount(count)"
            >
                {{ count }}
            </button>
        </div>
        <template v-if="tableStore.buttons">
            <h4>
                Страница
            </h4>
            <div>
                <button @click="tableStore.prevPage()">prev</button>
                <button
                    v-for="item in tableStore.buttons"
                    :key="item"
                    :class="{ 'blue': tableStore.page == item }"
                    @click="tableStore.goToPage(item)"
                >
                    {{ item }}
                </button>
                <button @click="tableStore.nextPage()">next</button>
            </div>
        </template>
        <div class="filters__filter">
            <h4>
                Поиск по ФИО
            </h4>
            <input v-model="tableStore.searchByName" type="search">
        </div>
        <div class="table">
            <div class="table__header">
                <div class="table__header-item">
                    Аватар
                </div>
                <div class="table__header-item" @click="tableStore.sortDataByName()">
                    ФИО
                </div>
                <div class="table__header-item" @click="tableStore.sortData('gender')">
                    Пол
                </div>
                <div class="table__header-item" @click="tableStore.sortDataByCountry()">
                    Страна
                </div>
                <div class="table__header-item" @click="tableStore.sortDataByDate()">
                    Дата рождения
                </div>
                <div class="table__header-item" @click="tableStore.sortData('email')">
                    Адрес электронной почты
                </div>
                <div class="table__header-item" @click="tableStore.sortData('phone')">
                    Телефон
                </div>
            </div>
            <div v-if="!tableStore.getDataLoading && tableStore.paginatedData.length" class="table__content">
                <BaseTableItem
                    v-for="person in tableStore.paginatedData as IData[]"
                    :key="person.id.value"
                    :person="person"
                    class="table__item"
                />
            </div>
            <div v-else>
                Список пуст
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import type { IData } from "@/types/table";
import BaseTableItem from "@/components/BaseTableItem.vue";

const tableStore = useTableStore();

const perPageCounts = [5, 10, 15, 20];
</script>

<style lang="scss" scoped>
.table {
    margin: 24px 0 0;
    max-width: 1280px;
    width: max-content;
    text-align: center;
    &__header {
        display: grid;
        grid-template-columns: 72px minmax(150px, 1fr) 60px minmax(100px, 170px) repeat(3, 1fr);
        &-item {
            cursor: pointer;
            border: 1px solid green;
        }
    }
    &__content {
        margin: 8px 0 0;
        display: flex;
        flex-direction: column;
        gap: 8px 0;
    }
}
.blue {
    background: blue;
}
</style>
