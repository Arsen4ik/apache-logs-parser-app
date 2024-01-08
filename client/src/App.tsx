import { useEffect, useState, ChangeEvent } from 'react';
import { Tooltip, initTE } from "tw-elements";
import { handleFileChange, ParsedApacheLogWithMessage, ParsedApacheLogWithoutMessage } from './funcs';

interface FileContent {
  logsWithMessage: ParsedApacheLogWithMessage[];
  logsWithoutMessage: ParsedApacheLogWithoutMessage[];
}

const App: React.FC = () => {
  const [fileContent, setFileContent] = useState<FileContent>({
    logsWithMessage: [],
    logsWithoutMessage: [],
  });

  useEffect(() => {
    initTE({ Tooltip });
  }, []);

  return (
    <main className="px-6">
      <label className="flex items-center justify-center h-32">
        <span className="sr-only">Choose profile photo</span>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFileContent)}
          type="file"
          className="block  text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
        />
      </label>
      <div className='overflow-x-scroll'>
        {fileContent.logsWithoutMessage.length > 0 && (
          <table className="w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">ipAddress</th>
                <th scope="col" className="px-6 py-4">date</th>
                <th scope="col" className="px-6 py-4">request</th>
                <th scope="col" className="px-6 py-4">status</th>
                <th scope="col" className="px-6 py-4">bytes</th>
                <th scope="col" className="px-6 py-4">referrer</th>
                <th scope="col" className="px-6 py-4">userAgent</th>
              </tr>
            </thead>
            <tbody>
              {
                fileContent.logsWithoutMessage.map((log, ind) => (
                  <tr key={ind} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{ind + 1}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.ipAddress ? log.ipAddress.replace(/(.{30})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.date ? log.date.replace(/(.{30})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.request ? log.request.replace(/(.{30})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.status || '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.bytes || '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.referrer ? log.referrer.replace(/(.{30})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.userAgent ? log.userAgent.replace(/(.{30})/g, '$1\n') : '-'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
        {fileContent.logsWithMessage.length > 0 && (
          <table className="w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">timestamp</th>
                <th scope="col" className="px-6 py-4">module</th>
                <th scope="col" className="px-6 py-4">pid</th>
                <th scope="col" className="px-6 py-4">code</th>
                <th scope="col" className="px-6 py-4">message</th>
              </tr>
            </thead>
            <tbody>
              {
                fileContent.logsWithMessage.map((log, ind) => (
                  <tr key={ind} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{ind + 1}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.timestamp ? log.timestamp.replace(/(.{31})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.module ? log.module.replace(/(.{30})/g, '$1\n') : '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.pid || '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.code || '-'}</td>
                    <td className="whitespace-pre px-6 py-4">{log?.message ? log.message.replace(/(.{100})/g, '$1\n') : '-'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default App;
