import { atom } from "recoil";




const data = [
    {
        title: 'Welcome', 
        content: {
            "time": Date.now(),
            "blocks": [
                { 'type': 'paragraph', 'data': { "text": "Start Writing" } }
            ],
            "version": "2.25.0"
        }
    },

]
export const editorState = atom({
    key: 'editorState',
    default: data
})

export const editorTitle = atom({
    key: 'editorTitle',
    default: 0
})

export const dataLoaded = atom({
    key: 'dataLoaded',
    default: false
})

export const load1 = atom({
    key: 'load1',
    default: false
})

export const editorShow = atom({
    key: 'editorShow',
    default: 0
})


export const roomID = atom({
    key: 'roomID',
    default: 0
})

export const brandImage = atom({
    key: 'brandImage',
    default: ''
})




