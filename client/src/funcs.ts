import axios from 'axios';

export interface ParsedApacheLogWithMessage {
    timestamp: string;
    module: string;
    pid: string;
    code: string;
    message: string;
}

export interface ParsedApacheLogWithoutMessage {
    ipAddress: string;
    date: string;
    request: string;
    status: number;
    bytes: number;
    referrer: string;
    userAgent: string;
}

type ParsedApacheLog = ParsedApacheLogWithMessage | ParsedApacheLogWithoutMessage;

const parseApacheLog = (logString: string): ParsedApacheLog | null => {
    let logRegex: RegExp;
    if (logString[0] === '[') {
        logRegex = /^\[([^\]]+)\] \[([^\]]+)\] \[pid (\d+)\] (.+?): (.+)$/;
    } else {
        logRegex = /^(\S+) - - \[([^\]]+)\] "(.+?)" (\d+) (\d+) "(.+?)" "(.+?)"$/;
    }
    let matches = logString.match(logRegex);
    if (!matches) {
        console.error('Unable to parse log entry:', logString);
        return null;
    } else {
        if (logString[0] === '[') {
            let [, timestamp, module, pid, code, message] = matches;
            return {
                timestamp,
                module,
                pid,
                code,
                message,
            };
        } else {
            let [, ipAddress, date, request, status, bytes, referrer, userAgent] = matches;
            return {
                ipAddress,
                date,
                request,
                status: +status,
                bytes: +bytes,
                referrer,
                userAgent,
            };
        }
    }
};

interface ChangeFileContent {
    logsWithMessage: ParsedApacheLogWithMessage[];
    logsWithoutMessage: ParsedApacheLogWithoutMessage[];
}

export const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    changeFileContent: (content: ChangeFileContent) => void
) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const logs = (e.target?.result as string).split('\n').filter((line) => line.trim() !== '');
            const logsWithMessage: ParsedApacheLogWithMessage[] = [];
            const logsWithoutMessage: ParsedApacheLogWithoutMessage[] = [];

            logs.forEach((log) => {
                let data = parseApacheLog(log);
                if (data) {
                    if ('message' in data) logsWithMessage.push(data);
                    else logsWithoutMessage.push(data);
                }
            });

            changeFileContent({ logsWithMessage, logsWithoutMessage });

            try {
                const { data: dataToAlert } = await axios.get('http://localhost:5678/');
                alert(`Произошел дамп следующих данных: ${JSON.stringify(dataToAlert.data, null, 4)}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        reader.readAsText(file);
    }
};
