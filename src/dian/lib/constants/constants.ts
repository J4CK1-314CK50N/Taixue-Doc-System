// 框架信息
export const TxdDocumentVersion = '1.0.0 Alpha';
export const Author = 'Jacky_Blackson @ Taixue';

// 调试后门密码
export const DebugPassword = 'dev';
export const CorsPolicyDisablePassword = 'cors';

// 信任的域名
// 匹配局域网域名
const TrustedDomainsForLocalNetwork = [
    /^192\.168\.\d+\.\d+$/,
    /^10\.\d+\.\d+\.\d+$/,
    /^172\.1[6-9]\.\d+\.\d+$/,
    /^172\.2[0-9]\.\d+\.\d+$/,
    /^172\.3[0-1]\.\d+\.\d+$/,
];
// 匹配 taixue.cc
const TrustedDomainsForTaixue = [
    /^taixue\.cc$/,
    /^www\.taixue\.cc$/,
];
export const TrustedDocumentOrigins = [
    ...TrustedDomainsForLocalNetwork,
    ...TrustedDomainsForTaixue,
];
