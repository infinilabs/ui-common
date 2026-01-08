
const platformAdapter = {
  commands: async (command: string, args: any) => {
    console.log(`Mock command: ${command}`, args);
    return { hits: { hits: [] } };
  },
  invokeBackend: async <T>(command: string, args: any): Promise<T | undefined> => {
    console.log(`Mock invokeBackend: ${command}`, args);
    return undefined;
  }
};
export default platformAdapter;
