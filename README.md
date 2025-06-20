📱 QR Menü ve Sipariş Takip Uygulaması
Bu proje, restoran ve kafeler için geliştirilen QR kodlu dijital menü ve sipariş takip sistemidir.
Amaç, kullanıcıların (müşterilerin) masalara yerleştirilen QR kodları mobil cihazlarıyla okutarak menüyü görüntülemelerini ve sipariş verebilmelerini sağlamaktır.

🚀 Teknolojiler
Backend: Spring Boot

Veritabanı: MongoDB

Frontend: React

QR Kod Üretimi: Dinamik olarak her masa için özel QR kod

Durum: Geliştirme aşamasında

🎯 Özellikler
✅ Masaya özel QR kod ile dijital menü görüntüleme
✅ Sipariş oluşturma ve takip
✅ Kullanıcı rolleri:

Admin: Menü ve kullanıcı yönetimi

Garson: Sipariş takibi

Müşteri: Menü görüntüleme ve sipariş verme
✅ Basit ve hızlı kullanıcı deneyimi
✅ Mobil uyumlu arayüz

🗺️ Proje Yapısı
scss
Kopyala
Düzenle
qr-menu-app  
├── backend (Spring Boot API)  
├── frontend (React uygulaması)  
└── README.md  
⚙️ Kurulum
Backend (Spring Boot)
bash
Kopyala
Düzenle
cd backend  
./mvnw clean install  
./mvnw spring-boot:run  
Frontend (React)
bash
Kopyala
Düzenle
cd frontend  
npm install  
npm start  
📌 Notlar
Kimlik doğrulama (authentication) şu anda bulunmamaktadır.

JWT daha önce test edilmiş ancak son versiyonda kaldırılmıştır.

QR kod üretimi için test aşamasında harici kütüphaneler denenmektedir.

✨ Yol Haritası
 QR kod üretimi ve yönetim ekranı

 Sipariş detayları için admin panel

 Kullanıcı authentication ve yetkilendirme

 Daha gelişmiş sipariş yönetimi

 Bildirim desteği

💻 Geliştirici
Bu proje öğrenme ve portföy geliştirme amacıyla hazırlanmıştır.
