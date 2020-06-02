import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

// TODO:  gettejä ja posteja jostain

const TextEditor = () => {

    const editor = useMemo(() => withReact(createEditor()), [])

    const now = Date();
    const pvmForm = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const yhd = 'Yhdistys Abc' 
    const kokousNo = 7
    const ehdotus = "Tähän tulee gettillä sisältöä vaikka tai PJ:n alustusta"

    const [value, setValue] = useState(JSON.parse(localStorage.getItem('content')) || [
        {
            type: 'header',
            children: [
                { text: `${yhd}\t\t\t` + new Date(now).toLocaleDateString('fi-FI', pvmForm) },
                { text: `\nKokousnumero ${kokousNo}` },
                { text: '\n' }
            ]
        },
        {
            type: 'paragraph',
            children: [
                { text: `${ehdotus}` }
            ]
        }
    ])
    const send = () => {
        console.log('localStorage.getItem("content")', localStorage.getItem("content"))
        localStorage.removeItem('content')
        window.location.reload()
    }

    return (
        <div>
            <div style={{ border: 'solid black 1px', width: '50%', margin: 'auto', textAlign: 'left' }}>
                <Slate
                    editor={editor}
                    value={value}
                    onChange={newValue => {
                        setValue(newValue)
                        const content = JSON.stringify(value)
                        localStorage.setItem('content', content)
                    }}>
                    <Editable />
                </Slate>
            </div>
            <button className="mt-4 btn btn-outline-primary" onClick={send}>Tallenna</button> {/*  onclick for commit */}
        </div>
    )
}
export default TextEditor
