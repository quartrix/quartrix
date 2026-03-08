const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://quartrix-eb95f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

async function kirimNotifikasiTugas(mapel, deskripsi) {

const snapshot = await db.ref("fcmtokens").once("value");

  if (!snapshot.exists()) {
    console.log("Tidak ada token siswa - siswa perlu membuka dashboard dulu untuk menerima notifikasi");
    return { success: 0, message: "Tidak ada token tersimpan" };
  }

  const tokens = [];

  snapshot.forEach((child) => {
    // Key adalah token itu sendiri
    tokens.push(child.key);
  });

  const uniqueTokens = [...new Set(tokens)];
  
  console.log("Mengirim notifikasi ke", uniqueTokens.length, "tokens");

  // Format pesan untuk FCM - menggunakan notification field untuk foreground
  // dan data field untuk background
  const message = {
    notification: {
      title: "📝 Tugas Baru Ditambahkan",
      body: `${mapel} - ${deskripsi.substring(0, 60)}`
    },
    data: {
      title: "📝 Tugas Baru Ditambahkan",
      body: `${mapel} - ${deskripsi.substring(0, 60)}`,
      mapel: mapel,
      deskripsi: deskripsi,
      click_action: "dashboard.html"
    },
    tokens: uniqueTokens,
    webpush: {
      notification: {
        icon: "https://i.ibb.co.com/7xxVWwH7/IMG-8428.png",
        badge: "https://i.ibb.co.com/7xxVWwH7/IMG-8428.png",
        tag: "tugas-notification",
        requireInteraction: true
      },
      fcmOptions: {
        link: "/dashboard.html"
      }
    }
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    console.log("Total token:", uniqueTokens.length);
    console.log("Berhasil:", response.successCount);
    console.log("Gagal:", response.failureCount);
    
    // Log details of failures if any
    if (response.failureCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.error("Token gagal:", uniqueTokens[idx], resp.error.message);
        }
      });
    }
    
    return { 
      success: response.successCount, 
      failed: response.failureCount 
    };
  } catch (error) {
    console.error("Error sending multicast:", error);
    throw error;
  }
}

module.exports = kirimNotifikasiTugas;
