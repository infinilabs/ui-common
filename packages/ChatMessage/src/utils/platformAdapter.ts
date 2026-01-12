
const platformAdapter = {
  commands: async (command: string, args: any) => {
    console.log(`Mock command: ${command}`, args);
    if (command === "get_attachment_by_ids") {
        return {
            hits: {
                hits: [
                    { _source: { id: "1", name: "测试文件1.txt", icon: "txt", size: "4kb" } },
                    { _source: { id: "2", name: "测试文件2.pdf", icon: "pdf", size: "982kb" } },
                    { _source: { id: "3", name: "测试文件3.md", icon: "md", size: "12kb" } }
                ]
            }
        };
    }
    return { hits: { hits: [] } };
  },
  invokeBackend: async <T>(command: string, args: any): Promise<T | undefined> => {
    console.log(`Mock invokeBackend: ${command}`, args);
    return undefined;
  }
};
export default platformAdapter;
