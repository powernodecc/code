<script setup lang="ts">
    import {$ref} from 'vue/macros'
    import {MessageBoxOptions, MessageBoxState} from "./index";

    const props = defineProps<{ options: MessageBoxOptions }>()

    const messageBoxState = $ref<MessageBoxState>({visible: false, type: "confirm"})

    const setVisible = () => {
        messageBoxState.visible = true
    }

    const setTypeIsConfirm = () => {
        messageBoxState.visible = false
        messageBoxState.type = "confirm"
    }

    const setTypeIsCancel = () => {
        messageBoxState.visible = false
        messageBoxState.type = "cancel"
    }

    const setTypeIsClose = () => {
        props.options.showCancelButton ? setTypeIsCancel() : setTypeIsConfirm()
    }

    defineExpose({
        messageBoxState,
        setVisible
    })

</script>

<template>
    <Transition name="backdrop">
        <div class="message-box" v-show="messageBoxState.visible" @click.self="setTypeIsClose">
            <article class="message-box-article">
                <header class="message-box-article-header">
                    <p class="message-box-article-header-title">{{ options.title }}</p>
                    <i class="fa-solid fa-xmark message-box-article-header-close" @click="setTypeIsClose"></i>
                </header>
                <main class="message-box-article-main">
                    <i v-if="options.showCancelButton"
                       :class="{'message-box-article-main-warning':options.type === 'warning','message-box-article-main-error':options.type === 'error'}"
                       class="fa-solid fa-circle-exclamation"></i>
                    <p>{{ options.content }}</p>
                </main>
                <footer class="message-box-article-footer">
                    <button v-if="options.showCancelButton"
                            class="message-box-article-footer-button message-box-article-footer-cancel"
                            @click="setTypeIsCancel">
                        {{ options.cancelButtonText }}
                    </button>
                    <button class="message-box-article-footer-button message-box-article-footer-confirm"
                            @click="setTypeIsConfirm">
                        {{ options.confirmButtonText }}
                    </button>
                </footer>
            </article>
        </div>
    </Transition>
</template>

<style lang="scss">
    .backdrop-enter-to, .backdrop-leave-from {
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .backdrop-enter-from, .backdrop-leave-to {
        opacity: 0;
    }

    .message-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .2s;

        &-article {
            display: grid;
            grid-template-rows: 1fr 2.2fr 1fr;
            background: #ffffff;
            border-radius: .2rem;
            padding: .8rem;
            min-width: 25rem;
            max-width: 30rem;
            transform: translateY(-30%);

            &-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                &-title {
                    font-size: 1.1rem;
                    color: #303133;
                }

                &-close {
                    cursor: pointer;
                    font-size: 1.1rem;
                    transition-duration: .1s;

                    &:hover {
                        color: #31c27c;
                    }
                }
            }

            &-main {
                display: flex;
                align-items: center;
                gap: .5rem;
                color: #34495e;

                &-warning {
                    font-size: 1.4rem;
                    color: #f39c12;
                }

                &-error {
                    font-size: 1.4rem;
                    color: #e74c3c;
                }
            }

            &-footer {
                display: grid;
                grid-template: repeat(1,1fr)/repeat(2,0fr);
                justify-content: flex-end;
                gap: .5rem;

                &-button {
                    border: none;
                    border-radius: .2rem;
                    padding: .4rem 1.3rem;
                    cursor: pointer;
                    transition-duration: .2s;
                    font-size: 1rem;

                }

                &-confirm {
                    background: #31c27c;
                    color: #fff;

                    &:hover {
                        background-color: #27ae60;
                    }
                }

                &-cancel {
                    background: #e74c3c;
                    color: #fff;

                    &:hover {
                        background-color: #c0392b;
                    }
                }
            }
        }
    }
</style>