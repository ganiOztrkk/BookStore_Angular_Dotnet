# ShoeStore FullStack E-Commerce 

demo: https://ecommerce.ganiozturk.com/

Projem, ayakkabı satışı odaklı bir e-ticaret platformu.



Projemizin İşlevselliği:🌟

-Ürünler, kategoriye veya anahtar kelimeye göre filtrelenerek bulunabilir.

-Kullanıcılar, giriş yaparak veya yapmadan sipariş oluşturabilir.

-Kullanıcı giriş yapmadığında, sepetindeki ürünler LocalStore'de saklanır.

-Kullanıcı giriş yaptığında, sepetindeki ürünler veritabanına kaydedilir.

-Giriş yapmayan kullanıcılar sepet oluşturduktan sonra giriş yaparlarsa, bu veriler LocalStoreden veritabanına aktarılır.

-Kullanıcılar, geçmiş siparişlerini ve sipariş durumlarını görüntüleyebilir.

-Admin girişi yapılarak tüm siparişler görüntülenebilir ve sipariş durumları güncellenebilir.

-Admin, siparişlerin durumunu panel üzerinden kontrol edebilir ve ürün CRUD işlemlerini gerçekleştirebilir.



Teknik Altyapı:🛠️

-Backend tarafında, .NET 8 ile WebAPI geliştirdim.

-Frontend tarafında Angular 17 ile geliştirme yaptım.

-Veritabanı olarak Docker üzerinde MSSQL kullandım ve ORM aracı olarak Entity Framework tercih ettim.

-Code First yaklaşımıyla ilişkisel bir veritabanı oluşturdum.

-Ödeme altyapısı için iyzico entegrasyonu ve mail bilgilendirme sistemi için MailKit kullandım.

-Kullanıcı kimlik doğrulaması için JWT (JSON Web Token) kullandım.



Gelecek Planlar:📈

-Kullanıcı profil sayfası oluşturmak

-Ürün detay sayfasını geliştirmek

-Sipariş fatura PDF'i oluşturmak

-Proje backendini mimariye taşımak

-Hem backend hem frontend tarafında validasyonları işlemlerini sağlamak

-Arayüzde iyileştirmelere gitmek ve platforma farklı işlevsellikler kazandırmak
