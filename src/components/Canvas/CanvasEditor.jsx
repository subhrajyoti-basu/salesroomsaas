import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { dataLoaded, editorShow, editorState, load1 } from "../../recoil/atom";
import BrandLogoUpload from "../element/BrandLogoUpload";


function CanvasEditor() {
    // recoil states
    const [pageNumber, setpageNumber] = useRecoilState(editorShow)
    const [editorData, seteditorData] = useRecoilState(editorState)
    const [load, setLoad] = useRecoilState(dataLoaded)
    const [shouldload, setshouldload] = useRecoilState(load1);



    const editRef = useRef()



    useEffect(() => {
        if (load) {
            initEditor();
        }

        return async () => {
            if (editRef.current) {
                await editRef.current.destroy();
                editRef.current = null;
            }
        }

    }, [pageNumber, load, shouldload])



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
                table: Table,
                list: List,
                embed: Embed
            }
        })

    }


    return (
        <div className="overflow-y-auto flex-auto">
            <div className="max-w-[700px] w-full mx-auto mt-20 p-5">
                {pageNumber == 0 && <div>
                    <BrandLogoUpload />   
                </div>}
                <div className="display1 capitalize mb-10">
                    {editorData[pageNumber]?.title}
                </div>
                <div id="editorjs"></div>
            </div>
        </div>
    );
}

export default CanvasEditor;