import { useEffect, useState } from "react";
import { useAplikasiData } from "../hooks/useAplikasiData";
import { useNotif } from "../hooks/useNotif";
import { SearchBar } from "../components/SearchBar";
import { AplikasiTable } from "../components/AplikasiTable";
import { AplikasiForm } from "../components/AplikasiForm";
import { NotifContainer } from "../components/NotifContainer";
import { DeleteModal } from "../components/DeleteModal";
import { socket } from "../api/socket";

const ROWS_PER_PAGE = 10;

export function AplikasiPage() {
  const { data, meta, loadData, addData, updateData, deleteData } = useAplikasiData();
  const { notifs, showNotif } = useNotif();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // pencarian berubah: kembali ke halaman 1
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  // ambil data dari backend setiap halaman atau kata kunci berubah
  useEffect(() => {
    loadData({ page: currentPage, limit: ROWS_PER_PAGE, search: searchTerm });
  }, [loadData, currentPage, searchTerm]);

  // halaman saat ini melebihi total (mis. setelah menghapus data terakhir di halaman itu)
  useEffect(() => {
    if (meta.totalPages > 0 && currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [meta.totalPages, currentPage]);

  useEffect(() => {
    socket.connect();
    const handleChanged = () => {
      loadData();
    };

    socket.on("aplikasi:changed", handleChanged);
    return () => {
      socket.off("aplikasi:changed", handleChanged);
      socket.disconnect();
    };
  }, [loadData]);

  const page = currentPage;
  const totalPages = Math.max(1, meta.totalPages);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + data.length;

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

  const handleDeleteClick = (item) => setDeleteTarget(item);
  const handleDeleteCancel = () => setDeleteTarget(null);

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      try {
        await deleteData(deleteTarget.id);
        showNotif("Data Berhasil Dihapus", "success");
        setDeleteTarget(null);
      } catch (err) {
        showNotif(err.message, "error")
      }
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Data Aplikasi</h1>
          <p className="text-sm text-gray-500">Kelola data aplikasi Group 2</p>
        </div>
        <button onClick={handleAddClick} className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700">
          Tambah Data Aplikasi
        </button>
      </header>

      <div className="mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <AplikasiTable
        items={data} currentPage={page} totalPages={totalPages}
        totalData={meta.total} startIndex={startIndex} endIndex={endIndex}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        onEdit={handleEditClick} onDelete={handleDeleteClick}
      />

      <AplikasiForm isOpen={isFormOpen} editingItem={editingItem} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
      <DeleteModal target={deleteTarget} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
      <NotifContainer notifs={notifs} />
    </>
  );
}