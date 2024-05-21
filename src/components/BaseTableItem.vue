<template>
    <div class="item">
        <div class="item__column">
            <img :src="person.picture.medium" :alt="`${person.name.title} ${person.name.first} ${person.name.last}`">
        </div>
        <div class="item__column">
            {{ person.name.title }} {{ person.name.first }} {{ person.name.last }}
        </div>
        <div class="item__column">
            {{ person.gender }}
        </div>
        <div class="item__column">
            {{ person.location.country }}
        </div>
        <div class="item__column">
            {{ getBirthday(person.dob.date) }}
        </div>
        <div class="item__column">
            {{ person.email }}
        </div>
        <div class="item__column">
            {{ person.phone }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IData } from "@/types/table";

defineProps({
    person: {} as IData
});

const getBirthday = (date) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return new Date(date).toLocaleDateString('ru', options);
}
</script>

<style lang="scss" scoped>
.item {
    max-width: 1280px;
    text-align: center;
    display: grid;
    grid-template-columns: 72px minmax(150px, 1fr) 60px minmax(100px, 170px) repeat(3, 1fr);
    &__column {
        border: 1px solid green;
    }
}
</style>
