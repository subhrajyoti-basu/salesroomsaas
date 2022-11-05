import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List  from "@editorjs/list";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { editorShow, editorState } from "../../recoil/atom";

var TESTDATA = [
    { title: 'overview' },
    { title: 'pricing' },
    { title: 'testimonials' },
]
function CanvasEditor() {
    // recoil states
    const [pageNumber, setpageNumber] = useRecoilState(editorShow)
    const [editorData, seteditorData] = useRecoilState(editorState)


    const editRef = useRef()

    useEffect(() => {
        initEditor();
        return async () => {
            // if(editRef.current){
            await editRef.current.destroy();
            editRef.current = null;
            // }

        }

    }, [pageNumber])

    function replaceItemAtIndex(arr, index, newValue) { return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]; }

    const processData = (outputData) => {
        // takes data and index and updates the data
        const newValue = { ...editorData[pageNumber], content: outputData }

        // setdata to global atom
        seteditorData(replaceItemAtIndex(editorData, pageNumber, newValue))
    }

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            logLevel: 'ERROR',
            placeholder: 'Press TAB for more options',
            data: editorData[pageNumber].content,
            onReady: () => {
                editRef.current = editor
            },
            onChange: () => {
                editor.save().then(outputData => processData(outputData))
            },
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link'],
                    config: {
                        levels: [1, 2, 3],
                        defaultLevel: 2
                    }
                },
                list: List
            }
        })
    }


    return (
        <div className="overflow-y-auto flex-auto">
            <div className="max-w-[700px] w-full mx-auto mt-20 p-5">
                <div className="display1 capitalize mb-10">
                    {editorData[pageNumber].title}
                </div>
                <div id="editorjs"></div>
            </div>
        </div>
    );
}

export default CanvasEditor;