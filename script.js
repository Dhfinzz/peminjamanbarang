// Fungsi untuk menambah data peminjaman ke tabel
function tampilkanPeminjaman() {
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];
    const tabel = document.getElementById('daftar-peminjaman').getElementsByTagName('tbody')[0];
    tabel.innerHTML = ''; // Bersihkan tabel sebelum menambah data baru

    peminjamanList.forEach((peminjaman) => {
        const row = tabel.insertRow();
        row.innerHTML = `
            <td>${peminjaman.id_siswa}</td>
            <td>${peminjaman.nama_siswa}</td>
            <td>${peminjaman.barang}</td>
            <td>${peminjaman.jumlah}</td>
            <td>${peminjaman.tgl_pinjam}</td>
            <td>${peminjaman.tgl_kembali}</td>
        `;
    });
}

// Fungsi untuk menangani submit form
document.getElementById('pinjamForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form submit biasa

    const id_siswa = document.getElementById('id_siswa').value;
    const nama_siswa = document.getElementById('nama_siswa').value;
    const barang = document.getElementById('barang').value;
    const jumlah = document.getElementById('jumlah').value;

    // Ambil tanggal dan jam pinjam dari input datetime-local
    const tgl_pinjam = document.getElementById('tgl_pinjam').value;
    const tgl_kembali = document.getElementById('tgl_kembali').value;

    // Membuat objek peminjaman baru
    const peminjamanBaru = {
        id_siswa,
        nama_siswa,
        barang,
        jumlah,
        tgl_pinjam,  // Simpan tanggal dan waktu peminjaman
        tgl_kembali  // Simpan tanggal dan waktu pengembalian
    };

    // Ambil data peminjaman dari localStorage
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];

    // Tambahkan peminjaman baru ke array
    peminjamanList.push(peminjamanBaru);

    // Simpan kembali ke localStorage
    localStorage.setItem('peminjaman', JSON.stringify(peminjamanList));

    // Tampilkan data peminjaman yang terbaru
    tampilkanPeminjaman();

    // Reset form
    document.getElementById('pinjamForm').reset();
});

// Panggil fungsi untuk menampilkan data peminjaman saat halaman dimuat
window.onload = tampilkanPeminjaman;
// Menambahkan data barang dengan jumlah stok
const barangList = [
    { nama: 'Laptop', stok: 10 },
    { nama: 'Proyektor', stok: 5 },
    { nama: 'Meja', stok: 15 }
];

// Simpan barangList ke localStorage (jika belum ada)
if (!localStorage.getItem('barang')) {
    localStorage.setItem('barang', JSON.stringify(barangList));
}
// Fungsi untuk menampilkan daftar barang yang tersedia
function tampilkanBarang() {
    const barangList = JSON.parse(localStorage.getItem('barang')) || [];
    const tabel = document.getElementById('daftar-barang').getElementsByTagName('tbody')[0];
    tabel.innerHTML = ''; // Bersihkan tabel sebelum menambah data baru

    barangList.forEach((barang) => {
        const row = tabel.insertRow();
        row.innerHTML = `
            <td>${barang.nama}</td>
            <td>${barang.stok}</td>
        `;
    });

    // Tampilkan barang di dropdown form peminjaman
    const dropdownBarang = document.getElementById('barang');
    dropdownBarang.innerHTML = '';  // Kosongkan dropdown
    barangList.forEach((barang) => {
        const option = document.createElement('option');
        option.value = barang.nama;
        option.textContent = `${barang.nama} - Stok: ${barang.stok}`;
        dropdownBarang.appendChild(option);
    });
}

// Panggil fungsi untuk menampilkan daftar barang saat halaman dimuat
window.onload = tampilkanBarang;
document.getElementById('pinjamForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form submit biasa

    const barangDipilih = document.getElementById('barang').value;
    const jumlahPinjam = parseInt(document.getElementById('jumlah').value, 10);
    const tgl_pinjam = document.getElementById('tgl_pinjam').value;
    const tgl_kembali = document.getElementById('tgl_kembali').value;

    // Ambil data barang dari localStorage
    const barangList = JSON.parse(localStorage.getItem('barang')) || [];

    // Temukan barang yang dipilih
    const barang = barangList.find(b => b.nama === barangDipilih);

    // Cek apakah stok cukup
    if (barang && barang.stok >= jumlahPinjam) {
        // Kurangi stok barang
        barang.stok -= jumlahPinjam;

        // Simpan kembali data barang yang sudah diperbarui ke localStorage
        localStorage.setItem('barang', JSON.stringify(barangList));

        // Buat data peminjaman baru
        const peminjamanBaru = {
            barang: barangDipilih,
            jumlah: jumlahPinjam,
            tgl_pinjam,
            tgl_kembali
        };

        // Ambil data peminjaman yang sudah ada dari localStorage
        const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];

        // Tambahkan peminjaman baru ke list
        peminjamanList.push(peminjamanBaru);

        // Simpan data peminjaman yang sudah diperbarui ke localStorage
        localStorage.setItem('peminjaman', JSON.stringify(peminjamanList));

        // Tampilkan data peminjaman dan barang yang sudah diperbarui
        tampilkanBarang();
        tampilkanPeminjaman();
        alert('Barang berhasil dipinjam!');
    } else {
        alert('Stok barang tidak cukup!');
    }

    // Reset form
    document.getElementById('pinjamForm').reset();
});
// Fungsi untuk menampilkan data peminjaman di tabel
function tampilkanPeminjaman() {
    const peminjamanList = JSON.parse(localStorage.getItem('peminjaman')) || [];
    const tabel = document.getElementById('daftar-peminjaman').getElementsByTagName('tbody')[0];
    tabel.innerHTML = ''; // Bersihkan tabel sebelum menambah data baru

    peminjamanList.forEach((peminjaman) => {
        const row = tabel.insertRow();
        row.innerHTML = `
            <td>${peminjaman.id_siswa}</td>
            <td>${peminjaman.nama_siswa}</td>
            <td>${peminjaman.barang}</td>
            <td>${peminjaman.jumlah}</td>
            <td>${peminjaman.tgl_pinjam}</td>
            <td>${peminjaman.tgl_kembali}</td>
        `;
    });
}
