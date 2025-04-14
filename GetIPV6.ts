import { execSync } from 'child_process';
import * as iconv from 'iconv-lite'; // 需要先安装 npm install iconv-lite

/**
 * 通过 API 获取 IPv6
 * @returns {string} IPv6地址 
 */
export async function getIpv6ByInterface(): Promise<string | null> {
    try {
        const response = await fetch('https://api6.ipify.org?format=json');
        if (response.ok) {
            const data = await response.json();
            return data.ip;
        }
    } catch (e) {
        console.error('Error fetching public IPv6:', e);
    }
    return null;
}

/**
 * 通过命令行获取 IPv6
 * @returns {string} IPv6地址 
 */
export function getIpv6ByCmd(): string {
    try {
        // 执行命令并获取 utf-8 编码的输出
        const output = execSync('ipconfig /all', { encoding: 'buffer' });
        // 使用 iconv-lite 转换编码
        const decodedOutput = iconv.decode(output, 'utf-8');
        // console.log(decodedOutput)
        
        const lines = decodedOutput.split('\r\n');
        const tempPattern = /Temporary/; // 匹配包含"临时"的行
        
        for (const line of lines) {
            if (tempPattern.test(line)) {
                // 匹配 IPv6 地址格式
                console.log(line)
                const ipv6Regex = /([0-9a-f:%]{5,})/;
                const match = line.match(ipv6Regex);
                if (match && match[0]) {
                    return match[0];
                }
            }
        }
        console.error('No temporary IPv6 address found!');
    } catch (e) {
        console.error('Error executing command:', e);
    }
    return "";
}

// console.log(getIpv6ByInterface())
// console.log(getIpv6ByCmd())