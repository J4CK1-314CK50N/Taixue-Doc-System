import { Author, TxdDocumentVersion } from "@/dian/lib/constants/constants";
import { registerStaticVariable } from "@/dian/lib/framework/variables";
import dayjs from "dayjs";

export function registerBuiltInVariables() {
    // 注册静态变量
    registerStaticVariable({
        name: 'date',
        description: '获取当前日期',
        getValue(): string {
            return dayjs().format('YYYY-MM-DD');
        }
    });
    registerStaticVariable({
        name: 'date.YYYY',
        description: '获取当前年份',
        getValue(): string {
            return dayjs().format('YYYY');
        }
    });
    registerStaticVariable({
        name: 'date.YYYY.MM',
        description: '获取当前年月',
        getValue(): string {
            return dayjs().format('YYYY-MM');
        }
    });
    registerStaticVariable({
        name: 'date.chinese',
        description: '获取当前中文日期',
        getValue(): string {
            return dayjs().format('YYYY年MM月DD日');
        }
    });
    // 星期几
    registerStaticVariable({
        name: 'date.weekday',
        description: '获取当前星期几',
        getValue(): string {
            return dayjs().format('dddd');
        }
    });
    // 星期几的缩写
    registerStaticVariable({
        name: 'date.weekday.short',
        description: '获取当前星期几的缩写',
        getValue(): string {
            return dayjs().format('ddd');
        }
    });
    // 月份
    registerStaticVariable({
        name: 'date.month',
        description: '获取当前月份',
        getValue(): string {
            return dayjs().format('MM');
        }
    });
    // 月份的缩写
    registerStaticVariable({
        name: 'date.month.short',
        description: '获取当前月份的缩写',
        getValue(): string {
            return dayjs().format('MMM');
        }
    });
    // 日期
    registerStaticVariable({
        name: 'date.day',
        description: '获取当前日期',
        getValue(): string {
            return dayjs().format('DD');
        }
    });
    // 小时
    registerStaticVariable({
        name: 'date.hour',
        description: '获取当前小时',
        getValue(): string {
            return dayjs().format('HH');
        }
    });
    // 分钟
    registerStaticVariable({
        name: 'date.minute',
        description: '获取当前分钟',
        getValue(): string {
            return dayjs().format('mm');
        }
    });
    // 秒
    registerStaticVariable({
        name: 'date.second',
        description: '获取当前秒',
        getValue(): string {
            return dayjs().format('ss');
        }
    });
    // 时分秒格式的时间
    registerStaticVariable({
        name: 'date.time',
        description: '获取当前时分秒格式的时间',
        getValue(): string {
            return dayjs().format('HH:mm:ss');
        }
    });
    // 时分秒格式的时间，中文
    registerStaticVariable({
        name: 'date.time.chinese',
        description: '获取当前时分秒格式的时间，中文',
        getValue(): string {
            return dayjs().format('HH时mm分ss秒');
        }
    });
    // 时分秒格式的时间，带毫秒
    registerStaticVariable({
        name: 'date.time.millisecond',
        description: '获取当前时分秒格式的时间，带毫秒',
        getValue(): string {
            return dayjs().format('HH:mm:ss.SSS');
        }
    });
    // 毫秒
    registerStaticVariable({
        name: 'date.millisecond',
        description: '获取当前毫秒',
        getValue(): string {
            return dayjs().format('SSS');
        }
    });
    
    // 版本
    registerStaticVariable({
        name: 'framework.version',
        description: '获取txd文件解析器版本号',
        getValue(): string {
            return TxdDocumentVersion;
        }
    });
    
    // 作者
    registerStaticVariable({
        name: 'framework.author',
        description: '获取txd文件解析器作者',
        getValue(): string {
            return Author;
        }
    });
    
    // 当前页面路径
    registerStaticVariable({
        name: 'page.path',
        description: '获取当前页面路径',
        getValue(): string {
            return window.location.pathname;
        }
    });
    
    // 获取包括query参数在内的当前页面完整url
    registerStaticVariable({
        name: 'page.url',
        description: '获取包括query参数在内的当前页面完整url',
        getValue(): string {
            return window.location.href;
        }
    });
    
    // 网站根url
    registerStaticVariable({
        name: 'page.origin',
        description: '获取网站根url',
        getValue(): string {
            return window.location.origin;
        }
    });
    
    // 通过source的query参数获取渲染 文档位置
    registerStaticVariable({
        name: 'page.source',
        description: '通过 query 参数获取渲染文档源文件位置',
        getValue(): string {
            const query = new URLSearchParams(window.location.search);
            return query.get('source') || '';
        }
    });
}