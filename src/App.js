import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import DataSekolahPage from "./pages/PantaiDisaPage/DataSekolahPage";
import DataGuruPage from "./pages/PantaiDisaPage/DataGuruPage";
import DataSiswaPage from "./pages/PantaiDisaPage/DataSiswaPage";
import DataSatuanKerjaPage from "./pages/LapasiPages/DataSatuanKerjaPage";
import DataPegawaiPage from "./pages/LapasiPages/DataPegawaiPage";
import DataJabatanPage from "./pages/LapasiPages/DataJabatanPage";
import SuratMasukPage from "./pages/SuratPage/SuratMasukPage";
import SuratKeluarPage from "./pages/SuratPage/SuratKeluarPage";
import DataHajiPage from "./pages/AkesahuPage/DataHajiPage";
import InfoHajiPage from "./pages/AkesahuPage/InfoHajiPage";
import DataUmatPage from "./pages/SariaPage/DataUmatPage";
import MasjidPage from "./pages/SariaPage/MasjidPage";
import MajelisTalimPage from "./pages/SariaPage/MajelisTalimPage";
import OrganisasiMasyarakatPage from "./pages/SariaPage/OrganisasiMasyarakatPage";
import LembagaKeagamaanPage from "./pages/SariaPage/LembagaKeagamaanPage";
import KuaPage from "./pages/SariaPage/KuaPage";
import DataKecamatanPage from "./pages/SahuPage/DataKecamatanPage";
import DataPenerimaZakatPage from "./pages/SahuPage/DataPenerimaZakatPage";
import DataTanahWakafPage from "./pages/SahuPage/DataTanahWakafPage";
import LayananPengaduanPage from "./pages/LayananPengaduanPage";
import DetailSuratMasukPage from "./pages/SuratPage/DetailSuratMasukPage";
import ListSekolahPage from "./pages/PantaiDisaPage/sekolahPage/ListSekolahPage";
import DetailSuratKeluarPage from "./pages/SuratPage/DetailSuratKeluarPage";
import DetailDataHajiPage from "./pages/AkesahuPage/DetailDataHajiPage";
import DetailPegawaiPage from "./pages/LapasiPages/DetailPegawaiPage";
import ListGuruPage from "./pages/PantaiDisaPage/sekolahPage/ListGuruPage ";
import ListSiswaPage from "./pages/PantaiDisaPage/sekolahPage/ListSiswaPage";
import DetailSekolahPage from "./pages/PantaiDisaPage/DetailSekolahPage.jsx";
import DetailGuruPage from "./pages/PantaiDisaPage/sekolahPage/DetailGuruPage.jsx";
import DetailSiswaPage from "./pages/PantaiDisaPage/sekolahPage/DetailSiswaPage.jsx";
import DetailMasjidPage from "./pages/SariaPage/DetialMasjidPage.jsx";
import DetailLembagaKeagamaanPage from "./pages/SariaPage/DetailLembagaKeagamaanPage.jsx";
import DataSekolahKristenPage from "./pages/PaludiPage/DataSekolahKristenPage.jsx";
import HakAksesPage from "./pages/HakAksesPage.jsx";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/manajemen-akun" element={<HakAksesPage />} />
          {/* Lapasi */}
          <Route
            path="/:sub/data-satuan-kerja"
            element={<DataSatuanKerjaPage />}
          />
          <Route path="/:sub/data-jabatan" element={<DataJabatanPage />} />
          <Route path="/:sub/data-pegawai" element={<DataPegawaiPage />} />
          <Route
            path="/:sub/data-pegawai/detail-pegawai/:id"
            element={<DetailPegawaiPage />}
          />
          {/* Pantai Disa */}
          <Route
            path="/pantai-disa/data-sekolah"
            element={<DataSekolahPage />}
          />
          <Route
            path="/pantai-disa/sekolah/detail/:id"
            element={<DetailSekolahPage />}
          />
          <Route
            path="/pantai-disa/sekolah/:namasekolah/:jenjang/guru/:idsekolah"
            element={<ListGuruPage />}
          />
          <Route
            path="/pantai-disa/sekolah/:namasekolah/:jenjang/siswa/:idsekolah"
            element={<ListSiswaPage />}
          />
          <Route
            path="/:sub/data-sekolah/:jenjang/:status"
            element={<ListSekolahPage />}
          />
          <Route path="/:sub/data-guru" element={<DataGuruPage />} />
          <Route
            path="/lapasi/data-guru/detail-guru/:id"
            element={<DetailGuruPage />}
          />
          <Route
            path="/lapasi/data-siswa/detail-siswa/:id"
            element={<DetailSiswaPage />}
          />
          <Route path="/:sub/data-siswa" element={<DataSiswaPage />} />
          {/* Akesahu */}
          <Route path="/:sub/data-haji" element={<DataHajiPage />} />
          <Route
            path="/:sub/data-haji/detail/:id"
            element={<DetailDataHajiPage />}
          />
          <Route path="/:sub/info-haji" element={<InfoHajiPage />} />
          {/* Saria */}
          <Route path="/:sub/data-umat" element={<DataUmatPage />} />
          <Route path="/:sub/data-masjid" element={<MasjidPage />} />
          <Route
            path="/:sub/masjid/detail/:id"
            element={<DetailMasjidPage />}
          />
          <Route
            path="/:sub/data-majelis-ta'lim"
            element={<MajelisTalimPage />}
          />
          <Route
            path="/:sub/data-organisasi-masyarakat"
            element={<OrganisasiMasyarakatPage />}
          />
          <Route
            path="/:sub/data-lembaga-keagamaan"
            element={<LembagaKeagamaanPage />}
          />
          <Route
            path="/:sub/lembaga-keagamaan/detail/:id"
            element={<DetailLembagaKeagamaanPage />}
          />
          <Route path="/:sub/data-kua" element={<KuaPage />} />

          {/* Paludi*/}
          <Route
            path="/:sub/data-sekolah-paludi"
            element={<DataSekolahKristenPage />}
          />

          {/* Sahu */}

          <Route path="/:sub/data-kecamatan" element={<DataKecamatanPage />} />
          <Route
            path="/:sub/data-penerima-penyaluran-zakat"
            element={<DataPenerimaZakatPage />}
          />
          <Route
            path="/:sub/data-tanah-wakaf"
            element={<DataTanahWakafPage />}
          />

          {/* Surat-surat */}
          <Route path="/:sub/surat-masuk" element={<SuratMasukPage />} />
          <Route
            path="/:sub/surat-masuk/detail/:id"
            element={<DetailSuratMasukPage />}
          />
          <Route
            path="/:sub/surat-keluar/detail/:id"
            element={<DetailSuratKeluarPage />}
          />
          <Route path="/:sub/surat-keluar" element={<SuratKeluarPage />} />
          <Route path="/layanan-pengaduan" element={<LayananPengaduanPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
