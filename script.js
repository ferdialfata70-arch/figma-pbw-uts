// ===============================
// NAVIGASI HALAMAN
// ===============================

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  // Update menu aktif
  const menus = document.querySelectorAll(".menu");

  menus.forEach((menu) => {
    menu.classList.remove("active");
  });

  menus.forEach((menu) => {
    if (menu.getAttribute("onclick")?.includes(pageId)) {
      menu.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ===============================
// NOTIFICATION
// ===============================

function showNotification() {
  showToast("Tidak ada notifikasi baru.");
}

// ===============================
// TOAST
// ===============================

function showToast(message) {
  const toast = document.getElementById("toast");
  const text = document.getElementById("toastText");

  text.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ===============================
// PILIH LAYANAN
// ===============================

function selectService(service) {
  showPage("booking");

  setTimeout(() => {
    document.getElementById("jenis").value = service;
  }, 200);
}

// ===============================
// FORM BOOKING
// ===============================

document.getElementById("bookingForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();

  const hp = document.getElementById("hp").value.trim();

  const plat = document.getElementById("plat").value.trim();

  const kendaraan = document.getElementById("kendaraan").value.trim();

  const jenis = document.getElementById("jenis").value;

  const tanggal = document.getElementById("tanggal").value;

  const jam = document.getElementById("jam").value;

  if (nama === "" || hp === "" || plat === "" || kendaraan === "" || jenis === "" || tanggal === "" || jam === "") {
    showToast("Lengkapi data booking terlebih dahulu.");

    return;
  }

  showToast("Booking berhasil dibuat!");

  setTimeout(() => {
    showPage("riwayat");
  }, 700);

  this.reset();
});

// ===============================
// ADMIN - APPROVE
// ===============================

function approveBooking(button) {
  const row = button.closest("tr");

  const status = row.querySelector(".badge");

  status.textContent = "Diproses";

  status.className = "badge process";

  button.textContent = "Detail";

  button.onclick = function () {
    showPage("detail");
  };

  showToast("Booking berhasil disetujui.");
}

// ===============================
// TAMBAH PAKET
// ===============================

function addPackage() {
  const nama = prompt("Masukkan nama paket servis:");

  if (!nama) return;

  const harga = prompt("Masukkan harga paket:");

  if (!harga) return;

  const waktu = prompt("Masukkan estimasi waktu:");

  if (!waktu) return;

  const table = document.querySelector("#packageTable tbody");

  const row = table.insertRow();

  const nomor = table.rows.length;

  row.innerHTML = `

        <td>
            ${String(nomor).padStart(2, "0")}
        </td>

        <td>
            <b>${nama}</b>
            <small>Paket servis AutoCare</small>
        </td>

        <td>
            <b>Rp${harga}</b>
        </td>

        <td>
            ${waktu}
        </td>

        <td>
            <span class="badge done">
                Aktif
            </span>
        </td>

        <td>

            <button
                class="edit-btn"
                onclick="editPackage(this)"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deletePackage(this)"
            >
                Hapus
            </button>

        </td>

    `;

  showToast("Paket servis berhasil ditambahkan.");
}

// ===============================
// EDIT PAKET
// ===============================

function editPackage(button) {
  const row = button.closest("tr");

  const oldName = row.cells[1].querySelector("b").textContent;

  const oldPrice = row.cells[2].textContent.replace("Rp", "");

  const oldTime = row.cells[3].textContent;

  const newName = prompt("Ubah nama paket:", oldName);

  if (!newName) return;

  const newPrice = prompt("Ubah harga:", oldPrice);

  if (!newPrice) return;

  const newTime = prompt("Ubah estimasi waktu:", oldTime);

  if (!newTime) return;

  row.cells[1].querySelector("b").textContent = newName;

  row.cells[2].querySelector("b").textContent = "Rp" + newPrice;

  row.cells[3].textContent = newTime;

  showToast("Paket berhasil diperbarui.");
}

// ===============================
// HAPUS PAKET
// ===============================

function deletePackage(button) {
  const row = button.closest("tr");

  const name = row.cells[1].querySelector("b").textContent;

  const confirmDelete = confirm("Hapus paket " + name + "?");

  if (confirmDelete) {
    row.remove();

    showToast("Paket berhasil dihapus.");
  }
}

// ===============================
// MEKANIK - MULAI SERVIS
// ===============================

function startService(button) {
  const task = button.closest(".mechanic-task");

  const badge = task.querySelector(".badge");

  badge.textContent = "Diproses";

  badge.className = "badge process";

  button.textContent = "Selesaikan";

  button.onclick = function () {
    finishService(this);
  };

  showToast("Servis berhasil dimulai.");
}

// ===============================
// MEKANIK - SELESAI
// ===============================

function finishService(button) {
  const task = button.closest(".mechanic-task");

  const badge = task.querySelector(".badge");

  badge.textContent = "Selesai";

  badge.className = "badge done";

  button.textContent = "✓ Selesai";

  button.disabled = true;

  showToast("Servis berhasil diselesaikan.");
}

// ===============================
// DETAIL SERVIS
// ===============================

function serviceStarted() {
  const status = document.querySelector("#detail .detail-top .badge");

  status.textContent = "Sedang Diproses";

  status.className = "badge process";

  document.querySelectorAll(".timeline-item")[1].classList.add("completed");

  showToast("Servis telah dimulai.");
}

// ===============================
// SELESAIKAN SERVIS DETAIL
// ===============================

function serviceFinished() {
  const status = document.querySelector("#detail .detail-top .badge");

  status.textContent = "Selesai";

  status.className = "badge done";

  document.querySelectorAll(".timeline-item")[2].classList.add("completed");

  showToast("Servis berhasil diselesaikan.");
}
