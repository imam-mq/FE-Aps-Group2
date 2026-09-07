import { useEffect, useMemo, useState } from "react";
import { useAplikasiData } from "./hooks/useAplikasiData";
import { useNotif } from "./hooks/useNotif";
import { SearchBar } from "./components/SearchBar";
import { AplikasiTable } from "./components/AplikasiTable";
import { AplikasiForm } from "./components/AplikasiForm";
import { NotifContainer } from "./components/NotifContainer";
import { DeleteModal } from "./components/DeleteModal";

const ROWS_PER_PAGE = 10;

function App() {
  const { data, loadData, addData, updateData, deleteData } = useAplikasiData();
  const { notifs, showNotif } = useNotif();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) => (item.namaAplikasi || "").toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ROWS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const endIndex = Math.min(startIndex + ROWS_PER_PAGE, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleAddClick = () => { setEditingItem(null); setIsFormOpen(true); };
  const handleEditClick = (id) => {
    const item = data.find((d) => d.id === id);
    if (item) { setEditingItem(item); setIsFormOpen(true); }
  };

  const handleFormSubmit = async (item) => {
    try {
      if (editingItem) {
        await updateData(editingItem.id, item);
        showNotif("Data berhasil diubah", "success");
      } else {
        await addData(item);
        showNotif("Data berhasil ditambahkan", "success");
      }
      setIsFormOpen(false);
    } catch (err) {
      showNotif(err.message, "error");
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteTarget(item);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await deleteData(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold">APS GROUP 2</h1>
          <p className="text-sm text-gray-500">penyimpanan data aplikasi group 2</p>
        </div>
        <button onClick={handleAddClick} className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700">
          Tambah Data Aplikasi
        </button>
      </header>

      <div className="mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <AplikasiTable
        items={paginatedData} currentPage={page} totalPages={totalPages}
        totalData={filteredData.length} startIndex={startIndex} endIndex={endIndex}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        onEdit={handleEditClick} onDelete={handleDeleteClick}
      />

      <AplikasiForm isOpen={isFormOpen} editingItem={editingItem} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
      <DeleteModal
        target={deleteTarget}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <NotifContainer notifs={notifs} />
    </div>
  );
}

export default App;