import { useOSContext } from "../context/OSContext";
export function useFileManager() {
  const {
    fileSystem,
    recycleBin,
    createItem,
    deleteItem,
    renameItem,
    moveItem,
    restoreItem,
    permaDelete,
    getFolderChildren,
  } = useOSContext();
  return {
    fileSystem,
    recycleBin,
    createItem,
    deleteItem,
    renameItem,
    moveItem,
    restoreItem,
    permaDelete,
    getFolderChildren,
  };
}
