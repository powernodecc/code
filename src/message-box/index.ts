import {App, ComponentPublicInstance, createApp, watch} from "vue";
import MessageBoxComponent from "./MessageBox.vue"

declare type MessageBoxButtonType = 'confirm' | 'cancel'
declare type MessageBoxContentType = 'warning' | 'error'

export interface MessageBoxOptions {
    title: string
    content: string
    confirmButtonText: string
    showCancelButton?: boolean
    cancelButtonText?: string
    type?: MessageBoxContentType
}

interface MessageBoxAlertOptions {
    confirmButtonText: string
}

interface MessageBoxConfirmOptions extends MessageBoxAlertOptions {
    cancelButtonText: string
    type: MessageBoxContentType
}

export interface MessageBoxState {
    visible: boolean
    type: MessageBoxButtonType
}

const MessageBox = {
    alert: (title: string, content: string, options: MessageBoxAlertOptions): Promise<boolean> => {
        const _options: MessageBoxOptions = {
            title,
            content,
            ...options
        }
        return _messageBox(_options)
    },

    confirm: (title: string, content: string, options: MessageBoxConfirmOptions): Promise<boolean> => {
        const _options: MessageBoxOptions = {
            title,
            content,
            showCancelButton: true,
            ...options
        }
        return _messageBox(_options)
    },
}

function _messageBox(options: MessageBoxOptions): Promise<boolean> {
    return new Promise(resolve => {
        const app: App = createApp(MessageBoxComponent, {options})
        const fragment = document.createDocumentFragment()
        const instance: ComponentPublicInstance<Record<string, any>> = app.mount(fragment)
        document.body.appendChild(fragment)
        instance.setVisible(true)
        watch(
            () => instance.messageBoxState,
            (newState: MessageBoxState) => {
                if (newState.type == "confirm") {
                    resolve(true)
                } else if (newState.type == "cancel") {
                    resolve(false)
                }
                const timer = setTimeout(() => {
                    app.unmount()
                    clearTimeout(timer)
                }, 200)
            },
            {deep: true}
        )
    })
}

export default MessageBox