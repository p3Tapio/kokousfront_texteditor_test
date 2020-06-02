import React, { useMemo, useState } from 'react'
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const TextEditor = () => {

    const editor = useMemo(() => withReact(createEditor()), [])

    const now = Date();
    const pvmForm = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const yhd = 'Yhdistys Abc'  // GET jostain 
    const [value, setValue] = useState(JSON.parse(localStorage.getItem('content')) || [
        {
            type: 'header',
            children: [
                { text: new Date(now).toLocaleDateString('fi-FI', pvmForm) },
                { text: `\n${yhd}` }
            ]
        }
    ])
    const send = () => {
        console.log('localStorage.getItem("content")', localStorage.getItem("content"))
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
                    <Editable
                        onKeyDown={ev => {
                            if (ev.key === '+' && ev.ctrlKey) {
                                ev.preventDefault()
                                const [match] = Editor.nodes(editor, { match: n => n.type === 'code' })
                                Transforms.setNodes(
                                    editor,
                                    { type: match ? 'paragraph' : 'code' },
                                    { match: n => Editor.isBlock(editor, n) }
                                )
                            }
                        }}
                    />
                </Slate>
            </div>
            <button className="mt-4 btn btn-outline-primary" onClick={send}>Tallenna</button> {/*  onclick for commit */}
        </div>
    )
}
export default TextEditor
