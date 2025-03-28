import { CommandNode, InlineCommand } from "@/dian/types/TxdDocumentTypes";

function parseClassName(commands: CommandNode[] | undefined): string {

    if (!commands) {
        return '';
    }

    const result: string[] = [];
    for (const command of commands) {
        switch (command.type) {
            case 'BOLD':
                result.push('font-bold');
                break;
            case 'ITALIC':
                result.push('italic');
                break;
            case 'UNDERLINE':
                result.push('underline');
                break;
            case 'DELETE':
                result.push('line-through');
                break;
            case 'CODE':
                result.push('font-mono bg-gray-200 p-1 rounded-md');
                break;
            case 'COLOR':
                result.push(`text-${command.defaultParam}-500`);
                break;
            case 'LINK':
                result.push(`text-blue-500 hover:underline`);
                break;
            case 'IMAGE':
                result.push(`w-1/2 h-1/2`);
                break;
            case 'LIGHT':
                result.push('font-light');
                break;
            // 上标下标
            case 'SUP':
                result.push('sup');
                break;
            case 'SUB':
                result.push('sub');
                break;
            // 高亮
            case 'HIGHLIGHT':
                result.push(`bg-${command.defaultParam}-500 p-1 rounded-md`);
                break;
            case 'QUOTE':
                result.push(`border-l-4 border-${command.defaultParam}-500 pl-4`);
                break;
            // 注释
            case 'COMMENT':
                result.push(`text-gray-500`);
                break;
            // 元素结束后换行，作用对象是一个 span 标签
            case 'BR':
                result.push(`break-all`);
                break;
            // 对齐方式
            case 'ALIGN':
                result.push(`text-${command.defaultParam}`);
                break;

            default:
                break;
        }
    }
    return result.join(' ');
}

const InlineElement: React.FC<{
    commands?: CommandNode[],
    contents: (string | InlineCommand)[] | string
}> = ({
    commands,
    contents
}) => {
        if (typeof contents === 'string') {
            return <span className={parseClassName(commands)}>{contents}</span>;
        }
        return (
            <span className={parseClassName(commands)}>
                {
                    contents.map((content) => {
                        if (typeof content === 'string') {
                            return content;
                        }
                        return <InlineElement
                            key={JSON.stringify(content)}
                            commands={content.commands}
                            contents={content.contents}
                        />
                    })
                }
            </span>
        )
    }

export default InlineElement;