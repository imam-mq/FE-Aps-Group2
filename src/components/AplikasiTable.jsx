export function AplikasiTable({ items, currentPage, totalPages, totalData, startIndex, endIndex, onPrev, onNext, onEdit, onDelete  }) {
    return(
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-white rounded-xl shadow overflow-hidden">
                            <th className="text-left px-3 py-2.5">Nama Aplikasi</th>
                            <th className="text-left px-3 py-2.5">URL/Link</th>
                            <th className="text-left px-3 py-2.5">User Login</th>
                            <th className="text-left px-3 py-2.5">Password</th>
                            <th className="text-left px-3 py-2.5">Lokasi Server</th>
                            <th className="text-left px-3 py-2.5">Lokasi Database</th>
                            <th className="text-left px-3 py-2.5">Layanan</th>
                            <th className="text-left px-3 py-2.5">Koneksi</th>
                            <th className="text-left px-3 py-2.5">Skala</th>
                            <th className="text-left px-3 py-2.5">Is Active</th>
                            <th className="text-left px-3 py-2.5">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.namaAplikasi}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                {item.urlLink ? (
                                    <a href={item.urlLink} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                                    {item.urlLink}
                                    </a>
                                ) : "-"}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.userLogin || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.passwordLogin || "•••••"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.lokasiServer || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.lokasiDatabase || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.layanan || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.koneksi || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">{item.skala || "-"}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-green-500" : "bg-red-500"}`} />
                                    {item.isActive ? "Aktif" : "Nonaktif"}
                                </span>
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap space-x-1">
                                <button
                                    onClick={() => onEdit(item.id)}
                                    className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 text-amber-800 hover:bg-amber-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(item)}
                                    className="px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                                >
                                    Hapus
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">Belum ada data.</div>
                )}
            </div>

            <div className="flex items-center justify-end gap-8 px-6 py-4 border-t border-gray-100 text-sm text-gray-600">
                <span>
                    {totalData === 0 ? "0-0 dari 0" : `${startIndex + 1}-${endIndex} dari ${totalData} data`}
                </span>
                <div className="flex gap-4">
                    <button onClick={onPrev} disabled={currentPage === 1} className="disabled:text-gray-300 text-gray-500 hover:text-gray-900">
                        ❮
                    </button>
                    <button onClick={onNext} disabled={currentPage === totalPages} className="disabled:text-gray-300 text-gray-500 hover:text-gray-900">
                        ❯
                    </button>
                </div>
            </div>
        </div>
    );
}