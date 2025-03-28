import { BlockElement, CommandNode, InLineElement, TxdDocument } from "../../types/TxdDocumentTypes";

export function parseTxdDocument(doc: string): TxdDocument {
    const lines = doc.split('\n');
    if (lines.length === 0) {
        throw new Error('Empty document')
    }
    if (!lines[0].startsWith('TAIXUE DOC FILE')) {
        throw new Error('Invalid document type')
    }

    // parse head
    const {
        headEndIndex,
        identifier,
        variableMap
    } = parseHeader(lines);

    // divide blocks
    const parsedBlocks = parseBlock(lines, headEndIndex, identifier);

    // parse inline
    const result: BlockElement[] = parsedBlocks.map(block => {
        return {
            command: block.command,
            content: parseInline(block.content, identifier),
        }
    });

    return {
        variables: variableMap,
        blocks: result,
        identifier: identifier,
    };
}

function parseHeader(lines: string[]): {
    headEndIndex: number;
    identifier: string;
    variableMap: Map<string, string>;
} {
    const variableMap = new Map<string, string>();
    let identifier = '$';
    let headEndIndex = 0;
    let headEntered = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trimStart();
        if (line === '' || line === '\n') {
            continue;
        }
        if (headEntered && line.trim().startsWith("#")) {
            continue;
        }
        if (line.trimEnd().substring(1) === 'HEAD') {
            identifier = line.charAt(0);
            headEntered = true;
        } else if (headEntered && line.trimEnd().substring(1) === 'END') {
            headEndIndex = i;
            break;
        } else if (identifier && line.startsWith(identifier)) {
            const [varName, value] = line.split('=');
            variableMap.set(varName.substring(1).trim(), value.trim());
        }
    }
    return {
        headEndIndex,
        identifier,
        variableMap
    }
}

function parseBlock(lines: string[], headEndIndex: number, identifier: string): {
    command: CommandNode;
    content: string[];
}[] {
    const blocks: {
        command: CommandNode;
        content: string[];
    }[] = [];
    let insideBlock = false;
    let currentNoode: {
        command: CommandNode;
        content: string[];
    } = {
        command: {
            type: '',
            params: new Map<string, string>()
        },
        content: []
    };
    for (let i = headEndIndex + 1; i < lines.length; i++) {
        const line = lines[i].trimStart();
        if (line === '' || line === '\n') {
            continue;
        }
        if (!insideBlock && line.startsWith('#')) {
            continue;
        }
        // 解析命令
        if (!insideBlock && line.startsWith(identifier)) {
            insideBlock = true;
            const commandNode = parseSingleCommand(line);
            currentNoode = {
                command: commandNode,
                content: []
            }
            continue;
        }
        // 解析结束
        if (
            insideBlock
            && line.startsWith(identifier + 'END')
        ) {
            blocks.push(currentNoode);
            insideBlock = false;
            continue;
        }
        // 解析内容
        if (
            insideBlock
            && !line.startsWith(identifier + 'END')
        ) {
            currentNoode.content.push(line);
        }
    }
    return blocks;
}

function parseSingleCommand(line: string): CommandNode {
    const parts = line.split(' ');
    const [type, defaultParam] = parts[0].split('=');
    const params = new Map<string, string>();
    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            if (parts[i].includes('=')) {
                const [key, value] = parts[i].split('=');
                params.set(key, value);
            } else if (parts[i] !== '{' && parts[i] !== '}') {
                params.set(parts[i], 'true');
            }
        }
    }
    return {
        type: type.substring(1),
        params,
        defaultParam
    }
}

function parseComplexCommand(line: string, identifier: string): CommandNode[] {
    const parts = line.split(' ');
    const commands = [];
    let currentCommandParts = [];
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].startsWith(identifier)) {
            if (currentCommandParts.length > 0) {
                commands.push(parseSingleCommand(currentCommandParts.join(' ')));
                currentCommandParts = [];
            }
            currentCommandParts.push(parts[i]);
        } else {
            currentCommandParts.push(parts[i]);
        }
    }
    commands.push(parseSingleCommand(currentCommandParts.join(' ')));
    return commands;
}

function parseInline(lines: string[], identifier: string): InLineElement[] {
    const elements: InLineElement[] = [];
    let currentElement: InLineElement = {
        commands: [],
        contents: []
    };
    let insideBlock = false;
    let preLineCommand = false;
    let blockCounter = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trimStart();
        if (line === '' || line === '\n') {
            continue;
        }
        if (line.startsWith('#')) {
            continue;
        }
        // inline block end
        if (insideBlock && line.trimEnd().endsWith('}') && blockCounter === 0) {
            insideBlock = false;
            preLineCommand = false;
            elements.push(currentElement);
            currentElement = {
                commands: [],
                contents: []
            };
            continue;
        }
        // inline block content
        if (insideBlock && typeof currentElement === 'object') {
            currentElement.contents.push(line);
            if (line.trimEnd().endsWith('{')) {
                blockCounter++;
            }
            if (line.trimEnd().endsWith('}')) {
                blockCounter--;
            }
            continue;
        }
        // inline block start
        if (line.startsWith(identifier) && typeof currentElement === 'object') {
            currentElement.commands.push(...parseComplexCommand(line, identifier));
            preLineCommand = true;
            if (line.trimEnd().endsWith('{')) {
                insideBlock = true;
            }
            continue;
        }
        // simple block content
        if (!insideBlock && preLineCommand && typeof currentElement === 'object') {
            currentElement.contents.push(line);
            elements.push(currentElement);
            currentElement = {
                commands: [],
                contents: []
            };
            insideBlock = false;
            preLineCommand = false;
            continue;
        }
        // plain text
        if (!insideBlock && !preLineCommand) {
            elements.push(line);
            preLineCommand = false;
            currentElement = {
                commands: [],
                contents: []
            };
            continue;
        }
    }
    elements.forEach(element => {
        if (typeof element === 'object') {
            element.contents = parseInline(element.contents as string[], identifier);
        }
    })
    return elements;
}