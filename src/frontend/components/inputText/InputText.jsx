import React, { useCallback, useState, useEffect } from "react";
import './inputText.less';

export default function inputText({ onSubmitCallback, data, placeholder, children }) {
    const [text, setText] = useState('');

    const onChange = useCallback((e) => setText(e.target.value), [setText]);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            onSubmitCallback(text);
        },
        [onSubmitCallback, text]
    );

    useEffect(() => (data && setText(data)), [data]);

    return (
        <form className="input-form" onSubmit={onSubmit}>
            <input className="input-text" type="text" onChange={onChange} placeholder={placeholder} value={text} />
            <button className="input-button" type="submit" value="Submit" >{children}</button>
        </form>
    );
};
