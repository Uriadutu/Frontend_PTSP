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
import DataUmatKristenPage from "./pages/PaludiPage/DataUmatKristenPage.jsx";
import DetailUmatKristenPage from "./pages/PaludiPage/DetailUmatKristenPage.jsx";
import DataGerejaPage from "./pages/PaludiPage/DataGerejaPage.jsx";
import DetailGerejaPage from "./pages/PaludiPage/DetailGerejaPage.jsx";
import DataGuruPakPage from "./pages/PaludiPage/SekolahKristenPage/DataGuruPakPage.jsx";
import DataOrganisasiKristenPage from "./pages/PaludiPage/DataOrganisasiKristenPage.jsx";
import DataLembagaKristenPage from "./pages/PaludiPage/DataLembagaKristenPage.jsx";
import ListSekolahKristenPage from "./pages/PaludiPage/SekolahKristenPage/ListSekolahKristenPage.jsx";
import DetailSekolahKristenPage from "./pages/PaludiPage/SekolahKristenPage/DetailSekolahKristenPage.jsx";
import DetailGuruPakPage from "./pages/PaludiPage/SekolahKristenPage/DetailGuruKristenPage.jsx";
import DataGuruPaludiPage from "./pages/PaludiPage/DataGuruPaludiPage.jsx";
import DataPenyuluPage from "./pages/PaludiPage/DataPenyuluPage.jsx";
import DetailPenyuluPage from "./pages/PaludiPage/DetailPenyuluPage.jsx";
import DetailZakatPage from "./pages/SahuPage/DetailZakatPage.jsx";
import DetailLembagaKristenPage from "./pages/PaludiPage/DetailLembagaKristenPage.jsx";
import DetailLayananPengaduanPage from "./pages/DetailLayananPengaduanPage.jsx";
import DataSekolahMingguPage from "./pages/PaludiPage/DataSekolahMingguPage.jsx";
import PelayanGerejaPage from "./pages/PaludiPage/PelayanGerejaPage.jsx";
import DetailPelayanGerejaPage from "./pages/PaludiPage/DetailPelayanGerejaPage.jsx";
import PenyuluhIslamPage from "./pages/SariaPage/PenyuluhIslamPage.jsx";
import DetailPenyuluhIslamPage from "./pages/SariaPage/DetialPenyuluhIslamPage.jsx";
import PetaKepengawasanPage from "./pages/SidikaPage/PetaKepengawasanPage.jsx";
import DataTpqPage from "./pages/SariaPage/DataTpqPage.jsx";
import DataPenghuluPage from "./pages/SariaPage/DataPenghuluPage.jsx";
import AkademikPage from "./pages/SidikaPage/AkademikPage.jsx";
import MenejerialPage from "./pages/SidikaPage/MenejerialPage.jsx";


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
            path="/saria/data-taman-pendidikan-quran"
            element={<DataTpqPage />}
          />
          <Route
            path="/saria/data-penyuluh"
            element={<PenyuluhIslamPage />}
          />
          <Route
            path="/saria/data-penyuluh/detail/:id"
            element={<DetailPenyuluhIslamPage />}
          />
          <Route
            path="/saria/data-penghulu"
            element={<DataPenghuluPage />}
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
          <Route
            path="/:sub/data-sekolah-paludi/:jenjang/:status"
            element={<ListSekolahKristenPage />}
          />
          <Route
            path="/paludi/sekolah/kristen/detail/:id"
            element={<DetailSekolahKristenPage />}
          />
          <Route
            path="/paludi/sekolah/:namasekolah/:jenjang/guru/:idsekolah"
            element={<DataGuruPakPage />}
          />
          <Route
            path="/paludi/data-guru-pak/detail-guru-pak/:id"
            element={<DetailGuruPakPage />}
          />
          <Route
            path="/paludi/data-guru-pak"
            element={<DataGuruPaludiPage />}
          />
          <Route
            path="/:sub/data-umat-kristen"
            element={<DataUmatKristenPage />}
          />
          <Route
            path="/paludi/data-umat-kristen/detail/:id"
            element={<DetailUmatKristenPage />}
          />
          <Route path="/paludi/data-gereja/" element={<DataGerejaPage />} />
          <Route path="paludi/data-penyuluh" element={<DataPenyuluPage />} />
          <Route
            path="paludi/data-penyulu/detail/:id"
            element={<DetailPenyuluPage />}
          />
          <Route
            path="/paludi/data-gereja/detail/:id"
            element={<DetailGerejaPage />}
          />
          <Route
            path="/paludi/data-sekolah-minggu/"
            element={<DataSekolahMingguPage />}
          />
          <Route
            path="/paludi/data-pelayan-gereja/"
            element={<PelayanGerejaPage />}
          />
          <Route
            path="/paludi/data-pelayan-gereja/detail/:id"
            element={<DetailPelayanGerejaPage />}
          />
          <Route
            path="/paludi/data-organisasi-masyarakat/"
            element={<DataOrganisasiKristenPage />}
          />
          <Route
            path="/paludi/data-lembaga-keagamaan/"
            element={<DataLembagaKristenPage />}
          />
          <Route
            path="/paludi/data-lembaga-kristen/detail/:id"
            element={<DetailLembagaKristenPage />}
          />

          {/* Sahu */}

          <Route path="/:sub/data-kecamatan" element={<DataKecamatanPage />} />
          <Route
            path="/:sub/data-penerima-penyaluran-zakat"
            element={<DataPenerimaZakatPage />}
          />
          <Route
            path="/sahu/data-penerima-penyaluran-zakat/detail-zakat/:id"
            element={<DetailZakatPage />}
          />
          <Route
            path="/:sub/data-tanah-wakaf"
            element={<DataTanahWakafPage />}
          />

          {/* Sidika */}
          <Route
            path="/sidika/peta-kepengawasan"
            element={<PetaKepengawasanPage />}
          />
          <Route
            path="/sidika/data-pendampingan-akademik"
            element={<AkademikPage />}
          />
          <Route
            path="/sidika/data-pendampingan-menejerial"
            element={<MenejerialPage />}
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
          <Route
            path="/layanan-pengaduan/detail/:id"
            element={<DetailLayananPengaduanPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
