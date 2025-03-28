import { JSX, useState } from "react";
import { parseTxdDocument } from "../lib/parser/parser";
import { getStaticVariableDefinition, getVariables } from "../lib/framework/variables";

const VariableDocument: React.FC = () => {
    const variableValues = getVariables(new Map([
        ['test', 'test'],
    ]));

    const variableDefinitions = getStaticVariableDefinition();
    const variableFormItems: JSX.Element[] = [];
    variableDefinitions.forEach((definition) => {
        variableFormItems.push(
            <tr>
                <td>{definition.name}</td>
                <td>{definition.description}</td>
                <td>{definition.getValue()}</td>
            </tr>
        )
    })

    return (
        <div>
            <div>
                Variable Definitions
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>KEY</th>
                            <th>Description</th>
                            <th>Example Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variableFormItems}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VariableDocument;