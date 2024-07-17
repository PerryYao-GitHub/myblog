<script>
export default {
    name: 'ContainerField',
}
</script>

<template>
<div class="container container-flied">
    <div class="card">
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<style scoped>
div.container.container-flied {
    margin-top: 30px;
}

.card {
    background-color: rgba(255, 255, 255, 0.63);
}
</style>