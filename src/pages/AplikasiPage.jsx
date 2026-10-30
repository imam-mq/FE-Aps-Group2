import { useEffect, useState } from "react";
import { useAplikasiData } from "../hooks/useAplikasiData";
import { useNotif } from "../hooks/useNotif";
import { FilterBar } from "../components/FilterBar";
import { AplikasiTable } from "../components/AplikasiTable";
import { AplikasiForm } from "../components/AplikasiForm";
import { NotifContainer } from "../components/NotifContainer";
import { DeleteModal } from "../components/DeleteModal";
import { Button } from "../ui";
import { socket } from "../api/socket";

const ROWS_PER_PAGE = 10;
const EMPTY_FILTERS = { search: "", layanan: "", koneksi: "", skala: "" };

function clampPage(result) {
  return (p) => (result && result.meta.totalPages > 0 ? Math.min(p, result.meta.totalPages) : p);
}

export function AplikasiPage() {
  const { data, meta, loadData, addData, updateData, deleteData } = useAplikasiData();
  const { notifs, showNotif } = useNotif();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ambil data dari backend setiap halaman atau filter berubah
  useEffect(() => {
    loadData({ page: currentPage, limit: ROWS_PER_PAGE, ...filters })
      .then((result) => setCurrentPage(clampPage(result)));
  }, [loadData, currentPage, filters]);

  useEffect(() => {
    socket.connect();
    const handleChanged = () => {
      loadData().then((result) => setCurrentPage(clampPage(result)));
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

  // filter atau pencarian berubah: kembali ke halaman 1
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters(EMPTY_FILTERS);
    setCurrentPage(1);
  };

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
        const result = await deleteData(deleteTarget.id);
        setCurrentPage(clampPage(result));
        showNotif("Data Berhasil Dihapus", "success");
        setDeleteTarget(null);
      } catch (err) {
        showNotif(err.message, "error")
      }
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Aplikasi</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola data integrasi dan konfigurasi server Group 2</p>
        </div>
        <Button onClick={handleAddClick}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Tambah Data Aplikasi
        </Button>
      </header>

      <FilterBar filters={filters} onChange={handleFilterChange} onReset={handleFilterReset} />

      <AplikasiTable
        items={data} currentPage={page} totalPages={totalPages}
        totalData={meta.total} startIndex={startIndex} endIndex={endIndex}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        onEdit={handleEditClick} onDelete={handleDeleteClick}
      />

      {isFormOpen && (
        <AplikasiForm editingItem={editingItem} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />
      )}
      <DeleteModal target={deleteTarget} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
      <NotifContainer notifs={notifs} />
    </>
  );
}