// NEUROQUEST XI - MIXED MODE (100 Levels) - Complete Version with Extended Questions

// Game State
let gameState = {
  currentChapter: 1,
  currentLevel: 1,
  currentStage: 1,
  score: 0,
  lives: 3,
  correctAnswers: 0,
  wrongAnswers: 0,
  stageCorrect: [false, false, false, false],
  hintsUsed: 0,
  maxHints: 2,
  startTime: 0,
  chapterProgress: Array(10).fill(0),
  levelStars: {}
};

// Chapter Info
const chapterInfo = {
  1: { n: "📈 Grafik & Energi", c: "#ff6b6b" },
  2: { n: "🌡️ Reaksi & Suhu", c: "#4ecdc4" },
  3: { n: "💨 Tekanan & Sistem", c: "#a8e6cf" },
  4: { n: "⚖️ Kesetimbangan", c: "#dda0dd" },
  5: { n: "🧬 Sel & Metabolisme", c: "#ffd93d" },
  6: { n: "⚡ Listrik & Magnet", c: "#6bcb77" },
  7: { n: "🌊 Gelombang & Optik", c: "#4d96ff" },
  8: { n: "🔬 Kimia Organik", c: "#ff6b9d" },
  9: { n: "🌍 Ekosistem", c: "#c9e265" },
  10: { n: "🚀 Fisika Modern", c: "#ff8c42" }
};

// Questions Database - Extended Version
const qdb = {
  1: [ // Chapter 1 - Grafik & Energi (40 questions - 10 levels)
    [{ s: "MTK", q: "Benda bergerak dengan kecepatan 10→30 m/s dalam 4 s. Percepatan?", o: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"], e: 1, ex: "a = (30-10)/4 = 5 m/s²", h: "a = Δv/Δt" },
    { s: "Fisika", q: "Grafik v-t garis lurus miring ke atas menunjukkan?", o: ["Percepatan konstan", "Percepatan berubah", "Kecepatan konstan", "Kecepatan berubah"], e: 0, ex: "Garis lurus = percepatan konstan", h: "Lurus = konstan" },
    { s: "MTK", q: "Luas daerah di bawah grafik v-t menunjukkan?", o: ["Percepatan", "Perpindahan", "Kecepatan", "Waktu"], e: 1, ex: "Luas v-t = perpindahan", h: "Ingat: luas grafik" },
    { s: "Logika", q: "Grafik v-t selalu naik ke atas berarti benda?", o: ["Diam", "Dipercepat", "GLB", "Dilambat"], e: 1, ex: "v naik = dipercepat", h: "Naik = kecepatan meningkat" }],
    [{ s: "MTK", q: "Grafik: 0-2s v=10m/s, 2-4s v=20m/s. Perpindahan total?", o: ["30 m", "50 m", "60 m", "80 m"], e: 2, ex: "Luas1 = 10×2=20m, Luas2 = 20×2=40m, Total = 60m", h: "Hitung luas trapesium" },
    { s: "Fisika", q: "Kecepatan dari 20→10 m/s dalam 5s. Percepatan?", o: ["2 m/s²", "-2 m/s²", "6 m/s²", "-6 m/s²"], e: 1, ex: "a = (10-20)/5 = -2 m/s² (perlambatan)", h: "Perlambatan = negatif" },
    { s: "MTK", q: "Grafik a-t untuk GLBB berbentuk?", o: ["Horizontal", "Miring", "Lengkung", "Parabola"], e: 0, ex: "GLBB = percepatan konstan = horizontal", h: "Konstan = horizontal" },
    { s: "Logika", q: "Benda dilempar ke atas, di titik tertinggi EK =?", o: ["Maksimum", "Nol", "Minimum", "Negatif"], e: 1, ex: "v = 0 → EK = 0", h: "v = 0 di puncak" }],
    [{ s: "MTK", q: "Massa 2 kg, v = 5 m/s. Energi kinetik?", o: ["10 J", "25 J", "50 J", "100 J"], e: 1, ex: "EK = ½×2×5² = 25 J", h: "EK = ½mv²" },
    { s: "Fisika", q: "Jika kecepatan 2x semula, EK menjadi?", o: ["2x", "4x", "√2x", "10x"], e: 1, ex: "EK ∝ v² → (2v)² = 4x", h: "EK ∝ v²" },
    { s: "MTK", q: "EP = mgh, jika massa 2x pada h sama?", o: ["Tetap", "2x", "4x", "½x"], e: 1, ex: "EP ∝ m → 2× EP", h: "EP = mgh" },
    { s: "Logika", q: "v ↑ selalu diikuti EK ↑?", o: ["Tidak", "Ya", "Tergantung", "Bisa"], e: 1, ex: "EK = ½mv² → v↑ = EK↑", h: "EK bergantung v²" }],
    [{ s: "MTK", q: "Massa 3 kg, h = 20 m, g = 10. EP =?", o: ["60 J", "300 J", "600 J", "900 J"], e: 2, ex: "EP = 3×10×20 = 600 J", h: "EP = mgh" },
    { s: "Fisika", q: "Planet orbit 4x lebih jauh. Periode =?", o: ["4T", "8T", "16T", "2T"], e: 1, ex: "T²∝r³ → T→8T", h: "T² ∝ r³" },
    { s: "MTK", q: "EM kekal jika?", o: ["Ada gesekan", "Tidak ada gaya luar", "v konstan", "Benda melingkar"], e: 1, ex: "Tanpa gaya disipatif", h: "Tanpa gesekan" },
    { s: "Logika", q: "Mesin tak mungkin 100% efisien karena?", o: ["Gesekan", "Massa berubah", "Waktu", "Usaha nol"], e: 0, ex: "Selalu ada energi hilang", h: "Tidak ideal" }],
    [{ s: "MTK", q: "F = 50 N, s = 4 m. W =?", o: ["12.5 J", "50 J", "200 J", "54 J"], e: 2, ex: "W = 50×4 = 200 J", h: "W = Fs" },
    { s: "Fisika", q: "Usaha positif jika?", o: ["F searah s", "F lawan s", "Benda diam", "Melingkar"], e: 0, ex: "W = F·s·cos0° = positif", h: "Sejajar" },
    { s: "MTK", q: "Grafik a-t menurun menunjukkan?", o: ["a ↑", "a ↓", "a konstan", "a = 0"], e: 1, ex: "Grafik turun = nilai menurun", h: "Turun = menurun" },
    { s: "Logika", q: "Bintang neutron gravitasi besar karena?", o: ["Massa besar", "Volume kecil", "Rotasi", "Tidak ada"], e: 1, ex: "Massa terkompresi → gaya kuat", h: "r sangat kecil" }],
    [{ s: "MTK", q: "W = 1000 J, t = 20 s. P =?", o: ["20 W", "50 W", "100 W", "200 W"], e: 1, ex: "P = 1000/20 = 50 W", h: "P = W/t" },
    { s: "Fisika", q: "η = 80%, Pout = 400 W. Pin =?", o: ["320 W", "500 W", "480 W", "800 W"], e: 1, ex: "0.8 = 400/Pin → Pin = 500 W", h: "η = Pout/Pin" },
    { s: "MTK", q: "P = dW/dt adalah?", o: ["Usaha/waktu", "Usaha/jarak", "Gaya/kecepatan", "Massa/volume"], e: 0, ex: "P = dW/dt", h: "Laju usaha" },
    { s: "Logika", q: "Momentum penting dalam kecelakaan karena?", o: ["Massa besar → p besar", "Mudah dihitung", "p tidak kekal", "Tidak penting"], e: 0, ex: "p = mv", h: "p = mv" }],
    [{ s: "MTK", q: "Massa 2 kg, h = 10 m, g = 10. v =?", o: ["10 m/s", "14 m/s", "20 m/s", "100 m/s"], e: 1, ex: "v = √(2gh) = √200 ≈ 14 m/s", h: "v = √(2gh)" },
    { s: "Fisika", q: "Tumbukan elastik, yang kekal?", o: ["EK saja", "p dan EK", "p saja", "Massa"], e: 1, ex: "Elastik: keduanya kekal", h: "Dua-duanya" },
    { s: "MTK", q: "e = 1 menunjukkan?", o: ["Tidak elastik", "Elastik sempurna", "Diam", "Energi hilang"], e: 1, ex: "e = 1 → sempurna", h: "e = 1" },
    { s: "Logika", q: "Satelit mengorbit karena?", o: ["Roket menyala", "Kecepatan mengimbangi g", "g = 0", "Tidak ada gaya"], e: 1, ex: "v orbit = sentripetal", h: "Kesetimbangan" }],
    [{ s: "MTK", q: "F ∝ 1/r². r → 2r, F menjadi?", o: ["F", "F/2", "F/4", "2F"], e: 2, ex: "F ∝ 1/r² → F/4", h: "1/r²" },
    { s: "Fisika", q: "Gaya gravitasi ∝?", o: ["r", "r²", "1/r", "1/r²"], e: 3, ex: "F = GmM/r²", h: "Inverse square" },
    { s: "MTK", q: "g di dalam planet homogen?", o: ["Konstan", "Menurun linear", "Meningkat", "Nol"], e: 1, ex: "g ∝ r dari pusat", h: "Dalam planet" },
    { s: "Logika", q: "Penemuan Neptunus berdasarkan?", o: ["Pengamatan", "Perhitungan g", "Spektroskopi", "Radio"], e: 1, ex: "Adams & LeVerrier prediksi", h: "Matematika" }],
    [{ s: "MTK", q: "Massa 2 kg, k = 100 N/m, x = 0.1 m. vmax =?", o: ["0.5 m/s", "0.707 m/s", "1 m/s", "2 m/s"], e: 1, ex: "v = √(k/m)×x ≈ 0.707", h: "EK = EP pegas" },
    { s: "Fisika", q: "T pegas tidak bergantung pada?", o: ["m", "k", "A", "m dan k"], e: 2, ex: "T = 2π√(m/k) ≠ f(A)", h: "Tidak A" },
    { s: "MTK", q: "f pegas ∝?", o: ["m", "1/√m", "k", "1/k"], e: 1, ex: "f ∝ √k/√m", h: "1/√m" },
    { s: "Logika", q: "Benda jatuh bebas mengalami a karena?", o: ["Massa", "Gravitasi", "Volume", "Bentuk"], e: 1, ex: "a = g", h: "g = 9.8" }],
    [{ s: "MTK", q: "Planet X orbit 9x lebih jauh. T =?", o: ["9T", "18T", "27T", "3T"], e: 2, ex: "T²∝r³ → T = √729 = 27T", h: "T² ∝ r³" },
    { s: "Fisika", q: "Momentum p = mv. Satuan SI?", o: ["kg·m/s", "kg·m²/s", "N·m", "J"], e: 0, ex: "p = mv → kg·m/s", h: "Massa × kecepatan" },
    { s: "MTK", q: "T di pusat Bumi?", o: ["Maks", "Nol", "Konstan", "Berubah"], e: 1, ex: "g = 0 di pusat", h: "Di pusat" },
    { s: "Logika", q: "Hukum Kepler menjelaskan?", o: ["Gravitasi", "Orbit planet", "Gerak", "Semua"], e: 1, ex: "T²∝r³ orbit", h: "Planet bergerak" }],
    // Extra questions for Level 9-10
    [{ s: "MTK", q: "Benda 5 kg, v = 4 m/s. Momentum = ?", o: ["20 kg·m/s", "9 kg·m/s", "1.25 kg·m/s", "40 kg·m/s"], e: 0, ex: "p = 5×4 = 20 kg·m/s", h: "p = mv" },
    { s: "Fisika", q: "Usaha terbesar jika sudut antara F dan s?", o: ["0°", "45°", "90°", "180°"], e: 0, ex: "cos 0° = 1", h: "Sejajar" },
    { s: "MTK", q: "Gaya gesek kinetik umumnya?", o: ["> statik", "< statik", "= statik", "Nol"], e: 1, ex: "Fk < Fs", h: "Bergerak" },
    { s: "Logika", q: "Roket bekerja berdasarkan prinsip?", o: ["Archimedes", "Newton III", "Pascal", "Bernoulli"], e: 1, ex: "Aksi-reaksi", h: "Newton" }],
    [{ s: "MTK", q: "F = 20 N, m = 2 kg. a = ?", o: ["40 m/s²", "10 m/s²", "22 m/s²", "18 m/s²"], e: 1, ex: "a = F/m = 20/2 = 10", h: "F/m" },
    { s: "Fisika", q: "Gaya normal pada bidang datar dengan massa m?", o: ["mg", "mg sinθ", "mg cosθ", "0"], e: 0, ex: "N = mg pada datar", h: "mg" },
    { s: "MTK", q: "Hubungan periode T dan frekuensi f?", o: ["T = f", "T = 1/f", "Tf = 1", "T = f/2"], e: 1, ex: "T = 1/f", h: "Kebalikan" },
    { s: "Logika", q: "Mengapa parasut memperlambat?", o: ["Massa ↑", "Luas permukaan ↑", "Gravitasi ↓", "Gaya N"], e: 1, ex: "Gaya gesek ∝ luas", h: "Gesekan" }]
  ],
  2: [ // Chapter 2 - Reaksi & Suhu (40 questions - 10 levels)
    [{ s: "Kimia", q: "Glukosa + O₂ → CO₂ + H₂O + Energi. Reaksi?", o: ["Endoterm", "Eksoterm", "Reversibel", "Netral"], e: 1, ex: "Melepas energi", h: "Ada energi di produk" },
    { s: "Biologi", q: "Energi respirasi untuk?", o: ["Turunkan suhu", "Jaga suhu", "Hambat", "Lemak"], e: 1, ex: "Penghangat & metabolisme", h: "Tubuh hangat" },
    { s: "MTK", q: "37°C = ... K", o: ["310 K", "310 K", "373 K", "273 K"], e: 0, ex: "37 + 273 = 310 K", h: "°C + 273" },
    { s: "Logika", q: "Demam >40°C berbahaya karena?", o: ["Enzim baik", "Enzim denaturasi", "Efisien", "Tidak ada"], e: 1, ex: "Enzim rusak >40°C", h: "Rusak" }],
    [{ s: "Kimia", q: "Enzim adalah?", o: ["Reaktan", "Produk", "Katalis", "Inhibitor"], e: 2, ex: "Mempercepat tanpa habis", h: "Biokatalis" },
    { s: "Biologi", q: "Amilase optimal di?", o: ["Perut", "Mulut", "Usus", "Hati"], e: 1, ex: "Di mulut pH~7", h: "Mulut" },
    { s: "MTK", q: "Aktivitas enzim 100% → 42°C (↓20%/°C) >40°C?", o: ["100%", "60%", "40%", "20%"], e: 2, ex: "40→0%, 42→60%", h: "2°C di atas 40" },
    { s: "Logika", q: "Olahraga berat menyebabkan?", o: ["Suhu turun", "Suhu naik", "Tetap", "Bisa turun"], e: 1, ex: "Metabolisme↑ → panas↑", h: "Panas" }],
    [{ s: "Kimia", q: "Denaturasi enzim pada suhu?", o: ["0°C", "37°C", ">40°C", "Apapun"], e: 2, ex: "Rusak >40°C", h: "Suhu tinggi" },
    { s: "Biologi", q: "Pepsin optimal pH?", o: ["7", "2", "9", "12"], e: 1, ex: "Di perut pH~2", h: "Asam" },
    { s: "MTK", q: "Q10 adalah laju pada suhu ...", o: ["Sama", "Beda 10°C", "Beda 1°C", "Beda 0.1°C"], e: 1, ex: "Q10 = k(T+10)/k(T)", h: "10° bedanya" },
    { s: "Logika", q: "Hewan berdarah dingin butuh?", o: ["Matahari", "Oksigen", "Air", "Makanan"], e: 0, ex: "Suhu → lingkungan → berjemur", h: "Mengikuti lingkungan" }],
    [{ s: "Kimia", q: "Homeostasis adalah?", o: ["Perubahan", "Keseimbangan", "Suhu ↑", "Energi ↓"], e: 1, ex: "Menjaga kondisi stabil", h: "Menjaga" },
    { s: "Biologi", q: "Berkeringat untuk?", o: ["Hangatkan", "Dinginkan", "Kuman", "pH"], e: 1, ex: "Evaporasi → pendinginan", h: "Menguap = dingin" },
    { s: "MTK", q: "36-37°C = ... K", o: ["309-310", "36-37", "309-3100", "336-337"], e: 0, ex: "°C + 273", h: "+273" },
    { s: "Logika", q: "Tidur mengurangi metabolisme karena?", o: ["Aktivitas ↓", "Enzim mati", "Tubuh mati", "Otak mati"], e: 0, ex: "Istirahat → energi ↓", h: "Hemat" }],
    [{ s: "Kimia", q: "Respirasi menghasilkan?", o: ["O₂", "CO₂ + energi", "N₂", "H₂"], e: 1, ex: "Glukosa + O₂ → CO₂ + H₂O + E", h: "Menghasilkan CO₂" },
    { s: "Biologi", q: "CO₂ di darah sebagai?", o: ["Gas bebas", "Bikarbonat", "HbCO₂", "Asam karbonat"], e: 1, ex: "CO₂ + H₂O → H₂CO₃ → HCO₃⁻ + H⁺", h: "Plasma" },
    { s: "MTK", q: "Reaksi: A + B → C. [A]×2 → laju×2. Ordo A?", o: ["0", "1", "2", "3"], e: 1, ex: "laju ∝ [A]¹ → orde 1", h: "Pangkat A" },
    { s: "Logika", q: "Hibernasi adalah?", o: ["Aktif", "Hemat energi", "Sakit", "Mati"], e: 1, ex: "Tidur panjang → metabolisme ↓", h: "Musim dingin" }],
    [{ s: "Kimia", q: "Fotosintesis menggunakan?", o: ["CO₂ + cahaya", "O₂ + gelap", "N₂", "Panas"], e: 0, ex: "6CO₂ + 6H₂O + cahaya → C₆H₁₂O₆ + 6O₂", h: "Butuh cahaya" },
    { s: "Biologi", q: "Klorofil di?", o: ["Mitokondria", "Kloroplas", "Ribosom", "Nukleus"], e: 1, ex: "Pigmen fotosintesis", h: "Di daun" },
    { s: "MTK", q: "Laju reaksi ↑2× per ↑10°C (Q10=2). 25→35°C?", o: ["2×", "4×", "6×", "8×"], e: 1, ex: "2×10°C = 2×2 = 4×", h: "2^1 = 2" },
    { s: "Logika", q: "Tanaman gurun menyimpan air karena?", o: ["Air banyak", "Air scarce", "Tidak butuh", "Reproduksi"], e: 1, ex: "Adaptasi → simpan untuk kering", h: "Kekurangan" }],
    [{ s: "Kimia", q: "Fermentasi menghasilkan?", o: ["Asetil-KoA", "As. laktat/etanol", "O₂", "CO₂ saja"], e: 1, ex: "Tanpa O₂ → as. laktat/etanol", h: "Anaerob" },
    { s: "Biologi", q: "Asam laktat saat?", o: ["Aerobic", "Anaerobic", "Fotosintesis", "Transpirasi"], e: 1, ex: "Kurang O₂ → fermentasi", h: "Olahraga berat" },
    { s: "MTK", q: "V gas pd 37°C vs 0°C?", o: ["Sama", "Lebih besar", "Lebih kecil", "½×"], e: 1, ex: "V ∝ T", h: "V/T = konstan" },
    { s: "Logika", q: "Fotosintesis aktif di siang hari karena?", o: ["Cahaya", "CO₂", "Suhu", "Air"], e: 0, ex: "Butuh cahaya sbg energi", h: "Cahaya = energi" }],
    [{ s: "Kimia", q: "Katabolisme adalah?", o: ["Sintesis", "Pemecahan → energi", "Netral", "Protein"], e: 1, ex: "Reaksi pemecahan (energi)", h: "Kata = mecah" },
    { s: "Biologi", q: "Mitokondria berfungsi?", o: ["Protein", "ATP", "Reproduksi", "Detoks"], e: 1, ex: "Powerhouse → ATP", h: "Energi" },
    { s: "MTK", q: "pH = 4, [H⁺] = ?", o: ["10⁻⁴ M", "10⁴ M", "4 M", "10⁻¹⁰ M"], e: 0, ex: "[H⁺] = 10^-pH", h: "10^-pH" },
    { s: "Logika", q: "Mitokondria banyak di otot karena?", o: ["Butuh ATP", "Besar", "Lama", "Mati"], e: 0, ex: "Otot → banyak energi", h: "Kontraksi" }],
    [{ s: "Kimia", q: "Anabolisme membutuhkan?", o: ["Energi", "Oksigen", "Inhibisi", "Dingin"], e: 0, ex: "Sintesis → butuh energi", h: "Membangun" },
    { s: "Biologi", q: "Ribosom untuk?", o: ["Sintesis protein", "Respirasi", "Pencernaan", "Ekskresi"], e: 0, ex: "Tempat sintesis protein", h: "Buat protein" },
    { s: "MTK", q: "1 mol CO₂ = ... g (C=12, O=16)", o: ["28 g", "44 g", "18 g", "60 g"], e: 1, ex: "12 + 2×16 = 44", h: "12 + 32" },
    { s: "Logika", q: "Anabolisme ↔ Katabolisme?", o: ["Sama", "Berlawan", "Tidak ada", "Tergantung"], e: 1, ex: "Anabolisme: sintesis, Katabolisme: pemecahan", h: "Membangun vs memecah" }],
    [{ s: "Kimia", q: "Termoregulasi oleh?", o: ["Hati", "Hipotalamus", "Paru-paru", "Usus"], e: 1, ex: "Di otak", h: "Otak" },
    { s: "Biologi", q: "Menggigil menghasilkan?", o: ["Panas", "Dingin", "Energi", "Keringat"], e: 0, ex: "Kontraksi otot → panas", h: "Menghangatkan" },
    { s: "MTK", q: "pH = 7.4, pOH = ?", o: ["7.4", "6.6", "14", "0"], e: 1, ex: "pOH = 14 - pH = 6.6", h: "14 - pH" },
    { s: "Logika", q: "Dataran tinggi → Hb lebih banyak karena?", o: ["pO₂ ↓", "pO₂ ↑", "Suhu ↑", "Air ↑"], e: 0, ex: "Kompensasi O₂ sedikit", h: "Adaptasi" }],
    // Extra questions for Level 9-10
    [{ s: "Kimia", q: "Reaksi orde 0 memiliki laju?", o: ["Konstan", "Bergantung [A]", "Bergantung suhu", "Nol"], e: 0, ex: "Laju = k (tidak bergantung [A])", h: "Konstan" },
    { s: "Biologi", q: "Detak jantung meningkat saat olahraga untuk?", o: ["Menurunkan suhu", "Mingkatkan O₂", "Menurunkan O₂", "Menjaga homeostasis"], e: 1, ex: "Jantung pump lebih banyak darah-O₂", h: "Oksigen" },
    { s: "MTK", q: "Energi aktivasi adalah energi minimum untuk?", o: ["Menyelesaikan", "Memulai reaksi", "Membentuk produk", "Mengakhiri"], e: 1, ex: "EA = energi minimum bereaksi", h: "Awal" },
    { s: "Logika", q: "Mengapa/kapan enzim sangat aktif?", o: ["Suhu optimal", "pH optimal", "A & B benar", "Tidak aktif"], e: 2, ex: "Kondisi optimal", h: "Optimal" }],
    [{ s: "Kimia", q: "Katalis mempercepat reaksi dengan?", o: ["Menaikkan EA", "Menurunkan EA", "Menambah energi", "Mengubah suhu"], e: 1, ex: "Menurunkan energi aktivasi", h: "Bawah" },
    { s: "Biologi", q: "Mengapa manusia berdarah panas?", o: ["Enzim optimal", "Fleksibilitas", "A & B benar", "Tidak penting"], e: 2, ex: "Tubuh menjaga suhu konstan", h: "Konstan" },
    { s: "MTK", q: "Suhu naik 20°C (Q10=2), laju reaksi menjadi?", o: ["2×", "4×", "20×", "10×"], e: 1, ex: "2×20°C = 2×2 = 4×", h: "2^2" },
    { s: "Logika", q: "Demam ringan dapat membantu karena?", o: ["Enzim lebih aktif", "Kuman mati", "A & B benar", "Tidak ada"], e: 2, ex: "Suhu ↑ = metabolisme kuman ↓", h: "Bantu" }]
  ],
  3: [ // Chapter 3 - Tekanan & Sistem (40 questions - 10 levels)
    [{ s: "Fisika", q: "Tekanan atmosfer di dataran tinggi?", o: ["Sama", "Lebih tinggi", "Lebih rendah", "Tidak terukur"], e: 2, ex: "Sedikit kolom udara", h: "Sedikit udara" },
    { s: "Biologi", q: "Hb di dataran tinggi mengikat O₂?", o: ["Sulit", "Mudah", "Sama", "Tidak"], e: 0, ex: "pO₂ ↓ → Hb ↓ jenuh", h: "Sedikit O₂" },
    { s: "MTK", q: "Everest (~8800m) tekanan ≈ ?", o: ["760 mmHg", "250 mmHg", "500 mmHg", "100 mmHg"], e: 1, ex: "~1/3 permukaan", h: "1/3" },
    { s: "Logika", q: "Tubuh di dataran tinggi adaptasi?", o: ["Napas singkat", "Napas lebih cepat/dalam", "Tidur", "Makan"], e: 1, ex: "Hiperventilasi", h: "Kompensasi" }],
    [{ s: "Fisika", q: "Volume paru saat tarik napas?", o: ["Menyusut", "Membesar", "Tetap", "Besar-kecil"], e: 1, ex: "Diafragma ↓ → V ↑ → P ↓ → masuk", h: "Udara masuk" },
    { s: "Biologi", q: "Alveolus untuk?", o: ["Simpan", "Perluas permukaan", "Filtrasi", "Hangatkan"], e: 1, ex: "70m² untuk difusi", h: "70m²" },
    { s: "MTK", q: "VT = 0.5L, f = 15×/menit. Ventilasi?", o: ["7.5 L/m", "60 L/m", "0.5 L/m", "4 L/m"], e: 0, ex: "0.5 × 15 = 7.5", h: "Kali frekuensi" },
    { s: "Logika", q: "Eritrosit ↑ di dataran tinggi untuk?", o: ["Encer", "Lebih banyak O₂", "Lambat", "Tekanan"], e: 1, ex: "Hb ↑ → kapasitas O₂ ↑", h: "Hb = pembawa O₂" }],
    [{ s: "Fisika", q: "Tekanan darah arteri > vena karena?", o: ["Dinding tebal", "Darah kental", "O₂ banyak", "Jantung"], e: 0, ex: "Tekanan langsung ventrikel", h: "Dari jantung" },
    { s: "Biologi", q: "O₂ diangkut oleh?", o: ["Plasma", "Hb", "Trombosit", "Limfosit"], e: 1, ex: "Di eritrosit", h: "Sel darah merah" },
    { s: "MTK", q: "Alveolus 70m², kulit 2m². Rasio?", o: ["1:35", "35:1", "1:1", "70:2"], e: 1, ex: "70/2 = 35:1", h: "Bagi" },
    { s: "Logika", q: "Aktivitas ↑ meningkatkan?", o: ["Tekanan", "Aliran ke otot", "A & B", "Tidak"], e: 2, ex: "Tekanan & aliran ↑", h: "Otot butuh darah" }],
    [{ s: "Fisika", q: "Difusi gas dari ... ke ...", o: ["Rendah-tinggi", "Tinggi-rendah", "Sama", "Suhu"], e: 1, ex: "Tinggi → rendah", h: "Alam" },
    { s: "Biologi", q: "CO₂ mudah berdifusi karena?", o: ["Massa besar", "Lebih larut", "Reaktif", "Berlebihan"], e: 1, ex: "20× lebih larut", h: "Larut" },
    { s: "MTK", q: "Luas alveolus 70m² ≈ ... × kulit", o: ["10×", "35×", "70×", "5×"], e: 1, ex: "70/2 = 35×", h: "Perbandingan" },
    { s: "Logika", q: "Dehidrasi berbahaya karena?", o: ["Tekanan ↑", "Volume ↓", "Air keluar", "Tidak"], e: 1, ex: "Volume ↓ → tekanan ↓", h: "V = tekanan" }],
    [{ s: "Fisika", q: "Osmosis adalah difusi?", o: ["Gas", "Air", "Zat terlarut", "Padatan"], e: 1, ex: "Air melalui membran", h: "Air bergerak" },
    { s: "Biologi", q: "Air diserap di?", o: ["Lambung", "Usus halus", "Usus besar", "Kerongkongan"], e: 2, ex: "Usus besar", h: "Terakhir" },
    { s: "MTK", q: "Volume urin normal/hari?", o: ["500 mL", "1000 mL", "2000 mL", "100 mL"], e: 1, ex: "1-2 liter", h: "1-2L" },
    { s: "Logika", q: "Dialisis dilakukan saat?", o: ["Ginjal baik", "Ginjal gagal", "Tekanan ↑", "Infeksi"], e: 1, ex: "Ginjal buatan", h: "Buatan" }],
    [{ s: "Fisika", q: "Tekanan osmotik bergantung pada?", o: ["Volume", "Konsentrasi", "Warna", "Bentuk"], e: 1, ex: "π = iMRT ∝ konsentrasi", h: "Semakin banyak" },
    { s: "Biologi", q: "Ginjal menghasilkan?", o: ["Empedu", "Urin", "Insulin", "Parathormon"], e: 1, ex: "Filtrasi → urin", h: "Buang" },
    { s: "MTK", q: "Tekanan sistolik normal?", o: ["80 mmHg", "120 mmHg", "160 mmHg", "200 mmHg"], e: 1, ex: "120/80 mmHg", h: "Atas = sistol" },
    { s: "Logika", q: "Transplantasi harus cocok?", o: ["Golongan darah", "Warna kulit", "Ukuran", "Usia"], e: 0, ex: "Golongan & HLA", h: "Imun" }],
    [{ s: "Fisika", q: "Antigen adalah?", o: ["Antibodi", "Zat asing", "Sel darah", "Hormon"], e: 1, ex: "Zat asing → imun", h: "Memicu" },
    { s: "Biologi", q: "Antibodi diproduksi?", o: ["Limfosit B", "Eritrosit", "Trombosit", "Makrofag"], e: 0, ex: "Sel B/plasma cell", h: "Sel imun" },
    { s: "MTK", q: "pH normal darah?", o: ["6.35", "7.35", "8.35", "9.35"], e: 1, ex: "7.35-7.45", h: "Sedikit basa" },
    { s: "Logika", q: "Autoimun terjadi saat?", o: ["Virus", "Imun menyerang diri", "Bakteri", "Nutrisi"], e: 1, ex: "Salah kenali sel sendiri", h: "Menyerang diri" }],
    [{ s: "Fisika", q: "Vili untuk?", o: ["Perluas permukaan", "Gerakan", "Air", "Mencerna"], e: 0, ex: "Tonjolan → permukaan ↑", h: "Permukaan = banyak" },
    { s: "Biologi", q: "Limfosit T menyerang?", o: ["Bakteri", "Sel virus", "Racun", "Air"], e: 1, ex: "Sel T sitotoksik", h: "Langsung ke sel" },
    { s: "MTK", q: "GFR % darah per menit?", o: ["5%", "10%", "20%", "50%"], e: 2, ex: "~20% curah jantung", h: "Seperlima" },
    { s: "Logika", q: "Vaccine bekerja dengan?", o: ["Kill kuman", "Latih imun", "Hilangkan antibodi", "Lemah jantung"], e: 1, ex: "Antigen → antibodi", h: "Latihan" }],
    [{ s: "Fisika", q: "pH darah dijaga karena?", o: ["Enzim optimal", "Tidak asam", "Encer", "Warna"], e: 0, ex: "pH optimum enzim ~7.4", h: "Enzim butuh pH" },
    { s: "Biologi", q: "Empedu untuk?", o: ["Protein", "Lemak", "Karbohidrat", "Air"], e: 1, ex: "Emulsi lemak", h: "Lemak ≠ larut" },
    { s: "MTK", q: "Hb normal pria ... g/dL", o: ["8", "12", "15", "20"], e: 2, ex: "13-18 g/dL", h: "14-15 rata" },
    { s: "Logika", q: "Sistem limfatik untuk?", o: ["O₂", "Drainase/imun", "Lemak", "Saring"], e: 1, ex: "Cairan + imun", h: "Bantu imun" }],
    [{ s: "Fisika", q: "Tekanan darah normal diastolik?", o: ["120", "80", "140", "60"], e: 1, ex: "120/80 mmHg", h: "Bawah = diastol" },
    { s: "Biologi", q: "Insulin dihasilkan?", o: ["Hati", "Pankreas", "Ginjal", "Jantung"], e: 1, ex: "Sel β pankreas", h: "Gula darah" },
    { s: "MTK", q: "IgG half-life ... hari", o: ["7", "21", "70", "3"], e: 1, ex: "~21 hari", h: "Beberapa minggu" },
    { s: "Logika", q: "Albumin untuk?", o: ["O₂", "Tekanan osmotik", "Mencerna", "Imun"], e: 1, ex: "Protein plasma", h: "Tekanan koloid" }],
    // Extra questions for Level 9-10
    [{ s: "Fisika", q: "Hukum Pascal: tekanan diteruskan ke?", o: ["Satu arah", "Semua arah", "Bawah saja", "Atas saja"], e: 1, ex: "Tekanan = sama ke segala arah", h: "Semua arah" },
    { s: "Biologi", q: "Sel darah merah dibentuk di?", o: ["Jantung", "Sumsum tulang", "Hati", "Limpa"], e: 1, ex: "Eritropoiesis di sumsum", h: "Tulang" },
    { s: "MTK", q: "F₁/A₁ = F₂/A₂ adalah rumus?", o: ["Archimedes", "Pascal", "Boyle", "Charles"], e: 1, ex: "Hukum Pascal", h: "Pascal" },
    { s: "Logika", q: "Piramida makanan menunjukkan?", o: ["Energi ↑", "Energi ↓", "Sama", "Tidak ada"], e: 1, ex: "Produser → konsumer", h: "Berkurang" }],
    [{ s: "Fisika", q: "Gaya Archimedes = ρVg. Berlaku untuk?", o: ["Gas saja", "Cair & gas", "Padat", "Semua"], e: 1, ex: "Mengapung/tercelup", h: "Fluida" },
    { s: "Biologi", q: "Limpa berfungsi menyimpan?", o: ["O₂", "Eritrosit", "Plasma", "Antibodi"], e: 1, ex: "Reservoir darah", h: "Sel darah" },
    { s: "MTK", q: "Benda mengapung jika ρbenda < ρfluida?", o: ["> fluida", "< fluida", "= fluida", "Bebas"], e: 1, ex: "Mengapung = lebih ringan", h: "Ringan" },
    { s: "Logika", q: "Tekanan hidrostatis P = ρgh. Di kedalaman 10m dalam air?", o: ["1 kPa", "10 kPa", "100 kPa", "1000 kPa"], e: 2, ex: "1000×10×10 = 100000 Pa = 100 kPa", h: "ρgh" }],
    [{ s: "Fisika", q: "Vena membawa darah ke?", o: ["Jantung", "Paru-paru", "Otak", "Hati"], e: 0, ex: "Vena → atrium", h: "Kembali ke jantung" },
    { s: "Biologi", q: "Donor darah universal?", o: ["A", "B", "AB", "O"], e: 3, ex: "O dapat donate ke semua", h: "Tanpa antigen" },
    { s: "MTK", q: "Debit Q = A×v. Satuan SI debit?", o: ["m³/s", "m/s", "m²/s", "kg/s"], e: 0, ex: "Volume/waktu", h: "Volume per waktu" },
    { s: "Logika", q: "Perubahan iklim mempengaruhi ekosistem karena?", o: ["Suhu", "Habitat berubah", "Air", "Semua"], e: 3, ex: "Semua faktor berubah", h: "Kompleks" }]
  ],
  4: [ // Chapter 4 - Kesetimbangan Kimia (40 questions - 10 levels)
    [{ s: "Kimia", q: "Kesetimbangan dinamis berarti?", o: ["Reaksi berhenti", "Reaksi bolak-balik sama cepat", "Konsentrasi sama", "Tidak ada"], e: 1, ex: "Laju maju = mundur", h: "Bolak-balik" },
    { s: "Fisika", q: "Hukum Le Chatelier: jika tekanan ↑, reaksi geser ke?", o: ["Mol lebih banyak", "Mol lebih sedikit", "Tidak berubah", "Netral"], e: 1, ex: "Tekanan ↑ → ke mol lebih sedikit", h: "Mol lebih sedikit" },
    { s: "MTK", q: "Kc = [C]ⁿ/[A]ᵐ[B]ᵖ. Ordo reaksi total?", o: ["n", "m+p", "n+m+p", "Tidak tentu"], e: 2, ex: "Jumlah pangkat reaktan", h: "Jumlahkan" },
    { s: "Logika", q: "Katalis tidak mengubah?", o: ["Laju", "Kc", "Arah", "Energi aktivasi"], e: 1, ex: "Katalis hanya percepat", h: "Kc tetap" }],
    [{ s: "Kimia", q: "Reaksi eksoterm: jika suhu ↑, Kc?", o: ["Meningkat", "Menurun", "Tetap", "Nol"], e: 1, ex: "Eksoterm → panas produk, naik → reaksi mundur", h: "Panasan = mundur" },
    { s: "Biologi", q: "Enzim bekerja di kesetimbangan?", o: ["Ubah kesetimbangan", "Capai lebih cepat", "Hentikan", "Semua"], e: 1, ex: "Enzim percepat, bukan ubah K", h: "Cepat saja" },
    { s: "MTK", q: "Jika Kc >> 1, reaksi cenderung ke?", o: ["Kiri", "Kanan", "Diam", "Setengah"], e: 1, ex: "K besar = produk banyak", h: "Produk" },
    { s: "Logika", q: "Produk meningkat jika reaksi geser kanan. Bagaimana caranya?", o: ["Tambah reaktan", "Kurangi produk", "Tambah suhu (endoterm)", "A & C"], e: 3, ex: "Reaktan naik, produk turun, atau Panas masuk", h: "Kanan = produk" }],
    [{ s: "Kimia", q: "Tetapan kesetimbangan Kp menggunakan?", o: ["Konsentrasi", "Tekanan parsial", "Volume", "Massa"], e: 1, ex: "Kp untuk gas", h: "Tekanan gas" },
    { s: "Fisika", q: "Q < Kc: reaksi ke?", o: ["Kiri", "Kanan", "Diam", "Tidak terjadi"], e: 1, ex: "Q < K → maju ke produk", h: "Maju" },
    { s: "MTK", q: "A ⇌ 2B. Kc = 4. [A] = 2M, [B] = ?", o: ["1 M", "2 M", "4 M", "8 M"], e: 2, ex: "4 = [B]²/2 → [B] = √8 ≈ 2.83", h: "Akar" },
    { s: "Logika", q: "Reaksi reversible: menambah katalis mempengaruhi?", o: ["Waktu saja", "Kesetimbangan", "Produk", "Tidak"], e: 0, ex: "Cepatcapai, K tetap", h: "Waktu" }],
    [{ s: "Kimia", q: "Prinsip Le Chatelier menjelaskan?", o: ["Laju saja", "Pergeseran kesetimbangan", "Kinetik", "Termodinamika"], e: 1, ex: "Sistem menyesuaikan gangguan", h: "Pergeseran" },
    { s: "Biologi", q: "Hemoglobin mengikat O₂ di?", o: ["Jaringan", "Paru-paru", "Hati", "Otot"], e: 1, ex: "Di paru-paru: Hb + O₂ → HbO₂", h: "Paru" },
    { s: "MTK", q: "N₂ + 3H₂ ⇌ 2NH₃. Δn = ?", o: ["2", "-2", "4", "0"], e: 1, ex: "Produk 2 - Reaktan 4 = -2", h: "Kurangi" },
    { s: "Logika", q: "Kesetimbangan industri Haber-Bosch menginginkan produk NH₃. Tekanan?", o: ["Rendah", "Tinggi", "Atmosfer", "Bebas"], e: 1, ex: "Tekanan tinggi → mol sedikit (NH₃)", h: "Tekanan tinggi" }],
    [{ s: "Kimia", q: "Asam kuat dalam air?", o: ["Sedikit terionisasi", "Sepenuhnya terionisasi", "Tidak terionisasi", "Mengendap"], e: 1, ex: "Asam kuat = ionisasi penuh", h: "100%" },
    { s: "Fisika", q: "Penambahan inert gas pada volume tetap?", o: ["Geser kanan", "Geser kiri", "Tidak berubah", "Bebas"], e: 2, ex: "Tekanan total ↑, tetapi konsentrasi tetap", h: "Konsentrasi tetap" },
    { s: "MTK", q: "pH = -log[H⁺]. [H⁺] = 10⁻⁶ M, pH = ?", o: ["6", "-6", "10⁶", "0.000001"], e: 0, ex: "pH = -log(10⁻⁶) = 6", h: "Log" },
    { s: "Logika", q: "Air murni bersifat?", o: ["Asam", "Basa", "Netral", "Amfoter"], e: 2, ex: "pH = 7", h: "Netral" }],
    [{ s: "Kimia", q: "Ka besar menunjukkan asam?", o: ["Lemah", "Kuat", "Netral", "Tidak tentu"], e: 1, ex: "Ka = [H⁺][A⁻]/[HA]", h: "Besar = kuat" },
    { s: "Biologi", q: "Buffer mempertahankan pH dengan?", o: ["Menambah asam", "Menambah basa", "Menahan perubahan", "Mengencerkan"], e: 2, ex: "Asam + basa buffer → konjugat", h: "Tahan" },
    { s: "MTK", q: "Indicator pH berubah warna pada?", o: ["Satu pH", "Range pH", "Semua pH", "Tidak"], e: 1, ex: "Setiap indicator punya range", h: "Range" },
    { s: "Logika", q: "Buffer darah penting karena?", o: ["Enzim butuh pH tetap", "Untuk warna", "Sekadar", "Tidak penting"], e: 0, ex: "pH 7.35-7.45 krusial", h: "Enzim" }],
    [{ s: "Kimia", q: "Reaksi hidrolisis garam terjadi karena?", o: ["Air banyak", "Ion garam bereaksi dengan air", "Garam larut", "Asam-basa"], e: 1, ex: "Anion/kation + H₂O → asam/basa lemah", h: "Air" },
    { s: "Fisika", q: "Titik ekuivalen pada titrasi adalah saat?", o: ["Asam = basa", "Reaksi selesai", "pH = 7", "A & B"], e: 1, ex: "Stoikiometri tepat", h: "Selesai" },
    { s: "MTK", q: "V₁M₁ = V₂M₂ rumus?", o: ["Titrasi", "Pengenceran", "Reaksi", "Dekomposisi"], e: 1, ex: "Mol sebelum = mol setelah", h: "Mol sama" },
    { s: "Logika", q: "Indicator phenolphthalein tidak cocok untuk titrasi?", o: ["Asam-asa lemah", "Asam kuat-basa kuat", "Basa-basa lemah", "A & C"], e: 3, ex: "Perubahan pH tidak tepat", h: "Range tidak cocok" }],
    [{ s: "Kimia", q: "Garam dari asam kuat + basa kuat bersifat?", o: ["Asam", "Basa", "Netral", "Bervariasi"], e: 2, ex: "Tidak terhidrolisis", h: "Netral" },
    { s: "Biologi", q: "Asidosis adalah kondisi pH darah?", o: ["> 7.45", "< 7.35", "= 7", "Tidak tentu"], e: 1, ex: "Terlalu asam", h: "Asam" },
    { s: "MTK", q: "pH + pOH = ?", o: ["7", "14", "1", "0"], e: 1, ex: "pH + pOH = 14", h: "Konstan 14" },
    { s: "Logika", q: "Alkalosis ditangani dengan?", o: ["Makan asam", "Makan basa", "Ventilasi", "A & C"], e: 3, ex: "Atur pernapasan/diet", h: "Kompensasi" }],
    [{ s: "Kimia", q: "Ksp adalah tetapan?", o: ["Kelarutan", "Titik didih", "Densitas", "Tekanan"], e: 0, ex: "Kelarutan", h: "Larut" },
    { s: "Fisika", q: "Penambahan ion sejenis menyebabkan?", o: ["Mr ↑", "Kelarutan ↓", "Kelarutan ↑", "Tidak"], e: 1, ex: "Efek ion sekutu", h: "Turun" },
    { s: "MTK", q: "AgCl Ksp = 1.8×10⁻¹⁰. Kelarutan dalam M?", o: ["1.8×10⁻¹⁰", "1.3×10⁻⁵", "√Ksp", "10⁻⁵"], e: 1, ex: "s = √(1.8×10⁻¹⁰) ≈ 1.3×10⁻⁵", h: "Akar" },
    { s: "Logika", q: "Endapan terbentuk jika Q > Ksp. Q adalah?", o: ["Ksp", "Qc", "Produk kelarutan", "Konsentrasi"], e: 1, ex: "Quotient reaksi", h: "Perbandingan" }],
    // Extra questions for Level 9-10
    [{ s: "Kimia", q: "Reaksi homogen: semua fase?", o: ["Sama", "Berbeda", "Gas", "Cair"], e: 0, ex: "Fase sama", h: "Sama" },
    { s: "Biologi", q: "Oksihemoglobin melepaskan O₂ di?", o: ["Paru-paru", "Jaringan", "Jantung", "Hati"], e: 1, ex: "Di jaringan: HbO₂ → Hb + O₂", h: "Jaringan butuh" },
    { s: "MTK", q: "2NO₂ ⇌ N₂O₄. Kp = 0.12. Jika Ptotal = 1 atm, PNO₂ = ?", o: ["0.12 atm", "0.88 atm", "0.5 atm", "0.3 atm"], e: 1, ex: "PN₂O₄ = Kp/(1+Kp)", h: "Hitung" },
    { s: "Logika", q: "Reaksi reversibel dapat mencapai kesetimbangan dari?", o: ["Satu arah", "Dua arah", "Tidak", "Bebas"], e: 1, ex: "Maju atau mundur", h: "Dua" }],
    [{ s: "Kimia", q: "Agen pengoksidasi menyebabkan bilangan oksidasi?", o: ["Menurun", "Meningkat", "Tetap", "Bervariasi"], e: 1, ex: "Oxidation = naik biloks", h: "Naik" },
    { s: "Fisika", q: "Konsentrasi dalam kesetimbangan dipengaruhi oleh?", o: ["Waktu", "Volume", "Suhu", "Semua"], e: 3, ex: "Semua faktor", h: "Kompleks" },
    { s: "MTK", q: "Derajat dissosiasi α = 0.5. Untuk 4 mol, mol terurai?", o: ["2 mol", "4 mol", "0.5 mol", "8 mol"], e: 0, ex: "α × jumlah awal", h: "Kali" },
    { s: "Logika", q: "Kesetimbangan dalam tubuh dijaga oleh?", o: ["Ginjal", "Paru", "Buffer", "Semua"], e: 3, ex: "Multi organ", h: "Tubuh" }]
  ],
  5: [ // Chapter 5 - Sel & Metabolisme (40 questions - 10 levels)
    [{ s: "Biologi", q: "Mitokondria disebut power house karena?", o: ["Menghasilkan ATP", "Menghasilkan protein", "Membelah", "Menyimpan"], e: 0, ex: "Tempat respirasi sel → ATP", h: "Energi" },
    { s: "Kimia", q: "Respirasi sel adalah reaksi?", o: ["Sintesis", "Katabolisme", "Anabolisme", "Netral"], e: 1, ex: "Pemecahan glukosa → energi", h: "Memecah" },
    { s: "MTK", q: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energi. Pada STP, 1 mol gas volume?", o: ["22.4 L", "24 L", "1 L", "6 L"], e: 0, ex: "1 mol gas = 22.4 L pada STP", h: "STP" },
    { s: "Logika", q: "Aerob membutuhkan?", o: ["Oksigen", "CO₂", "Nitrogen", "Helium"], e: 0, ex: "O₂ sebagai akseptor elektron", h: "Oksigen" }],
    [{ s: "Biologi", q: "Glikolisis terjadi di?", o: ["Mitokondria", "Sitosol", "Nukleus", "Membran"], e: 1, ex: "Di sitosol", h: "Sel" },
    { s: "Kimia", q: "Produk glikolisis (glukosa → 2 piruvat)?", o: ["2 ATP, 2 piruvat", "36 ATP", "O₂", "CO₂"], e: 0, ex: "Nett 2 ATP + 2 piruvat", h: "2 ATP" },
    { s: "MTK", q: "Glukosa (C₆H₁₂O₆) Mr = ? (C=12, H=1, O=16)", o: ["150", "180", "200", "160"], e: 1, ex: "6×12 + 12×1 + 6×16 = 180", h: "Hitung" },
    { s: "Logika", q: "Piruvat memasuki siklus Krebs di?", o: ["Sitosol", "Matriks mitokondria", "Membran", "Nukleus"], e: 1, ex: "Di matriks mitokondria", h: "Mitokondria" }],
    [{ s: "Biologi", q: "Siklus Krebs menghasilkan?", o: ["ATP langsung", "NADH, FADH₂, CO₂", "O₂", "Glukosa"], e: 1, ex: "Menghasilkan pembawa elektron", h: "Elektron" },
    { s: "Kimia", q: "Transpor elektron menghasilkan sekitar?", o: ["2 ATP", "32-34 ATP", "4 ATP", "0 ATP"], e: 1, ex: "Sebagian besar ATP", h: "Banyak" },
    { s: "MTK", q: "1 glukosa → ~38 ATP. Efisiensi respirasi aerob?", o: ["38%", "~40%", "10%", "100%"], e: 1, ex: "~40% dari glukosa", h: "Tidak 100%" },
    { s: "Logika", q: "Fermentasi asam laktat terjadi saat?", o: ["Oksigen cukup", "Oksigen kurang", "Tidak pernah", "Selalu"], e: 1, ex: "Anaerob di otot", h: "Kurang O₂" }],
    [{ s: "Biologi", q: "Kloroplas terdapat di?", o: ["Hewan", "Tumbuhan", "Bakteri", "Jamur"], e: 1, ex: "Organel fotosintesis", h: "Tumbuhan" },
    { s: "Kimia", q: "Fotosintesis: 6CO₂ + 6H₂O + cahaya → ?", o: ["CO₂ + H₂O", "C₆H₁₂O₆ + O₂", "C₆H₁₂O₆ + CO₂", "O₂ + H₂O"], e: 1, ex: "Glukosa + oksigen", h: "Produk" },
    { s: "MTK", q: "Cahaya tampak memiliki panjang gelombang?", o: ["< 400 nm", "400-700 nm", "> 700 nm", "Semua"], e: 1, ex: "Spektrum tampak", h: "Visible" },
    { s: "Logika", q: "Klorofil menyerap cahaya?", o: ["Hijau", "Merah-biru", "Kuning", "Putih"], e: 1, ex: "Memantulkan hijau", h: "Merah-biru" }],
    [{ s: "Biologi", q: "Reaksi gelap (siklus Calvin) terjadi di?", o: ["Membran tilakoid", "Stroma", "Grana", "Membran luar"], e: 1, ex: "Di stroma kloroplas", h: "Stroma" },
    { s: "Kimia", q: "Rubisco adalah enzim yang memfiksasi?", o: ["O₂", "CO₂", "N₂", "H₂O"], e: 1, ex: "CO₂ ke RuBP", h: "CO₂" },
    { s: "MTK", q: "3 RuBP + 3CO₂ → 6 G3P. Dari 6 G3P, berapa yang jadi glukosa?", o: ["1", "2", "3", "6"], e: 0, ex: "1 dari 6", h: "1/6" },
    { s: "Logika", q: "Faktor limitasi fotosintesis?", o: ["CO₂", "Cahaya", "Air", "Semua"], e: 3, ex: "Semuanya", h: "Multi" }],
    [{ s: "Biologi", q: "DNA terletak di?", o: ["Sitosol", "Nukleus & mitokondria", "Membran", "Retikulum"], e: 1, ex: "Nukleus + DNA mitokondria", h: "Nukleus" },
    { s: "Kimia", q: "Replikasi DNA adalah proses?", o: ["Pemecahan", "Penduplikasian", "Translasi", "Transkripsi"], e: 1, ex: "Menduplikasi DNA", h: "Copy" },
    { s: "MTK", q: "DNA tersusun dari nukleotida. Gula pada DNA?", o: ["Ribosa", "Deoksiribosa", "Glukosa", "Fruktosa"], e: 1, ex: "Deoksiribosa", h: "Deoksi" },
    { s: "Logika", q: "RNA berbeda dari DNA karena?", o: ["Gula", "Basa", "Helai ganda", "A & B"], e: 3, ex: "Ribosa, urasil, single strand", h: "Beda" }],
    [{ s: "Biologi", q: "Transkripsi terjadi di?", o: ["Sitosol", "Nukleus", "Ribosom", "Mitokondria"], e: 1, ex: "DNA → mRNA di nukleus", h: "Nukleus" },
    { s: "Kimia", q: "Translation terjadi di?", o: ["Nukleus", "Ribosom", "Sitosol", "Membran"], e: 1, ex: "mRNA → protein di ribosom", h: "Ribosom" },
    { s: "MTK", q: "Kodon terdiri dari berapa basa?", o: ["1", "2", "3", "4"], e: 2, ex: "3 basa = 1 asam amino", h: "3" },
    { s: "Logika", q: "Mutasi adalah perubahan?", o: ["DNA", "Protein", "RNA", "Semua"], e: 0, ex: "Perubahan urutan DNA", h: "DNA" }],
    [{ s: "Biologi", q: "Sel prokariotik tidak memiliki?", o: ["DNA", "Ribosom", "Nukleus", "Membran"], e: 2, ex: "Tidak ada nukleus sejati", h: "Nukleus" },
    { s: "Kimia", q: "Membran sel tersusun dari?", o: ["Protein", "Lipid", "Karbohidrat", "Semua"], e: 3, ex: "fosfolipid + protein", h: "Lipid" },
    { s: "MTK", q: "Mikroskop cahaya pembesaran maksimal?", o: ["100x", "1000x", "10000x", "500x"], e: 1, ex: "~1000x", h: "Seribu" },
    { s: "Logika", q: "Eukariotik lebih kompleks dari prokariotik karena?", o: ["Lebih besar", "Organel", "DNA", "Semua"], e: 1, ex: "Organel bermembran", h: "Organel" }],
    [{ s: "Biologi", q: "Pembelahan mitosis menghasilkan?", o: ["2 sel haploid", "2 sel diploid", "4 sel", "1 sel"], e: 1, ex: "Identik diploid", h: "2 diploid" },
    { s: "Kimia", q: "Meiosis menghasilkan?", o: ["2 sel", "4 sel haploid", "4 sel diploid", "1 sel"], e: 1, ex: "4 sel haploid", h: "4 haploid" },
    { s: "MTK", q: "Manusia memiliki 46 kromosom. Setelah meiosis menjadi?", o: ["46", "23", "92", "12"], e: 1, ex: "Setengah", h: "Setengah" },
    { s: "Logika", q: "Crossing over pada meiosis meningkatkan?", o: ["Variasi genetik", "Jumlah sel", "Kromosom", "DNA"], e: 0, ex: "Pertukaran materi genetik", h: "Bervariasi" }],
    // Extra questions for Level 9-10
    [{ s: "Biologi", q: "Retikulum endoplasma kasar terdapat?", o: ["Ribosom", "Poliribosom", "Lisosom", "Peroksisom"], e: 0, ex: "REK dengan ribosom", h: "Ribosom" },
    { s: "Kimia", q: "Lipid disimpan sebagai?", o: ["Glikogen", "Lemak", "Protein", "Pati"], e: 1, ex: "Trigliserida", h: "Lemak" },
    { s: "MTK", q: "Glikogen adalah polimer dari?", o: ["Glukosa", "Fruktosa", "Sukrosa", "Laktosa"], e: 0, ex: "Glukosa", h: "Glukosa" },
    { s: "Logika", q: "Hati menyimpan glikogen untuk?", o: ["Energi", "Protein", "Lemak", "Air"], e: 0, ex: "Cadangan glukosa", h: "Gula darah" }],
    [{ s: "Biologi", q: "Lisosom mengandung enzim?", o: ["Sintesis", "Pencernaan", "Respirasi", "Fotosintesis"], e: 1, ex: "Hidrolase", h: "Mencerna" },
    { s: "Kimia", q: "ATP memiliki rumus?", o: ["C₁₀H₁₆N₅O₁₃P₃", "C₁₀H₁₆N₅O₁₃P₂", "C₆H₁₂O₆", "C₅H₁₀O₅"], e: 0, ex: "Adenosin trifosfat", h: "3 fosfat" },
    { s: "MTK", q: "Reaksi anabolisme membutuhkan?", o: ["Energi", "O₂", "CO₂", "Air"], e: 0, ex: "Sintesis butuh energi", h: "Energi" },
    { s: "Logika", q: "Katabolisme adalah reaksi?", o: ["Membangun", "Memecah → energi", "Netral", "Tidak"], e: 1, ex: "Katabol = memecah", h: "Memecah" }]
  ],
  6: [ // Chapter 6 - Listrik & Magnet (40 questions - 10 levels)
    [{ s: "Fisika", q: "Hukum Ohm: V = I×R. Jika V = 10V, R = 2Ω, I = ?", o: ["5 A", "20 A", "0.2 A", "12 A"], e: 0, ex: "I = V/R = 10/2 = 5 A", h: "V/R" },
    { s: "MTK", q: "Daya listrik P = V×I. Satuan Watt = ?", o: ["J/s", "J·s", "V·A", "A & C benar"], e: 3, ex: "Watt = Joule/sekon = Volt×Ampere", h: "V×I" },
    { s: "Kimia", q: "Arus listrik adalah aliran?", o: ["Proton", "Elektron", "Neutron", "Semua"], e: 1, ex: "Aliran elektron", h: "Elektron" },
    { s: "Logika", q: "Baterai mengubah energi kimia menjadi?", o: ["Mekanik", "Listrik", "Panas", "Cahaya"], e: 1, ex: "Reaksi redoks → elektron", h: "Listrik" }],
    [{ s: "Fisika", q: "Hambatan jenis ρ. Jika panjang 2x, hambatan?", o: ["Tetap", "2x", "4x", "½x"], e: 1, ex: "R ∝ l", h: "Seper panjang" },
    { s: "MTK", q: "R = ρL/A. Jika L 2x dan A 2x, R?", o: ["Tetap", "2x", "4x", "½x"], e: 0, ex: "L/A tetap", h: "Tetap" },
    { s: "Kimia", q: "Elektrolit adalah zat yang?", o: ["Tidak larut", "Mengalirkan arus", "Padat", "Tidak"], e: 1, ex: "Larut → ion → konduktor", h: "Ion" },
    { s: "Logika", q: "Logam konduktor baik karena?", o: ["Elektron bebas", "Proton", "Neutron", "Ions"], e: 0, ex: "Elektron valensi bebas", h: "Elektron" }],
    [{ s: "Fisika", q: "Daya resistor P = I²R. Jika I 2x, P menjadi?", o: ["2x", "4x", "½x", "x"], e: 1, ex: "P ∝ I²", h: "Kuadrat" },
    { s: "MTK", q: "Energi listrik E = P×t. 100W × 3600s = ?", o: ["36000 J", "360000 J", "3600 J", "36 J"], e: 1, ex: "100 × 3600 = 360000 J", h: "Kali" },
    { s: "Kimia", q: "Sel volta menghasilkan arus dari?", o: ["Energi listrik", "Reaksi redoks", "Panas", "Mekanik"], e: 1, ex: "Reaksi spontan", h: "Redoks" },
    { s: "Logika", q: "Battery rechargeable disebut sel?", o: ["Volta", "Daniel", "Sekunder", "Primer"], e: 2, ex: "Dapat diisi ulang", h: "Isi ulang" }],
    [{ s: "Fisika", q: "Medan magnet dihasilkan oleh?", o: ["Muatan diam", "Muatan bergerak", "Massa", "Energi"], e: 1, ex: "Arus listrik → medan magnet", h: "Arus" },
    { s: "MTK", q: "F = BIL. Gaya pada kawat berarus. Satuan Tesla = ?", o: ["N/A·m", "N/A", "T", "A & C benar"], e: 2, ex: "Tesla = N/(A·m)", h: "Medan" },
    { s: "Kimia", q: "Elektrolisis adalah proses?", o: ["Spontan", "Tidak spontan", "Netral", "Basa"], e: 1, ex: "Arus listrik → reaksi kimia", h: "Listrik" },
    { s: "Logika", q: "Elektroplating untuk?", o: ["Membersihkan", "Melapisi logam", "Memutus", "Memanaskan"], e: 1, ex: "Lapisan tipis logam", h: "Melapisi" }],
    [{ s: "Fisika", q: "Gaya Lorentz F = qvB sin θ. Jika v = 0, F = ?", o: ["qB", "0", "B", "Tidak"], e: 1, ex: "v = 0 → F = 0", h: "Diam" },
    { s: "MTK", q: "Induksi magnetik pada kawat lurus: B = μ₀I/2πr. B ∝ ?", o: ["r", "1/r", "r²", "1/r²"], e: 1, ex: "Berbanding terbalik jarak", h: "1/r" },
    { s: "Kimia", q: "Katoda adalah elektroda tempat?", o: ["Oksidasi", "Reduksi", "Netral", "Reaksi"], e: 1, ex: "Reduksi di katoda", h: "Reduksi" },
    { s: "Logika", q: "Generator mengubah?", o: ["Listrik → Listrik", "Mekanik → Listrik", "Kimia → Listrik", "Panas → Listrik"], e: 1, ex: "Induksi elektromagnetik", h: "Gerakan" }],
    [{ s: "Fisika", q: "Fluks magnetik φ = B·A·cosθ. Satuan Weber = ?", o: ["T·m", "T·m²", "T/m", "T"], e: 1, ex: "Weber = Tesla × m²", h: "Luas" },
    { s: "MTK", q: "Hukum Faraday: ε = -dφ/dt. ε adalah?", o: ["Medan", "Arus", "GGL induksi", "Fluks"], e: 2, ex: "Gaya gerak listrik induksi", h: "Induksi" },
    { s: "Kimia", q: "Anoda adalah elektroda tempat?", o: ["Reduksi", "Oksidasi", "Netral", "Deposisi"], e: 1, ex: "Oksidasi di anoda", h: "Oksidasi" },
    { s: "Logika", q: "Transformator meningkatkan tegangan jika?", o: ["Np > Ns", "Np < Ns", "Np = Ns", "Bebas"], e: 1, ex: "Tegangan ∝ N lilitan", h: "Lilitan" }],
    [{ s: "Fisika", q: "Arus AC berubah arah dengan frekuensi 50 Hz. Perioda?", o: ["0.02 s", "0.05 s", "0.5 s", "50 s"], e: 0, ex: "T = 1/f = 1/50 = 0.02 s", h: "1/f" },
    { s: "MTK", q: "Vrms = Vp/√2. Jika Vp = 220V, Vrms = ?", o: ["110 V", "155 V", "220 V", "440 V"], e: 1, ex: "220/1.414 ≈ 155 V", h: "Bagi akar" },
    { s: "Kimia", q: "Korosi adalah oksidasi logam menghasilkan?", o: ["Logam", "Oksida", "Asam", "Basa"], e: 1, ex: "Karat", h: "Oksida" },
    { s: "Logika", q: "Cara mencegah korosi?", o: ["Air", "Pelapisan", "Oksigen", "Asam"], e: 1, ex: "Cat, galvanis, dll", h: "Lapis" }],
    [{ s: "Fisika", q: "Kapasitor menyimpan energi dalam bentuk?", o: ["Medan magnet", "Medan listrik", "Panas", "Kinetik"], e: 1, ex: "Energi dalam medan listrik", h: "Listrik" },
    { s: "MTK", q: "C = Q/V. Kapasitansi C berbanding dengan?", o: ["Q", "V", "Q/V", "Q×V"], e: 2, ex: "C = Q/V", h: "Q/V" },
    { s: "Kimia", q: "Sel Fuel Cell menghasilkan listrik dari?", o: ["Bensin", "Hidrogen + Oksigen", "Gas alam", "Batubara"], e: 1, ex: "2H₂ + O₂ → 2H₂O + listrik", h: "Hydrogen" },
    { s: "Logika", q: "Induktor menyimpan energi dalam?", o: ["Medan listrik", "Medan magnet", "Panas", "Mekanik"], e: 1, ex: "Energi dalam medan magnet", h: "Magnet" }],
    // Extra questions for Level 9-10
    [{ s: "Fisika", q: "Resistor seri: Rtotal = R1 + R2. Jika R1=2Ω, R2=3Ω, Rtotal?", o: ["1Ω", "5Ω", "6Ω", "0.5Ω"], e: 1, ex: "2 + 3 = 5Ω", h: "Jumlah" },
    { s: "MTK", q: "Paralel: 1/R = 1/R1 + 1/R2. Jika R1=R2=2Ω, Rtotal?", o: ["1Ω", "2Ω", "4Ω", "0.5Ω"], e: 0, ex: "1/R = 1/2 + 1/2 = 1", h: "Setengah" },
    { s: "Kimia", q: "Hukum Faraday: massa zat hasil elektrolisis ∝ ?", o: ["Waktu", "Arus × waktu", "Volume", "Tekanan"], e: 1, ex: "m = (ItM)/(nF)", h: "Arus × waktu" },
    { s: "Logika", q: "Konduksi pada logam melalui?", o: ["Proton", "Elektron", "Ion", "Neutron"], e: 1, ex: "Elektron bebas", h: "Elektron" }],
    [{ s: "Fisika", q: "Kutub magnet yang sama?", o: ["Tarik", "Tolak", "Netral", "Tidak"], e: 1, ex: "Sama → tolak, berbeda → tarik", h: "Tolak" },
    { s: "Kimia", q: "Baterai alkalin menggunakan?", o: ["Asam", "Basa", "Netral", "Garam"], e: 1, ex: "KOH sebagai elektrolit", h: "Basa" },
    { s: "MTK", q: "V = IR. Jika I = 0.5A, R = 100Ω, V = ?", o: ["50 V", "0.005 V", "200 V", "20 V"], e: 0, ex: "V = 0.5 × 100 = 50 V", h: "Kali" },
    { s: "Logika", q: "Semikonduktor intrinsik murni seperti?", o: ["Logam", "Silikon murni", "Karbon", "Belerang"], e: 1, ex: "Si murni", h: "Silikon" }]
  ],
  7: [ // Chapter 7 - Gelombang & Optik (40 questions - 10 levels)
    [{ s: "Fisika", q: "Cepat rambat gelombang v = f×λ. Jika f=10Hz, λ=2m, v=?", o: ["5 m/s", "20 m/s", "12 m/s", "8 m/s"], e: 1, ex: "v = 10 × 2 = 20 m/s", h: "Kali" },
    { s: "MTK", q: "Periode T = 1/f. Frekuensi 100Hz, T=?", o: ["0.01 s", "0.1 s", "1 s", "10 s"], e: 0, ex: "T = 1/100 = 0.01 s", h: "1/f" },
    { s: "Kimia", q: "Sinar UV menyebabkan?", o: ["Dingin", "Fotosintesis", "Penuaan", "Basah"], e: 2, ex: "UV = penuaan/kanker kulit", h: "Merusak" },
    { s: "Logika", q: "Gelombang seismik dari?", o: ["Gempa bumi", "Badai", "Laut", "Angin"], e: 0, ex: "Gempa", h: "Gempa" }],
    [{ s: "Fisika", q: "Gelombang transversal: arah getaran?", o: ["Sama arah rambat", "Tegak lurus", "Besar", "Kecil"], e: 1, ex: "Tegak lurus arah rambat", h: "Tegak" },
    { s: "MTK", q: "Amplitudo adalah?", o: ["Waktu", "Jarak max", "Frekuensi", "Panjang"], e: 1, ex: "Simpangan max", h: "Max" },
    { s: "Kimia", q: "Sinar inframerah dirasakan sebagai?", o: ["Dingin", "Panas", "Terang", "Gelap"], e: 1, ex: "Inframerah = panas", h: "Panas" },
    { s: "Logika", q: "Gelombang bunyi adalah gelombang?", o: ["Transversal", "Longitudinal", "Elektromagnetik", "Mekanik B"], e: 1, ex: "Rapat renggang", h: "Longitudinal" }],
    [{ s: "Fisika", q: "Cepat rambat bunyi di udara ~340 m/s. Di air?", o: ["Lebih kecil", "Lebih besar", "Sama", "Nol"], e: 1, ex: "Air ~1500 m/s", h: "Lebih cepat" },
    { s: "MTK", q: "Resonansi terjadi saat?", o: ["Frekuensi sama", "Frekuensi berbeda", "Tidak ada", "Bebas"], e: 0, ex: "Frekuensi alami = frekuensi sumber", h: "Sama" },
    { s: "Kimia", q: "Ozone layer menyerap?", o: ["Visible", "UV", "Infrared", "Radio"], e: 1, ex: "UV berbahaya", h: "UV" },
    { s: "Logika", q: "Echo adalah pantulan bunyi. Heard?", o: ["Langsung", "Tergantung jarak", "Tidak", "Selalu"], e: 1, ex: "> 17 m untuk echo", h: "Jarak" }],
    [{ s: "Fisika", q: "Cahaya adalah gelombang?", o: ["Mekanik", "Elektromagnetik", "Sound", "Air"], e: 1, ex: "Tidak perlu medium", h: "EM" },
    { s: "MTK", q: "Cepat rambat cahaya c = 3×10⁸ m/s. Dalam 1 detik dapat mengelilingi bumi?", o: ["7.5x", "75x", "750x", "7.5x"], e: 0, ex: "Keliling bumi ~4×10⁷m, 3×10⁸/4×10⁷ ≈ 7.5", h: "Hitung" },
    { s: "Kimia", q: "Sinar tampak memiliki panjang gelombang?", o: ["< 400 nm", "> 700 nm", "400-700 nm", "Semua"], e: 2, ex: "Visible spectrum", h: "Visible" },
    { s: "Logika", q: "Warna cahaya bergantung pada?", o: ["Amplitudo", "Frekuensi", "Kecepatan", "Arah"], e: 1, ex: "Frekuensi menentukan warna", h: "Frekuensi" }],
    [{ s: "Fisika", q: "Hukum pemantulan: sudut datang = sudut pantul. Besar?", o: ["Lebih besar", "Sama", "Lebih kecil", "Berlainan"], e: 1, ex: "i = r", h: "Sama" },
    { s: "MTK", q: "Cermin datar menghasilkan bayangan?", o: ["Maya, terbalik", "Maya, sama", "Nyata, terbalik", "Nyata, sama"], e: 1, ex: "Maya = di belakang cermin, tegak", h: "Sama" },
    { s: "Kimia", q: "Penyerapan cahaya oleh molekul menyebabkan?", o: ["Warna", "Panas", "Listrik", "Magnet"], e: 0, ex: "Warna benda", h: "Warna" },
    { s: "Logika", q: "Cermin cembung selalu membentuk bayangan?", o: ["Maya", "Nyata", "Terbalik", "Besar"], e: 0, ex: "Selalu maya, tegak, diperkecil", h: "Maya" }],
    [{ s: "Fisika", q: "Lensa cembung (konvergen) disebut juga?", o: ["Divergen", "Konvergen", "Plan", "Cekung"], e: 1, ex: "Mengumpulkan cahaya", h: "Kumpulkan" },
    { s: "MTK", q: "1/f = 1/s + 1/s'. Jika s=10cm, s'=10cm, f=?", o: ["20 cm", "5 cm", "10 cm", "0"], e: 1, ex: "1/f = 1/10 + 1/10 = 2/10 → f=5", h: "Hitung" },
    { s: "Kimia", q: "Lensa kontak terbuat dari?", o: ["Kaca", "Plastik", "Logam", "Keramik"], e: 1, ex: "HPMC atau silicone hydrogel", h: "Plastik" },
    { s: "Logika", q: "Mata normal memiliki punctum proximum?", o: ["10 cm", "25 cm", "50 cm", "Tak hingga"], e: 1, ex: "~25 cm", h: "25 cm" }],
    [{ s: "Fisika", q: "Difraksi adalah pembelokan gelombang saat melalui?", o: ["Medium berbeda", "Celah sempit", "Cermin", "Lensa"], e: 1, ex: "Melewati celah/sem obstacle", h: "Celah" },
    { s: "MTK", q: "Interferensi konstruktif terjadi saat beda fase?", o: ["0°", "180°", "90°", "270°"], e: 0, ex: "Fase sama", h: "Sama" },
    { s: "Kimia", q: "Polaroidfilter menyaring cahaya berdasarkan?", o: ["Warna", "Arah getar", "Intensitas", "Frekuensi"], e: 1, ex: "Memilih arah getar", h: "Arah" },
    { s: "Logika", q: "Efek Doppler untuk gelombang?", o: ["Stationer", "Bergerak", "Diam", "Tidak"], e: 1, ex: "Perubahan frekuensi karena gerak", h: "Bergerak" }],
    [{ s: "Fisika", q: "Efek Doppler: sumber bergerak ke pengamat. Frekuensi terdengar?", o: ["Meningkat", "Menurun", "Tetap", "Nol"], e: 0, ex: "Mendekat = frekuensi lebih tinggi", h: "Naik" },
    { s: "MTK", q: "Intensitas bunyi I = P/A. Satuan dB dihitung sebagai?", o: ["I", "10 log(I/I₀)", "I×I₀", "I+I₀"], e: 1, ex: "Desibel skala log", h: "Log" },
    { s: "Kimia", q: "Sinar X memiliki panjang gelombang lebih pendek dari?", o: ["UV", "Visible", "Infrared", "Radio"], e: 1, ex: "X-ray < UV", h: "Sangat pendek" },
    { s: "Logika", q: "USG menggunakan gelombang?", o: ["Elektromagnetik", "Sonic/Ultrasonik", "Cahaya", "Berat"], e: 1, ex: "Ultrasound", h: "Sonic" }],
    [{ s: "Fisika", q: "Dispersi cahaya adalah?", o: ["Pemantulan", "Pembiasan", "Perubahan warna", "Difraksi"], e: 2, ex: "Perubahan warna pd prisma", h: "Warna" },
    { s: "MTK", q: "Indeks bias n = c/v. Jika v=c/2, n=?", o: ["0.5", "1", "2", "4"], e: 2, ex: "n = c/(c/2) = 2", h: "c/v" },
    { s: "Kimia", q: "Prisma memisahkan warna karena indeks bias berbeda untuk?", o: ["Amplitudo", "Frekuensi", "Panjang gelombang", "Waktu"], e: 2, ex: "Dispersi", h: "Panjang gelombang" },
    { s: "Logika", q: "Mata miopi (rabun jauh) dinormalkan dengan lensa?", o: ["Cembung", "Cekung", "Silindris", "Plan"], e: 1, ex: "Lensa divergen", h: "Cekung" }],
    // Extra questions for Level 9-10
    [{ s: "Fisika", q: "Superposisi adalah prinsip?", o: ["Pemantulan", "Penjumlahan", "Pengurangan", "Pembiasan"], e: 1, ex: "Amplitudo dijumlahkan", h: "Jumlah" },
    { s: "MTK", q: "Energi gelombang E ∝ A². Jika A 2x, E menjadi?", o: ["2x", "4x", "x", "x/2"], e: 1, ex: "E ∝ A²", h: "Kuadrat" },
    { s: "Kimia", q: "Laser singkatan dari?", o: ["Light Amplification", "Light by Stimulated Emission", "Low Energy", "Semua"], e: 1, ex: "Light Amplification by Stimulated Emission of Radiation", h: "SINGKATAN" },
    { s: "Logika", q: "LCD menggunakan kristal?", o: ["Cair", "Padat", "Gas", "Plasma"], e: 0, ex: "Liquid Crystal Display", h: "Cair" }],
    [{ s: "Fisika", q: "Frekuensi resonansi bergantung pada?", o: ["Massa", "Bentuk", "Ukuran", "Semua"], e: 3, ex: "Sifat benda", h: "Sifat" },
    { s: "MTK", q: "Bunyi dengan frekuensi > 20000 Hz disebut?", o: ["Infrasonik", "Ultrasonik", "Audiosonik", "Subsonik"], e: 1, ex: "Ultrasound", h: "Atas" },
    { s: "Kimia", q: "Spektroskopi mempelajari interaksi radiasi dengan?", o: ["Materi", "Ruang", "Waktu", "Udara"], e: 0, ex: "Materi menyerap/memancarkan", h: "Materi" },
    { s: "Logika", q: "Periskop menggunakan prinsip?", o: ["Pembiasan", "Pemantulan", "Difraksi", "Interferensi"], e: 1, ex: "Cermin memantulkan", h: "Cermin" }]
  ],
  8: [ // Chapter 8 - Kimia Organik (40 questions - 10 levels)
    [{ s: "Kimia", q: "Atom C dalam senyawa organik selalu?", o: ["4", "2", "3", "1"], e: 0, ex: "C memiliki 4 elektron valensi", h: "4 valensi" },
    { s: "Biologi", q: "Karbon adalah dasar kehidupan karena?", o: ["Banyak", "Membentuk rantai", "Ringat", "Mahal"], e: 1, ex: "Bisa rantai panjang", h: "Rantai" },
    { s: "MTK", q: "Alkana CnH2n+2. Untuk n=3, rumus?", o: ["C₃H₆", "C₃H₈", "C₃H₁₀", "C₃H₄"], e: 1, ex: "C₃H₂₍₃₎₊₂ = C₃H₈", h: "2n+2" },
    { s: "Logika", q: "Alkana disebut parafin karena?", o: ["Reaktif", "Kurang reaktif", "Beracun", "Berlebihan"], e: 1, ex: "Less affine = kurang reaktif", h: "Kurang reaktif" }],
    [{ s: "Kimia", q: "Alkena CnH2n. Untuk n=2, rumus?", o: ["C₂H₄", "C₂H₆", "C₂H₂", "C₂H₈"], e: 0, ex: "C₂H₂ₓ₂ = C₂H₄", h: "2n" },
    { s: "Biologi", q: "Etilena (C₂H₄) sebagai hormon tanaman berfungsi untuk?", o: ["Pertumbuhan", "Pematangan buah", "Fotosintesis", "Respirasi"], e: 1, ex: "Ethylene = fruit ripening", h: "Buah" },
    { s: "MTK", q: "Alkuna CnH2n-2. Untuk n=2, rumus?", o: ["C₂H₂", "C₂H₄", "C₂H₆", "C₂"], e: 0, ex: "C₂H₂ₓ₂₋₂ = C₂H₂", h: "2n-2" },
    { s: "Logika", q: "Alkuna memiliki ikatan?", o: ["Tunggal", "Rangkap 2", "Rangkap 3", "Aromatik"], e: 2, ex: "Tripel bond", h: "Tiga" }],
    [{ s: "Kimia", q: "Isomer adalah senyawa dengan?", o: ["Rumus sama", "Struktur berbeda", "Massa sama", "Warna sama"], e: 1, ex: "Sama rumus, berbeda struktur", h: "Beda struktur" },
    { s: "Biologi", q: "Glukosa dan fruktosa adalah isomer?", o: ["Fungsional", "Rantai", "Posisi", "Geometri"], e: 0, ex: "Gugus fungsi berbeda", h: "Gugus fungsi" },
    { s: "MTK", q: "Jumlah isomer C₄H₁₀?", o: ["2", "3", "4", "5"], e: 0, ex: "n-butana & isobutana", h: "2" },
    { s: "Logika", q: "Sikloalkana adalah alkana bentuk?", o: ["Lurus", "Cincin", "Cabang", "Rantai"], e: 1, ex: "Struktur cincin", h: "Cincin" }],
    [{ s: "Kimia", q: "Alkohol memiliki gugus fungsi?", o: ["-OH", "-CHO", "-COOH", "-O-"], e: 0, ex: "Gugus hidroksil", h: "OH" },
    { s: "Biologi", q: "Etanol fermentasi oleh?", o: ["Ragi", "Bakteri", "Jamur", "Alga"], e: 0, ex: "Yeast", h: "Ragi" },
    { s: "MTK", q: "Metanol (CH₃OH) Mr = ? (C=12, H=1, O=16)", o: ["30", "32", "28", "34"], e: 1, ex: "12+4+16 = 32", h: "12+4+16" },
    { s: "Logika", q: "Alkohol primer dioksidasi menghasilkan?", o: ["Aldehid", "Keton", "Asam karboksilat", "Eter"], e: 2, ex: "R-CH₂OH → R-COOH", h: "Asam" }],
    [{ s: "Kimia", q: "Eter memiliki gugus -O- di antara dua?", o: ["Alkil", "Aroil", "Asil", "Amina"], e: 0, ex: "R-O-R", h: "Alkil" },
    { s: "Biologi", q: "Dietil eter digunakan sebagai?", o: ["Bahan bakar", "Pengawet", "Anestesi", "Pewarna"], e: 2, ex: "Bius", h: "Bius" },
    { s: "MTK", q: "Aldehid memiliki gugus -CHO di ujng?", o: ["Dalam", "Ujung", "Tengah", "Bebas"], e: 1, ex: "Terminal", h: "Ujung" },
    { s: "Logika", q: "Formaldehida (HCHO) digunakan untuk?", o: ["Plastik", "Pengawet", "A & B benar", "Tidak"], e: 2, ex: "Formalin", h: "A & B" }],
    [{ s: "Kimia", q: "Keton memiliki gugus C=O di tengah rantai. Contoh?", o: ["Aseton", "Formaldehida", "Asam asetat", "Etanol"], e: 0, ex: "Aseton = propanon", h: "Aseton" },
    { s: "Biologi", q: "Aseton adalah produk metabolisme?", o: ["Normal", "Diabetes", "Penyakit", "Tidak"], e: 1, ex: "Ketosis pada diabetes", h: "Diabetes" },
    { s: "MTK", q: "Asam karboksilat memiliki gugus?", o: ["-OH", "-COOH", "-CHO", "-COOR"], e: 1, ex: "Karboksil", h: "COOH" },
    { s: "Logika", q: "Asam asetat + NaOH → ?", o: ["Ester", "Sabun", "Garam + air", "Aldehid"], e: 2, ex: "Asam + basa → garam + air", h: "Netralisasi" }],
    [{ s: "Kimia", q: "Ester memiliki gugus -COO-. Nama dari R-COO-R'?", o: ["Eter", "Ester", "Asam", "Amida"], e: 1, ex: "R-COO-R", h: "Ester" },
    { s: "Biologi", q: "Lemak tersusun dari?", o: ["Protein", "Trigliserida", "Karbohidrat", "DNA"], e: 1, ex: "Gliserol + asam lemak", h: "Lemak" },
    { s: "MTK", q: "Polimer adalah molekul besar dari monomer. Polietilena dari?", o: ["Propena", "Etena", "Stirena", "Vinil"], e: 1, ex: "n CH₂=CH₂ → (-CH₂-CH₂-)ₙ", h: "Etena" },
    { s: "Logika", q: "PVC adalah polimer dari?", o: ["Etilena", "Vinil klorida", "Stirena", "Propilena"], e: 1, ex: "Polyvinyl chloride", h: "Vinil" }],
    [{ s: "Kimia", q: "Reaksi adisi adalah...", o: ["Menambah atom", "Mengganti atom", "Memecah", "Mentransfer"], e: 0, ex: "Menambahkan ke ikatan rangkap", h: "Tambah" },
    { s: "Biologi", q: "Margarino dibuat dengan hidrogenasi?", o: ["Lemak", "Minyak", "Protein", "Air"], e: 1, ex: "Minyak → lemak padat", h: "Minyak" },
    { s: "MTK", q: "Reaksi eliminasi menghasilkan?", o: ["Alkana", "Alkena", "Alkuna", "Siklo"], e: 1, ex: "Menghilangkan → rangkap", h: "Rangkap" },
    { s: "Logika", q: "Reaksi substitusi mengganti atom H dengan?", o: ["C", "Halogen", "O", "N"], e: 1, ex: "Substitusi radikal bebas", h: "Halogen" }],
    // Extra questions for Level 9-10
    [{ s: "Kimia", q: "Aromatik adalah senyawa dengan?", o: ["Rantai", "Cincin benzena", "Gugus fungsi", "Rangkap"], e: 1, ex: "Struktur benzena", h: "Benzena" },
    { s: "Biologi", q: "Benzena bersifat karsinogenik. Artinya?", o: ["Mengobati", "Menyebabkan kanker", "Mencegah", "Netral"], e: 1, ex: "Kanker", h: "Kanker" },
    { s: "MTK", q: "Toluena (metilbenzena) Mr = ? (C=12, H=1)", o: ["90", "92", "78", "84"], e: 1, ex: "C₇H₈ = 7×12+8 = 92", h: "7×12+8" },
    { s: "Logika", q: "Naftalena (dua benzena) memiliki rumus?", o: ["C₁₀H₈", "C₁₀H₁₀", "C₁₀H₁₂", "C₁₂H₁₀"], e: 0, ex: "Dua benzena = C₁₀H₈", h: "10 C, 8 H" }],
    [{ s: "Kimia", q: "Amina adalah senyawa dengan gugus?", o: ["-NH₂", "-NO₂", "-CN", "-SH"], e: 0, ex: "Gugus amino", h: "NH₂" },
    { s: "Biologi", q: "Amino acid memiliki gugus -NH₂ dan?", o: ["-COOH", "-OH", "-CHO", "-CO"], e: 0, ex: "Asam amino = NH₂ + COOH", h: "Asam" },
    { s: "MTK", q: "Protein adalah polimer dari?", o: ["Monosakarida", "Asam amino", "Asam lemak", "Nukleotida"], e: 1, ex: "Asam amino = monomer protein", h: "Asam amino" },
    { s: "Logika", q: "Denaturasi protein disebabkan oleh?", o: ["Air", "Panas/asam/garam", "Lemak", "Gula"], e: 1, ex: "Struktur rusak", h: "Panas" }]
  ],
  9: [ // Chapter 9 - Ekosistem (40 questions - 10 levels)
    [{ s: "Biologi", q: "Produser dalam ekosistem adalah?", o: ["Konsumen", "Dekomposer", "Autotrof", "Herbivor"], e: 2, ex: "Menghasilkan makanan sendiri", h: "Autotrof" },
    { s: "Kimia", q: "Fotosintesis mengubah CO₂ menjadi?", o: ["O₂", "Glukosa", "Protein", "Lemak"], e: 1, ex: "6CO₂ + 6H₂O → C₆H₁₂O₆", h: "Glukosa" },
    { s: "MTK", q: "Transfer energi antar trofiik efisien?", o: ["100%", "10%", "50%", "90%"], e: 1, ex: "Hanya ~10%", h: "10%" },
    { s: "Logika", q: "Produser selalu ada di dasar piramida karena?", o: ["Paling banyak", "Menghasilkan", "Tidak dimakan", "A & B"], e: 1, ex: "Dasar energi", h: "Dasar" }],
    [{ s: "Biologi", q: "Konsumen primer memakan?", o: ["Karnivor", "Produser", "Konsumen lain", "Dekomposer"], e: 1, ex: "Herbivor", h: "Tumbuhan" },
    { s: "Kimia", q: "Dekomposer menguraikan materi organik menjadi?", o: ["CO₂ + mineral", "Protein", "Glukosa", "Lemak"], e: 0, ex: "Mendaur ulang", h: "CO₂" },
    { s: "MTK", q: "Jaring-jaring makanan lebih akurat dari rantai karena?", o: ["Sederhana", "Kompleks", "Lengkap", "Pendek"], e: 1, ex: "Banyak interaksi", h: "Kompleks" },
    { s: "Logika", q: "Eliminasi rubah jika ular punah?", o: ["Tidak ada", "Populasi menurun", "Populasi meningkat", "Lain"], e: 1, ex: "Makanan rubah berkurang", h: "Berkurang" }],
    [{ s: "Biologi", q: "Siklus karbon melalui?", o: ["Air", "Udara/tanah", "Matahari", "Mineral"], e: 1, ex: "CO₂ di atmosfer", h: "Atmosfer" },
    { s: "Kimia", q: "CO₂ meningkat di atmosfer menyebabkan?", o: ["Dingin", "Pemanasan global", "Hujan asam", "Normal"], e: 1, ex: "Efek rumah kaca", h: "Pemanasan" },
    { s: "MTK", q: "Siklus nitrogen: N₂ → NH₃ (fiksasi). Bakteri?", o: ["Nitrosomonas", "Rhizobium", "Nitrobacter", "Azotobacter"], e: 1, ex: "Rhizobium di akar", h: "Akar" },
    { s: "Logika", q: "Pupuk urea menyediakan?", o: ["Fosfor", "Kalium", "Nitrogen", "Air"], e: 2, ex: "N tinggi", h: "Nitrogen" }],
    [{ s: "Biologi", q: "Eutrofikasi adalah?", o: ["Pencemaran", "Perbloom ganggang", "Kekurangan nutrisi", "Air bersih"], e: 1, ex: "Nutrien ↑ → ganggang ↑", h: "Ganggang" },
    { s: "Kimia", q: "Hujan asam disebabkan oleh?", o: ["CO₂", "SO₂ dan NOₓ", "CH₄", "O₃"], e: 1, ex: "Oksida sulfur dan nitrogen", h: "SO₂" },
    { s: "MTK", q: "pH hujan normal ~5.6. Asam jika <?", o: ["5", "6", "7", "4"], e: 0, ex: "< 5.6", h: "Kecil" },
    { s: "Logika", q: "Pencegahan hujan asam?", o: ["Membakar", "Filter", "Tanpa", "Banyak"], e: 1, ex: "Scrubber", h: "Filter" }],
    [{ s: "Biologi", q: "Populasi adalah kelompok?", o: ["Spesies sama", "Area sama", "Waktu sama", "Semua"], e: 3, ex: "Spesies sama di tempat sama", h: "Semua" },
    { s: "Kimia", q: "Bioakumulasi adalah penumpukan zat di?", o: ["Air", "Tubuh", "Tanah", "Udara"], e: 1, ex: "Meningkat di rantai makanan", h: "Tubuh" },
    { s: "MTK", q: "Pertumbuhan populasi eksponensial jika?", o: ["Tetap", "Meningkat", "Menurun", "Nol"], e: 1, ex: "N(t) = N₀eʳᵗ", h: "Naik" },
    { s: "Logika", q: "Populasi manusia sekarang mengikuti model?", o: ["Logistik", "Eksponensial", "Stasioner", "Menurun"], e: 0, ex: "Mendekati carrying capacity", h: "Logistik" }],
    [{ s: "Biologi", q: "Kapasitas dukung (carrying capacity) adalah?", o: ["Max individu", "Ruang", "Makanan", "Semua"], e: 0, ex: "K max ekosistem", h: "Max" },
    { s: "Kimia", q: "Pestisida PCB bersifat?", o: ["Mudah terurai", "Persisten", "Berguna", "Alami"], e: 1, ex: "Tidak mudah terurai", h: "Tahan" },
    { s: "MTK", q: "Umur paruh adalah waktu yang dibutuhkan untuk?", o: ["Populasi dua kali", "Setengah berkurang", "Menambah", "Nol"], e: 1, ex: "Berkurang setengah", h: "Setengah" },
    { s: "Logika", q: "DDB (pencemar) meningkat di setiap trofik karena?", o: ["Reproduksi", "Bioakumulasi", "Diet", "Air"], e: 1, ex: "Menumpuk", h: "Menumpuk" }],
    [{ s: "Biologi", q: "Invasi spesies terjadi ketika?", o: ["Asli", "Baru", "Langka", "Punah"], e: 1, ex: "Spesies baru masuk ekosistem", h: "Baru" },
    { s: "Kimia", q: "Bahan bakar fosil terbentuk dari?", o: ["Tumbuhan purba", "Dinosaurus", "Air", "Matahari"], e: 0, ex: "Burning fossil", h: "Tumbuhan" },
    { s: "MTK", q: "Energi surya mencapai bumi ~1366 W/m². Dipantulkan ~30% (albedo). Yang diserap?", o: ["70%", "30%", "100%", "1366 W"], e: 0, ex: "100% - 30% = 70%", h: "70%" },
    { s: "Logika", q: "Energi terbarukan termasuk?", o: ["Batubara", "Surya", "Minyak", "Gas"], e: 1, ex: "Tidak habis", h: "Surya" }],
    [{ s: "Biologi", q: "Simbiosis mutualisme kedua pihak?", o: ["Rugi", "Untung", "Netral", "Tidak"], e: 1, ex: "Saling menguntungkan", h: "Saling" },
    { s: "Kimia", q: "Bakteri rhizobium di akar tanaman kacang merupakan simbiosis?", o: ["Parasitisme", "Mutualisme", "Komensalisme", "Predasi"], e: 1, ex: "N₂ → NH₃ + makanan", h: "Saling" },
    { s: "MTK", q: "Umur paruh karbon-14 adalah 5730 tahun. Jika tersisa 25%, usia?", o: ["5730 th", "11460 th", "17190 th", "28650 th"], e: 1, ex: "2×5730 = 11460", h: "2 paruh" },
    { s: "Logika", q: "Piramida biomassa menunjukkan?", o: ["Jumlah", "Massa", "Energi", "Semua"], e: 1, ex: "Massa di setiap trofik", h: "Massa" }],
    // Extra questions for Level 9-10
    [{ s: "Biologi", q: "Produser autotrof menggunakan?", o: ["Fotosintesis", "Kemosintesis", "A atau B", "Respirasi"], e: 2, ex: "Cahaya atau kimia", h: "Energi" },
    { s: "Kimia", q: "Siklus air: penguapan → kondensasi → presipitasi → apa?", o: ["Infiltrasi", "Pengumpulan", "A & B benar", "Transpirasi"], e: 2, ex: "Kembali ke atmosfer", h: "Siklus" },
    { s: "MTK", q: "Laju pertumbuhan populasi N = N₀eʳᵗ. r adalah?", o: ["Waktu", "Populasi", "Laju pertumbuhan", "Kapasitas"], e: 2, ex: "Growth rate", h: "r" },
    { s: "Logika", q: "Perubahan iklim mempengaruhi distribusi spesies karena?", o: ["Suhu", "Habitat", "Makanan", "Semua"], e: 3, ex: "Semua faktor", h: "Kompleks" }],
    [{ s: "Biologi", q: "Biom adalah ekosistem besar dengan?", o: ["Iklim sama", "Flora sama", "Fauna sama", "Semua"], e: 3, ex: "Iklim & kehidupan sama", h: "Besar" },
    { s: "Kimia", q: "Ozon (O₃) terbentuk dari O₂ dengan energi?", o: ["Matahari", "Panas", "Petir", "Semua"], e: 3, ex: "UV matahari", h: "Energi" },
    { s: "MTK", q: "Biodiversity index tinggi menunjukkan ekosistem?", o: ["Terancam", "Sehat", "Baru", "Kecil"], e: 1, ex: "Banyak spesies = sehat", h: "Banyak" },
    { s: "Logika", q: "Rewilding adalah?", o: ["Buang liar", "Pulihkan ekosistem alami", "Tambah ternak", "Buat taman"], e: 1, ex: "Mengembalikan alam liar", h: "Alami" }]
  ],
  10: [ // Chapter 10 - Fisika Modern (40 questions - 10 levels)
    [{ s: "Fisika", q: "Teori relativitas khusus diusulkan oleh?", o: ["Newton", "Einstein", "Bohr", "Planck"], e: 1, ex: "Albert Einstein 1905", h: "Einstein" },
    { s: "MTK", q: "E = mc² adalah rumus?", o: ["Massa-energi", "Energi kinetik", "Potensial", "Total"], e: 0, ex: "Kesetaraan massa-energi", h: "Massa = energi" },
    { s: "Kimia", q: "Atom terdiri dari?", o: ["Proton + elektron", "Proton + neutron + elektron", "Neutron saja", "Elektron saja"], e: 1, ex: "Inti: p + n, luar: e", h: "Tiga partikel" },
    { s: "Logika", q: "Mengapa satelit tidak jatuh ke bumi?", o: ["Gravitasi nol", "Kecepatan tinggi", "Massa kecil", "Tidak ada"], e: 1, ex: "v orbit mengimbangi gravitasi", h: "Orbit" }],
    [{ s: "Fisika", q: "Postulat Einstein: kecepatan cahaya di ruang hampa?", o: ["Bergantung sumber", "Selalu sama", "Bervariasi", "Tidak ada"], e: 1, ex: "c = 3×10⁸ m/s konstan", h: "Konstan" },
    { s: "MTK", q: "Dilasi waktu: waktu bergerak lebih lambat jika?", o: ["Diam", "Bergerak cepat", "Massa besar", "Tidak"], e: 1, ex: "Waktu relatif pada kecepatan tinggi", h: "Cepat" },
    { s: "Kimia", q: "Nomor atom menunjukkan?", o: ["Massa", "Proton", "Neutron", "Elektron"], e: 1, ex: "Jumlah proton", h: "Proton" },
    { s: "Logika", q: "Fusi nuklir terjadi di?", o: ["Reaktor", "Matahari", "Luar angkasa", "Bumi"], e: 1, ex: "Di inti bintang", h: "Bintang" }],
    [{ s: "Fisika", q: "Kontraksi panjang: panjang berkurang jika?", o: ["Diam", "Bergerak cepat", "Massa kecil", "Tidak"], e: 1, ex: "Pada kecepatan mendekati c", h: "Cepat" },
    { s: "MTK", q: "Massa relativistic m = m₀/√(1-v²/c²). Jika v → c, m?", o: ["M₀", "Menjadi tak hingga", "Nol", "Tetap"], e: 1, ex: "Massa tak hingga", h: "Tak hingga" },
    { s: "Kimia", q: "Isotop adalah atom dengan jumlah?", o: ["Proton sama, neutron berbeda", "Neutron sama, proton berbeda", "Elektron berbeda", "Semua sama"], e: 0, ex: "Nomor atom sama, nomor massa berbeda", h: "Neutron" },
    { s: "Logika", q: "Reaksi fusi menghasilkan energi karena?", o: ["Massa hilang", "Massa naik", "Massa tetap", "Tidak"], e: 0, ex: "E = Δmc²", h: "Massa" }],
    [{ s: "Fisika", q: "Dualisme partikel-gelombang: cahaya bersifat?", o: ["Hanya gelombang", "Hanya partikel", "Keduanya", "Tidak"], e: 2, ex: "Dual nature", h: "Keduanya" },
    { s: "MTK", q: "Efek fotolistrik: elektron keluar jika cahaya?", o: ["Rendah frekuensi", "Tinggi frekuensi", "Frekuensi rendah", "Tidak"], e: 1, ex: "Frekuensi > ambang", h: "Frekuensi" },
    { s: "Kimia", q: "Orbital adalah?", o: ["Lintasan pasti", "Daerah peluang", "Jari-jari", "Energi"], e: 1, ex: "Daerah dengan peluang tinggi elektron", h: "Peluang" },
    { s: "Logika", q: "Laser menghasilkan cahaya yang?", o: ["Acak", "Koheren", "Putih", "Tidak"], e: 1, ex: "Cahaya sefase", h: "Koheren" }],
    [{ s: "Fisika", q: "Bohr mengusulkan elektron bergerak di?", o: ["Lintasan sembarang", "Orbit diskrit", "Mengikuti nucleus", "Tidak"], e: 1, ex: "Orbit dengan energi tetap", h: "Diskrit" },
    { s: "MTK", q: "Energi foton E = hf. Jika f 2x, E menjadi?", o: ["Tetap", "2x", "4x", "½x"], e: 1, ex: "E ∝ f", h: "Linear" },
    { s: "Kimia", q: "Konfigurasi elektron menentukan?", o: ["Warna", "Sifat kimia", "Massa", "Ukuran"], e: 1, ex: "Valensi dan ikatan", h: "Kimia" },
    { s: "Logika", q: "Mengapa langit biru?", o: ["Cahaya merah", "Hamburan Rayleigh", "Polusi", "Air"], e: 1, ex: "Cahaya biru tersebar", h: "Hamburan" }],
    [{ s: "Fisika", q: "Radiasi benda hitam: benda memancarkan lebih banyak jika?", o: ["Dingin", "Panas", "Massa besar", "Tidak"], e: 1, ex: "Suhu tinggi = radiasi tinggi", h: "Panas" },
    { s: "MTK", q: "ΔxΔp ≥ ℏ/2 adalah prinsip?", o: ["Energi", "Momentum", "Ketidakpastian", "Kekekalan"], e: 2, ex: "Heisenberg uncertainty", h: "Tidak pasti" },
    { s: "Kimia", q: "Unsur dengan nomor atom 6 adalah?", o: ["Nitrogen", "Oksigen", "Karbon", "Boron"], e: 2, ex: "C = 6", h: "6" },
    { s: "Logika", q: "Radioaktivitas pertama kali ditemukan oleh?", o: ["Curie", "Becquerel", "Rutherford", "Einstein"], e: 1, ex: "Henri Becquerel 1896", h: "Becquerel" }],
    [{ s: "Fisika", q: "Partikel alpha adalah?", o: ["Elektron", "Helium", "Proton", "Neutron"], e: 1, ex: "Inti He-4", h: "Helium" },
    { s: "MTK", q: "Waktu paruh adalah waktu yang dibutuhkan untuk?", o: ["100%", "50%", "25%", "10%"], e: 1, ex: "Setengah berkurang", h: "50%" },
    { s: "Kimia", q: "Reaksi fisi adalah pemecahan?", o: ["Inti ringan", "Inti berat", "Elektron", "Tidak"], e: 1, ex: "Inti uranium", h: "Berat" },
    { s: "Logika", q: "Reaktor nuklir menggunakan bahan bakar?", o: ["Uranium", "Hidrogen", "Helium", "Karbon"], e: 0, ex: "U-235 atau Pu-239", h: "Uranium" }],
    [{ s: "Fisika", q: "Gaya nuklir kuat bekerja pada jarak?", o: ["Jauh", "Sangat pendek", "Sedang", "Tidak"], e: 1, ex: "Hanya dalam inti", h: "Pendek" },
    { s: "MTK", q: "Bilangan kuantum utama n menentukan?", o: ["Orbit", "Energi", "Arah", "Spin"], e: 1, ex: "Tingkat energi", h: "Energi" },
    { s: "Kimia", q: "Unsur golonganan sama memiliki?", o: ["Proton sama", "Elektron valensi sama", "Massa sama", "Neutron sama"], e: 1, ex: "Konfigurasi valence sama", h: "Elektron" },
    { s: "Logika", q: "Mengapa uranium-235 digunakan di reaktor?", o: ["Murah", "Fisil", "Berlimpah", "Aman"], e: 1, ex: "Dapat dibelah neutron", h: "Fisil" }],
    [{ s: "Fisika", q: "Partikel Higgs memberikan?", o: ["Massa", "Muatan", "Spin", "Energi"], e: 0, ex: "Higgs field memberi massa", h: "Massa" },
    { s: "MTK", q: "Foton memiliki momentum karena?", o: ["Massa", "Energi", "Tidak ada", "Bervariasi"], e: 1, ex: "p = E/c", h: "Energi" },
    { s: "Kimia", q: "Unsur periode 3 memiliki?", o: ["3 orbit", "3 subkulit", "3 elektron", "3 jenis"], e: 0, ex: "n = 3", h: "Orbit" },
    { s: "Logika", q: "LCD bekerja menggunakan kristal cair yang?", o: ["Mengalir", "Mengubah orientasi dengan medan", "Berubah warna", "Berubah fase"], e: 1, ex: "Oriented by electric field", h: "Orientasi" }],
    // Extra questions for Level 9-10
    [{ s: "Fisika", q: "Medan Higgs ada di mana-mana?", o: ["Tidak ada", "Di mana-mana", "Hanya di LHC", "Tidak"], e: 1, ex: "Fill all space", h: "Di mana-mana" },
    { s: "MTK", q: "Partikel antimateri memiliki muatan?", o: ["Sama", "Berlawanan", "Nol", "Bervariasi"], e: 1, ex: "Positron = +e", h: "Berlawanan" },
    { s: "Kimia", q: "Nomor massa adalah?", o: ["Proton", "Neutron", "Proton + neutron", "Elektron"], e: 2, ex: "A = Z + N", h: "P + N" },
    { s: "Logika", q: "Quark adalah partikel penyusun?", o: ["Elektron", "Proton dan neutron", "Foton", "Neutrino"], e: 1, ex: "Proton: 2 up + 1 down", h: "Inti" }],
    [{ s: "Fisika", q: "String theory menjelaskan semua gaya dengan?", o: ["Titik", "Tali bergetar", "Medan", "Gelombang"], e: 1, ex: "Dawai 1 dimensi", h: "Tali" },
    { s: "MTK", q: "Konstanta Planck h = 6.63×10⁻³⁴ Js. Berlaku untuk?", o: ["Klasik", "Kuantum", "Relativitas", "Mekanika"], e: 1, ex: "Dasar mekanika kuantum", h: "Kuantum" },
    { s: "Kimia", q: "Elektron valensi menentukan?", o: ["Ukuran", "Reaktivitas", "Warna", "Massa"], e: 1, ex: "Kemampuan berikatan", h: "Ikatan" },
    { s: "Logika", q: "Mengapa neutrino sulit dideteksi?", o: ["Massa besar", "Interaksi sangat lemah", "Muatan", "Berlaku"], e: 1, ex: "Very weakly interacting", h: "Lemah" }]
  ]
};

// ========== GAME FUNCTIONS ==========

// Initialize game
function initGame() {
  loadProgress();
  createStars();
  updateProgressDisplay();
}

// Show chapter selection
function showChapterSelect() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("chapterSelect").style.display = "block";
  document.getElementById("levelSelect").style.display = "none";
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "none";
  updateProgressDisplay();
}

// Update progress display
function updateProgressDisplay() {
  for (let i = 1; i <= 10; i++) {
    const progress = gameState.chapterProgress[i-1] || 0;
    const progressBar = document.getElementById("progress" + i);
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
  }
}

// Select chapter
function selectChapter(chapter) {
  gameState.currentChapter = chapter;
  document.getElementById("chapterSelect").style.display = "none";
  document.getElementById("levelSelect").style.display = "block";
  document.getElementById("chapterNameDisplay").textContent = chapterInfo[chapter].n;
  document.getElementById("chapterNameDisplay").style.color = chapterInfo[chapter].c;
  showLevel(chapter);
}

// Show level grid
function showLevel(chapter) {
  const grid = document.getElementById("levelsGrid");
  grid.innerHTML = "";
  
  for (let i = 1; i <= 10; i++) {
    const levelKey = `${chapter}-${i}`;
    const stars = gameState.levelStars[levelKey] || 0;
    const isUnlocked = i === 1 || (gameState.levelStars[`${chapter}-${i-1}`] > 0);
    
    const card = document.createElement("div");
    card.className = "level-card" + (isUnlocked ? "" : " locked");
    card.onclick = () => { if (isUnlocked) startLevel(i); };
    
    let starsHtml = "";
    for (let s = 0; s < 3; s++) {
      starsHtml += s < stars ? "⭐" : "☆";
    }
    
    card.innerHTML = `
      <div class="level-number">${i}</div>
      <div class="level-stars">${starsHtml}</div>
      <div class="level-status">${isUnlocked ? (stars > 0 ? "Selesai" : "Belum dimainkan") : "Terkunci"}</div>
    `;
    
    grid.appendChild(card);
  }
}

// Start level
function startLevel(level) {
  gameState.currentLevel = level;
  gameState.currentStage = 1;
  gameState.score = 0;
  gameState.lives = 3;
  gameState.correctAnswers = 0;
  gameState.wrongAnswers = 0;
  gameState.stageCorrect = [false, false, false, false];
  gameState.hintsUsed = 0;
  gameState.startTime = Date.now();
  
  document.getElementById("levelSelect").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";
  
  loadQuestion();
}

// Load question
function loadQuestion() {
  const chapter = gameState.currentChapter;
  const level = gameState.currentLevel;
  const stage = gameState.currentStage;
  
  // Get random question index for variety
  const chapterQuestions = qdb[chapter];
  const questionIndex = (level - 1) % chapterQuestions.length;
  const questions = chapterQuestions[questionIndex];
  
  const question = questions[stage - 1];
  
  document.getElementById("currentChapter").textContent = chapter;
  document.getElementById("currentLevel").textContent = level;
  document.getElementById("currentStage").textContent = stage + "/4";
  document.getElementById("currentScore").textContent = gameState.score;
  document.getElementById("currentLives").textContent = "❤️".repeat(gameState.lives);
  
  const progress = (stage - 1) * 25;
  document.getElementById("progressBar").style.width = progress + "%";
  
  document.getElementById("stageBadge").textContent = "Tahap " + stage;
  document.getElementById("subjectBadge").textContent = question.s;
  document.getElementById("subjectBadge").className = "subject-badge " + question.s.toLowerCase();
  document.getElementById("questionText").textContent = question.q;
  
  const optionsContainer = document.getElementById("optionsContainer");
  optionsContainer.innerHTML = "";
  
  const letters = ["A", "B", "C", "D"];
  question.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => checkAnswer(i);
    optionsContainer.appendChild(btn);
  });
  
  document.getElementById("feedback").className = "feedback";
  document.getElementById("hintBtn").disabled = false;
  document.getElementById("hintText").className = "hint-text";
}

// Check answer
function checkAnswer(selectedIndex) {
  const chapter = gameState.currentChapter;
  const level = gameState.currentLevel;
  const stage = gameState.currentStage;
  const chapterQuestions = qdb[chapter];
  const questionIndex = (level - 1) % chapterQuestions.length;
  const questions = chapterQuestions[questionIndex];
  const question = questions[stage - 1];
  
  const options = document.querySelectorAll(".option-btn");
  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === question.e) {
      opt.classList.add("correct");
    } else if (i === selectedIndex && i !== question.e) {
      opt.classList.add("wrong");
    }
  });
  
  const feedback = document.getElementById("feedback");
  feedback.className = "feedback show";
  
  if (selectedIndex === question.e) {
    gameState.correctAnswers++;
    gameState.stageCorrect[stage - 1] = true;
    gameState.score += 100;
    document.getElementById("feedbackTitle").textContent = "✅ Benar!";
    feedback.classList.add("correct");
  } else {
    gameState.wrongAnswers++;
    gameState.lives--;
    document.getElementById("feedbackTitle").textContent = "❌ Salah!";
    feedback.classList.add("wrong");
  }
  
  document.getElementById("feedbackExplanation").textContent = question.ex;
  document.getElementById("currentScore").textContent = gameState.score;
  document.getElementById("currentLives").textContent = "❤️".repeat(gameState.lives);
  
  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("skipBtn").style.display = "none";
}

// Next question
function nextQuestion() {
  if (gameState.lives <= 0) {
    showResult();
    return;
  }
  
  if (gameState.currentStage < 4) {
    gameState.currentStage++;
    loadQuestion();
  } else {
    showResult();
  }
}

// Skip question
function skipQuestion() {
  if (gameState.currentStage < 4) {
    gameState.currentStage++;
    gameState.wrongAnswers++;
    loadQuestion();
  } else {
    showResult();
  }
}

// Show hint
function showHint() {
  if (gameState.hintsUsed >= gameState.maxHints) return;
  
  const chapter = gameState.currentChapter;
  const level = gameState.currentLevel;
  const stage = gameState.currentStage;
  const chapterQuestions = qdb[chapter];
  const questionIndex = (level - 1) % chapterQuestions.length;
  const questions = chapterQuestions[questionIndex];
  const question = questions[stage - 1];
  
  gameState.hintsUsed++;
  gameState.score = Math.max(0, gameState.score - 10);
  document.getElementById("currentScore").textContent = gameState.score;
  
  const hintText = document.getElementById("hintText");
  hintText.textContent = "💡 " + question.h;
  hintText.className = "hint-text show";
  
  if (gameState.hintsUsed >= gameState.maxHints) {
    document.getElementById("hintBtn").disabled = true;
  }
}

// Show result
function showResult() {
  const ch = gameState.currentChapter;
  const lv = gameState.currentLevel;
  
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";
  
  const accuracy = gameState.correctAnswers > 0 
    ? Math.round((gameState.correctAnswers / 4) * 100) 
    : 0;
  
  const timeUsed = Math.floor((Date.now() - gameState.startTime) / 1000);
  const timeBonus = Math.max(0, 300 - timeUsed);
  const finalScore = gameState.score + (gameState.lives > 0 ? timeBonus : 0);
  
  // Determine stars
  let stars = 0;
  if (gameState.correctAnswers >= 2) stars = 1;
  if (gameState.correctAnswers >= 3) stars = 2;
  if (gameState.correctAnswers === 4 && gameState.lives > 0) stars = 3;
  
  // Update state
  gameState.levelStars[`${ch}-${lv}`] = Math.max(gameState.levelStars[`${ch}-${lv}`] || 0, stars);
  
  // Update chapter progress
  const chapterKey = (ch - 1) * 10 + lv;
  if (stars > 0) {
    gameState.chapterProgress[ch - 1] = Math.max(gameState.chapterProgress[ch - 1], chapterKey * 10);
  }
  
  saveProgress();
  
  // Display results
  const resultTitle = document.getElementById("resultTitle");
  if (gameState.lives > 0 && gameState.correctAnswers >= 3) {
    resultTitle.textContent = "🎉 Sempurna!";
    resultTitle.className = "result-title success";
  } else if (gameState.lives > 0) {
    resultTitle.textContent = "✅ Lulus!";
    resultTitle.className = "result-title success";
  } else {
    resultTitle.textContent = "❌ Gagal!";
    resultTitle.className = "result-title fail";
  }
  
  document.getElementById("scoreDisplay").textContent = finalScore;
  document.getElementById("correctCount").textContent = gameState.correctAnswers;
  document.getElementById("wrongCount").textContent = gameState.wrongAnswers;
  document.getElementById("accuracy").textContent = accuracy + "%";
  document.getElementById("timeBonus").textContent = timeBonus;
  
  // Show badges
  const badgesList = document.getElementById("badgesList");
  badgesList.innerHTML = "";
  if (stars >= 1) {
    badgesList.innerHTML += `<div class="earned-badge"><span>⭐</span><span>Pemula</span></div>`;
  }
  if (stars >= 2) {
    badgesList.innerHTML += `<div class="earned-badge"><span>⭐⭐</span><span>Mahir</span></div>`;
  }
  if (stars >= 3) {
    badgesList.innerHTML += `<div class="earned-badge"><span>⭐⭐⭐</span><span>Ahli</span></div>`;
  }
  if (gameState.correctAnswers === 4) {
    badgesList.innerHTML += `<div class="earned-badge"><span>🧠</span><span>Jenius</span></div>`;
  }
  if (gameState.lives === 3) {
    badgesList.innerHTML += `<div class="earned-badge"><span>💎</span><span>Sempurna</span></div>`;
  }
}

// Retry level
function retryLevel() {
  startLevel(gameState.currentLevel);
}

// Save progress to localStorage
function saveProgress() {
  const progressData = {
    chapterProgress: gameState.chapterProgress,
    levelStars: gameState.levelStars
  };
  localStorage.setItem("neuroquest_progress", JSON.stringify(progressData));
}

// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem("neuroquest_progress");
  if (saved) {
    const data = JSON.parse(saved);
    gameState.chapterProgress = data.chapterProgress || Array(10).fill(0);
    gameState.levelStars = data.levelStars || {};
  }
}

// Create stars animation
function createStars() {
  const starsContainer = document.getElementById("stars");
  if (!starsContainer) return;
  
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = Math.random() * 3 + 2 + "px";
    star.style.height = star.style.width;
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

// Initialize when page loads
window.onload = function() {
  initGame();
};
