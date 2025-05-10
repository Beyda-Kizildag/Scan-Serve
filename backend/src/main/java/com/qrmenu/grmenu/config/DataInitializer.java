package com.qrmenu.grmenu.config;

import com.qrmenu.grmenu.model.Category;
import com.qrmenu.grmenu.model.MenuItem;
import com.qrmenu.grmenu.model.User;
import com.qrmenu.grmenu.repository.MenuItemRepository;
import com.qrmenu.grmenu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

        // Admin
        userRepository.save(new User("admin", passwordEncoder.encode("admin123"), "ADMIN"));

        // Garsonlar
        userRepository.save(new User("waiter1", passwordEncoder.encode("waiter123"), "WAITER"));
        userRepository.save(new User("waiter2", passwordEncoder.encode("waiter123"), "WAITER"));
        userRepository.save(new User("waiter3", passwordEncoder.encode("waiter123"), "WAITER"));

        // Müşteriler
        userRepository.save(new User("customer1", passwordEncoder.encode("customer123"), "CUSTOMER"));
        userRepository.save(new User("customer2", passwordEncoder.encode("customer123"), "CUSTOMER"));

        // Sıcak Kahveler
        List<MenuItem> hotCoffees = Arrays.asList(
            new MenuItem(
                "Espresso",
                "İtalyan usulü yoğun ve sert kahve (5 kcal)",
                40.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/espresso.jpg"
            ),
            new MenuItem(
                "Americano",
                "Espresso üzerine sıcak su eklenerek hazırlanır. (10 kcal)",
                45.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/americano.jpg"
            ),
            new MenuItem(
                "Cappuccino",
                "Espresso, buharda ısıtılmış süt ve süt köpüğü ile yapılır. (80 kcal)",
                50.0,
                Category.HOT_COFFEE,
                true,
                "/images/coffees/hot/cappuccino.jpg"
            ),
            new MenuItem(
                "Latte",
                "Espresso ile bol süt karışımı. (120 kcal)",
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
                "Soğuk su ve buz ile hazırlanan Americano. (10 kcal)",
                50.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/ice-americano.jpg"
            ),
            new MenuItem(
                "Ice Latte",
                "Buz ile servis edilen sütlü kahve. (130 kcal)",
                60.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/ice-latte.jpg"
            ),
            new MenuItem(
                "Frappuccino",
                "Buzlu, krema ve şurup ile hazırlanmış özel içecek. (200 kcal)",
                65.0,
                Category.COLD_COFFEE,
                true,
                "/images/coffees/cold/frappuccino.jpg"
            ),
            new MenuItem(
                "Cold Brew",
                "24 saat soğuk demleme yöntemi ile hazırlanmış kahve. (15 kcal)",
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
                "Espresso, buharla ısıtılmış süt, vanilya şurubu ve karamel sos. (190 kcal)",
                65.0,
                Category.SPECIALTY_COFFEE,
                true,
                "/images/coffees/specialty/caramel-macchiato.jpg"
            ),
            new MenuItem(
                "Mocha",
                "Espresso, sıcak süt ve çikolata. (220 kcal)",
                60.0,
                Category.SPECIALTY_COFFEE,
                true,
                "/images/coffees/specialty/mocha.jpg"
            ),
            new MenuItem(
                "Hazelnut Latte",
                "Espresso, sıcak süt ve fındık şurubu. (210 kcal)",
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
                "Geleneksel Türk usulü hazırlanmış özel kahve. (5 kcal)",
                45.0,
                Category.TURKISH_COFFEE,
                true,
                "/images/coffees/turkish/turkish-coffee.jpg"
            ),
            new MenuItem(
                "Menengiç Kahvesi",
                "Antep fıstığı ile hazırlanmış özel Türk kahvesi. (5 kcal)",
                55.0,
                Category.TURKISH_COFFEE,
                true,
                "/images/coffees/turkish/menengic-coffee.jpg"
            ),
            new MenuItem(
                "Dibek Kahvesi",
                "Özel dibekte dövülmüş kahve çekirdekleri ile hazırlanmış. (10 kcal)",
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
                "Krem peynirli New York usulü tatlı. (250 kcal)",
                60.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/cheesecake.jpg"
            ),
            new MenuItem(
                "Red Velvet",
                "Kırmızı renkli özel kek ve krem peynirli kreması. (300 kcal)",
                65.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/red-velvet.jpg"
            ),
            new MenuItem(
                "Tiramisu",
                "İtalyan usulü kahve ve mascarpone peyniri ile hazırlanmış tatlı. (400 kcal)",
                65.0,
                Category.CAKE,
                true,
                "/images/desserts/cakes/tiramisu.jpg"
            ),
            new MenuItem(
                "Chocolate Cake",
                "Çikolatalı katmanlı kek. (270 kcal)",
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
                "Antep fıstıklı geleneksel Türk tatlısı",
                75.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/baklava.jpg"
            ),
            new MenuItem(
                "Künefe",
                "Antep fıstıklı özel peynirli tatlı",
                80.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/kunefe.jpg"
            ),
            new MenuItem(
                "Kazandibi",
                "Geleneksel Türk muhallebisi",
                55.0,
                Category.TRADITIONAL_DESSERT,
                true,
                "/images/desserts/traditional/kazandibi.jpg"
            ),
            new MenuItem(
                "Sütlaç",
                "Fırında pişirilmiş özel sütlü tatlı",
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
                "Ev yapımı mevsim meyveli dondurma",
                45.0,
                Category.COLD_DESSERT,
                true,
                "/images/desserts/cold/ice-cream.jpg"
            ),
            new MenuItem(
                "Panna Cotta",
                "İtalyan usulü kremsi tatlı",
                60.0,
                Category.COLD_DESSERT,
                true,
                "/images/desserts/cold/panna-cotta.jpg"
            ),
            new MenuItem(
                "Mousse",
                "Çikolatalı kremsi tatlı",
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
                "Krema dolgulu çikolata soslu tatlı",
                70.0,
                Category.SPECIALTY_DESSERT,
                true,
                "/images/desserts/specialty/profiterol.jpg"
            ),
            new MenuItem(
                "Sufle",
                "Sıcak çikolatalı tatlı",
                65.0,
                Category.SPECIALTY_DESSERT,
                true,
                "/images/desserts/specialty/souffle.jpg"
            ),
            new MenuItem(
                "Browni",
                "Çikolatalı fındıklı kek",
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
                "Geleneksel Türk usulü demlenmiş siyah çay",
                30.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/turkish-tea.jpg"
            ),
            new MenuItem(
                "Earl Grey",
                "Bergamot aromalı İngiliz siyah çayı",
                35.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/earl-grey.jpg"
            ),
            new MenuItem(
                "English Breakfast",
                "Güçlü ve aromalı İngiliz kahvaltı çayı",
                35.0,
                Category.BLACK_TEA,
                true,
                "/images/teas/black/english-breakfast.jpg"
            ),
            new MenuItem(
                "Darjeeling",
                "Hint Dağları'ndan özel siyah çay",
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
                "Soğuk algınlığına karşı doğal ıhlamur çayı",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/linden.jpg"
            ),
            new MenuItem(
                "Adaçayı",
                "Ferahlatıcı adaçayı",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/sage.jpg"
            ),
            new MenuItem(
                "Papatya",
                "Rahatlatıcı papatya çayı",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/chamomile.jpg"
            ),
            new MenuItem(
                "Kuşburnu",
                "C vitamini deposu kuşburnu çayı",
                35.0,
                Category.HERBAL_TEA,
                true,
                "/images/teas/herbal/rosehip.jpg"
            ),
            new MenuItem(
                "Rezene",
                "Sindirim dostu rezene çayı",
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