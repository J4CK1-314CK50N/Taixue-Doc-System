import { useState } from "react";
import { parseTxdDocument } from "../lib/parser/parser";

const TestParser: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');

    return (
        <div>
            TestParser
            <textarea
                onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={() => {
                const parsedDocument = parseTxdDocument(inputText);
                console.log('parsedDocument: ', parsedDocument);
            }}>
                PARSE！
            </button>
        </div>
    )
}

export default TestParser;
