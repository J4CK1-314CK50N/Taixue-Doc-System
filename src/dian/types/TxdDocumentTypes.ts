export interface CommandNode {
    type: string;
    params: Map<string, string>;
    defaultParam?: string | undefined;
}

export interface InlineCommand {
    commands: CommandNode[];
    contents: Array<InlineCommand | string>;
}

export type InLineElement = InlineCommand | string;

export interface BlockElement {
    command: CommandNode;
    content: InLineElement[];
}

export interface TxdDocument {
    variables: Map<string, string>;
    blocks: BlockElement[];
    identifier: string;
}
