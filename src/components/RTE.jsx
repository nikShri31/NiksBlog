import React from 'react'
import { Editor } from '@tinymce/tinymce-react';

import { Controller } from 'react-hook-form'; // Controlled Inputs 

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'> {label} </label>}

            {/* Look at the syntax of editor in tinymce docs */}



            <Controller            // The Controller component  is used to wrap form inputs. 
                name={name || 'content'}
                control={control}          // control parent element se hoga 

                //  ** SYNTAX -->  render={({field:{}})=>(<Editor/>)}     

                render={({ field: {onChange} }) => (

                    <Editor   // render k andr editor aayega ise onchange function se hi value milegi
                    apiKey='u6r0mguouwk7q1ljsrag6r92mjv44a0nbjn1m8574t3jyqzw'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange} // editor m kuch bhi change ho vo onChange se ho
                    />

                )}

            />
        </div>
    )
};
export default RTE;

