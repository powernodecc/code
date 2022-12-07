<script setup lang="ts">
    import MessageBox from "./message-box";

    const showMessageBoxAlert = async () => {
        const r = await MessageBox.alert('Title', 'This is Message', {confirmButtonText: 'OK'})
        console.log(r);
    }

    const showMessageBoxConfirm = async () => {
        const r = await MessageBox.confirm("Warning",
                "proxy will permanently delete the file. Continue?",
                {cancelButtonText: 'Cancel', confirmButtonText: 'ok', type: "error"})
        console.log(r)
    }
</script>

<template>
    <main class="temp">
        <button @click="showMessageBoxAlert" class="temp-button">MessageBox.alter()</button>
        <button @click="showMessageBoxConfirm" class="temp-button">MessageBox.confirm()</button>
    </main>
</template>

<style lang="scss">
    .temp {
        background: #34495e;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        &-button {
            padding: 1rem 1.5rem;
            border-radius: .2rem;
            border: none;
            cursor: pointer;
            background: #3498db;
            color: #ecf0f1;
            font-size: 1.4rem;
            transition-duration: .2s;

            &:hover {
                background: #2980b9;
            }
        }
    }
</style>
