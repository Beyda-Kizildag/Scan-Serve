package com.qrmenu.grmenu.config;

import com.qrmenu.grmenu.model.Category;
import com.qrmenu.grmenu.model.MenuItem;
import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.MenuItemRepository;
import com.qrmenu.grmenu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        // The DataInitializer class is responsible for populating the database with initial data.
        // It implements the CommandLineRunner interface, which allows it to run specific code
        // after the Spring Boot application has started.

        // This class is primarily used to:
        // 1. Clear existing data in the database (e.g., users and menu items).
        // 2. Add predefined users, such as admin, waiters, and customers.
        // 3. Populate the database with initial menu items, categorized into coffees, desserts, and teas.
        // 4. Ensure that the application has a consistent set of data for testing or initial deployment.

        // Note: Frequent use of this class in production environments can lead to data loss,
        // as it deletes and overwrites existing data. It is recommended to use this class
        // only during development or for resetting the database to a known state.

        // Kullanıcıları temizle ve başlangıç verilerini ekle
        userRepository.deleteAll();

        // Admin kullanıcısı oluştur
        if (!userRepository.findByRoleAndActive("ADMIN", true).isEmpty()) {
            return;
        }

        User admin = new User("admin", "admin123", "ADMIN");
        userRepository.save(admin);

        // Örnek garsonlar oluştur
        User waiter1 = new User("Ahmet", "waiter123", "WAITER");
        User waiter2 = new User("Mehmet", "waiter123", "WAITER");
        User waiter3 = new User("Ayşe", "waiter123", "WAITER");
        User waiter4 = new User("Fatma", "waiter123", "WAITER");

        userRepository.save(waiter1);
        userRepository.save(waiter2);
        userRepository.save(waiter3);
        userRepository.save(waiter4);

        // Müşteriler
        User customer1 = new User("customer1", "customer123", "CUSTOMER");
        User customer2 = new User("customer2", "customer123", "CUSTOMER");
        userRepository.save(customer1);
        userRepository.save(customer2);

        // Sıcak Kahveler
        List<MenuItem> hotCoffees = Arrays.asList(
            new MenuItem(
                "Espresso",
                "Yoğun aromalı, kısa sürede yüksek basınçla hazırlanan İtalyan usulü sert kahve. Küçük fincanda servis edilir ve enerji verir. (5 kcal)",
                40.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/espresso.jpg"
            ),
            new MenuItem(
                "Americano",
                "Espresso üzerine sıcak su eklenerek hazırlanan, hafif içimli ve büyük bardakta sunulan klasik kahve. Uzun süreli keyif için idealdir. (10 kcal)",
                45.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/americano.jpg"
            ),
            new MenuItem(
                "Cappuccino",
                "Espresso, buharda ısıtılmış süt ve yoğun süt köpüğüyle yapılan, üstü kakao ile süslenen İtalyan kahvesi. Dengeli ve yumuşak içimlidir. (80 kcal)",
                50.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/cappuccino.jpg"
            ),
            new MenuItem(
                "Latte",
                "Bol süt ve ince süt köpüğüyle hazırlanan, espresso bazlı yumuşak içimli kahve. Büyük bardakta servis edilir, hafif ve kremamsı bir tada sahiptir. (120 kcal)",
                55.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/latte.jpg"
            )
        );

        // Soğuk Kahveler
        List<MenuItem> coldCoffees = Arrays.asList(
            new MenuItem(
                "Ice Americano",
                "Espresso shotlarının soğuk su ve bol buz ile buluştuğu, ferahlatıcı ve düşük kalorili bir kahve seçeneği. Sıcak yaz günleri için idealdir. (10 kcal)",
                50.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/ice-americano.jpg"
            ),
            new MenuItem(
                "Ice Latte",
                "Buz dolu bardakta espresso ve soğuk süt ile hazırlanan, hafif ve serinletici sütlü kahve. Yumuşak içimiyle yaz aylarının vazgeçilmezidir. (130 kcal)",
                60.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/ice-latte.jpg"
            ),
            new MenuItem(
                "Frappuccino",
                "Buz, espresso, süt, krema ve aromalı şuruplarla blenderda karıştırılarak hazırlanan, köpüklü ve tatlı bir soğuk kahve. Enerji ve serinlik sunar. (200 kcal)",
                65.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/frappuccino.jpg"
            ),
            new MenuItem(
                "Cold Brew",
                "Özel olarak 24 saat boyunca soğuk suda demlenen, düşük asiditeli ve yumuşak içimli kahve. Yoğun kahve tadı arayanlar için idealdir. (15 kcal)",
                55.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/cold-brew.jpg"
            )
        );

        // Özel Kahveler
        List<MenuItem> specialtyCoffees = Arrays.asList(
            new MenuItem(
                "Caramel Macchiato",
                "Espresso, buharla ısıtılmış süt, vanilya şurubu ve karamel sosun buluştuğu, üstü karamel ile süslenen tatlı ve aromatik bir kahve. (190 kcal)",
                65.0,
                Category.SPECIALTY_COFFEE,
                true,
                "/images/coffees/specialty/caramel-macchiato.jpg"
            ),
            new MenuItem(
                "Mocha",
                "Espresso, sıcak süt ve çikolata sosunun birleşimiyle hazırlanan, üstü krema ile süslenen zengin ve tatlı bir kahve. Çikolata severler için ideal. (220 kcal)",
                60.0,
                Category.SPECIALTY_COFFEE,
                true,
                "/images/coffees/specialty/mocha.jpg"
            ),
            new MenuItem(
                "Hazelnut Latte",
                "Espresso, sıcak süt ve fındık şurubu ile hazırlanan, hafif fındık aromalı ve kremamsı dokulu özel bir latte çeşidi. (210 kcal)",
                65.0,
                Category.SPECIALTY_COFFEE,
                true,
                "/images/coffees/specialty/hazelnut-latte.jpg"
            )
        );

        // Türk Kahveleri
        List<MenuItem> turkishCoffees = Arrays.asList(
            new MenuItem(
                "Türk Kahvesi",
                "Geleneksel cezvede ağır ateşte pişirilen, yoğun köpüklü ve ince çekilmiş kahve. Yanında lokum ile servis edilir. Mis kokusuyla büyüler. (5 kcal)",
                45.0,
                Category.TURKISH_COFFEE,
                true,
                "/images/coffees/turkish/turkish-coffee.jpg"
            ),
            new MenuItem(
                "Menengiç Kahvesi",
                "Antep fıstığı ile hazırlanan, sütle pişirilen ve kendine has aromasıyla öne çıkan özel Türk kahvesi. Yumuşak ve hafif içimlidir. (5 kcal)",
                55.0,
                Category.TURKISH_COFFEE,
                true,
                "/images/coffees/turkish/menengic-coffee.jpg"
            ),
            new MenuItem(
                "Dibek Kahvesi",
                "Özel dibekte dövülmüş iri çekilmiş kahve çekirdekleriyle hazırlanan, yoğun aromalı ve hafif tortulu geleneksel Türk kahvesi. (10 kcal)",
                50.0,
                Category.TURKISH_COFFEE,
                true,
                "/images/coffees/turkish/dibek-coffee.jpg"
            )
        );

        // Pastalar
        List<MenuItem> cakes = Arrays.asList(
            new MenuItem(
                "Cheesecake",
                "Krem peynirli New York usulü tatlı. Yoğun ve kremsi dokusu ile hafif limon aroması içerir. (250 kcal)",
                60.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/cheesecake.jpg"
            ),
            new MenuItem(
                "Red Velvet",
                "Kırmızı renkli özel kek, kadifemsi dokusu ve krem peynirli kremasıyla eşsiz bir lezzet sunar. (300 kcal)",
                65.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/red-velvet.jpg"
            ),
            new MenuItem(
                "Tiramisu",
                "İtalyan usulü kahve ve mascarpone peyniri ile hazırlanmış, kakao ile süslenmiş nefis tatlı. (400 kcal)",
                65.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/tiramisu.jpg"
            ),
            new MenuItem(
                "Chocolate Cake",
                "Çikolatalı katmanlı kek. Yoğun çikolata aroması ve yumuşak dokusuyla tatlı krizlerine birebir. (270 kcal)",
                55.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/chocolate-cake.jpg"
            )
        );

        // Geleneksel Tatlılar
        List<MenuItem> traditionalDesserts = Arrays.asList(
            new MenuItem(
                "Baklava",
                "Antep fıstıklı geleneksel Türk tatlısı. Kat kat yufka ve bol şerbet ile hazırlanır. (350 kcal)",
                75.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/baklava.jpg"
            ),
            new MenuItem(
                "Künefe",
                "Antep fıstıklı özel peynirli tatlı. Tel kadayıf ve şerbetin sıcak buluşması. Enfes haz. (420 kcal)",
                80.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/kunefe.jpg"
            ),
            new MenuItem(
                "Kazandibi",
                "Geleneksel Türk muhallebisi. Hafif yanık aroması ve yumuşak dokusuyla çok sevilen bir tatlıdır. (180 kcal)",
                55.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/kazandibi.jpg"
            ),
            new MenuItem(
                "Sütlaç",
                "Fırında pişirilmiş özel sütlü tatlı. Pirinç, süt ve hafif karamelize üst katmanıyla klasik bir lezzet. (160 kcal)",
                50.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/sutlac.jpg"
            )
        );

        // Soğuk Tatlılar
        List<MenuItem> coldDesserts = Arrays.asList(
            new MenuItem(
                "Dondurma",
                "Ev yapımı mevsim meyveli dondurma. Serinletici ve hafif, doğal malzemelerle hazırlanır. (120 kcal)",
                45.0,
                Category.COLD_DESSERT,
                true,
                "/images/desserts/cold/ice-cream.jpg"
            ),
            new MenuItem(
                "Panna Cotta",
                "İtalyan usulü kremsi tatlı. Vanilya aromalı sütlü tatlı, meyve sosu ile servis edilir. (210 kcal)",
                60.0,
                Category.COLD_DESSERT,
                true,
                "/images/desserts/cold/panna-cotta.jpg"
            ),
            new MenuItem(
                "Mousse",
                "Çikolatalı kremsi tatlı. Hafif köpüksü dokusu ve yoğun çikolata tadıyla vazgeçilmez. (190 kcal)",
                55.0,
                Category.COLD_DESSERT,
                true,
                "/images/desserts/cold/mousse.jpg"
            )
        );

        // Özel Tatlılar
        List<MenuItem> specialtyDesserts = Arrays.asList(
            new MenuItem(
                "Profiterol",
                "Krema dolgulu çikolata soslu tatlı. İnce hamur topları ve bol çikolata ile hazırlanır. (320 kcal)",
                70.0,
                Category.SPECIALTY_DESSERT,
                true,
                "/images/desserts/specialty/profiterol.jpg"
            ),
            new MenuItem(
                "Sufle",
                "Sıcak çikolatalı tatlı. Akışkan çikolata dolgusu ve hafif kabarık hamuruyla servis edilir. (250 kcal)",
                65.0,
                Category.SPECIALTY_DESSERT,
                true,
                "/images/desserts/specialty/souffle.jpg"
            ),
            new MenuItem(
                "Browni",
                "Çikolatalı fındıklı kek. Yoğun çikolata ve iri fındık parçalarıyla zenginleştirilmiş. (280 kcal)",
                55.0,
                Category.SPECIALTY_DESSERT,
                true,
                "/images/desserts/specialty/brownie.jpg"
            )
        );

        // Siyah Çaylar
        List<MenuItem> blackTeas = Arrays.asList(
            new MenuItem(
                "Türk Çayı",
                "Geleneksel Türk usulü demlenmiş siyah çay. Günün her saatine uygundur. Küçük ince belli bardakta servis edilir. (2 kcal)",
                30.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/turkish-tea.jpg"
            ),
            new MenuItem(
                "Earl Grey",
                "Bergamot aromalı İngiliz siyah çayı. Ferahlatıcı ve hafif narenciye notalarıyla sizlerle. (2 kcal)",
                35.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/earl-grey.jpg"
            ),
            new MenuItem(
                "English Breakfast",
                "Güçlü ve aromalı İngiliz kahvaltı çayı. Süt ile de tüketilebilir, yoğun tadı ve klasik çay keyfi arayanlar için idealdir. (2 kcal)",
                35.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/english-breakfast.jpg"
            ),
            new MenuItem(
                "Darjeeling",
                "Hint Dağları'ndan gelen, hafif ve çiçeksi aromalı özel siyah çay. Zarif tadı ve altın rengiyle çay severlerin favorisi. (2 kcal)",
                40.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/darjeeling.jpg"
            )
        );

        // Bitki Çayları
        List<MenuItem> herbalTeas = Arrays.asList(
            new MenuItem(
                "Ihlamur",
                "Soğuk algınlığına karşı doğal ıhlamur çayı. Hafif tatlı aroması ve rahatlatıcı etkisiyle kış aylarının vazgeçilmezidir. (1 kcal)",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/linden.jpg"
            ),
            new MenuItem(
                "Adaçayı",
                "Ferahlatıcı adaçayı, hafif acımsı tadı ve hoş kokusuyla bilinir. Sindirime yardımcı olur ve sıcak olarak servis edilir. (1 kcal)",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/sage.jpg"
            ),
            new MenuItem(
                "Papatya",
                "Rahatlatıcı papatya çayı, stres ve uykusuzluk için idealdir. Yumuşak içimiyle öne çıkar. (1 kcal)",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/chamomile.jpg"
            ),
            new MenuItem(
                "Kuşburnu",
                "C vitamini deposu kuşburnu çayı. Ekşi ve meyvemsi tadıyla bağışıklığı destekler, sıcak veya soğuk tüketilebilir. (3 kcal)",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/rosehip.jpg"
            ),
            new MenuItem(
                "Rezene",
                "Sindirim dostu rezene çayı. Hafif anason aromasıyla mideyi rahatlatır, yemek sonrası için idealdir. (2 kcal)",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/fennel.jpg"
            )
        );

        // Uncommented code to prevent overwriting existing data
        hotCoffees.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        coldCoffees.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        specialtyCoffees.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        turkishCoffees.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        cakes.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        traditionalDesserts.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        coldDesserts.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        specialtyDesserts.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        blackTeas.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });

        herbalTeas.forEach(item -> {
            menuItemRepository.findByName(item.getName()).ifPresentOrElse(
                existingItem -> {
                    existingItem.setDescription(item.getDescription());
                    existingItem.setPrice(item.getPrice());
                    menuItemRepository.save(existingItem);
                },
                () -> menuItemRepository.save(item)
            );
        });
    }
}