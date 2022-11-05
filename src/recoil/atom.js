import { atom } from "recoil";

const data = [
    { title: 'overview' },
    { title: 'pricing' },
    { title: 'testimonials' },
]
export const editorState = atom({
    key: 'editorState',
    default: data
})

export const editorShow = atom({
    key: 'editorShow',
    default: 0
})


