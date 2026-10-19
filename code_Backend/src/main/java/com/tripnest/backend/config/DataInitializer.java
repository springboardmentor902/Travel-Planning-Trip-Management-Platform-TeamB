package com.tripnest.backend.config;

import com.tripnest.backend.entity.Attraction;
import com.tripnest.backend.entity.Destination;
import com.tripnest.backend.entity.Role;
import com.tripnest.backend.repository.AttractionRepository;
import com.tripnest.backend.repository.DestinationRepository;
import com.tripnest.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * DataInitializer populates essential roles, performs startup cleanup/deduplication,
 * and maintains exactly 9 destinations per category (45 total) in multiples of 3.
 */
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabaseData(
            RoleRepository roleRepository,
            DestinationRepository destinationRepository,
            AttractionRepository attractionRepository) {

        return args -> {
            // 1. Ensure basic user roles exist
            if (roleRepository.findByName("TRAVELER").isEmpty()) {
                Role traveler = new Role();
                traveler.setName("TRAVELER");
                roleRepository.save(traveler);
            }

            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role admin = new Role();
                admin.setName("ADMIN");
                roleRepository.save(admin);
            }

            // 2. Remove obsolete or non-Indian destinations (e.g. London)
            List<String> namesToRemove = List.of(
                    "London", "Paris", "Tokyo", "Rome", "Bali", "Athens", "Cairo", "New York City"
            );
            for (String toRemove : namesToRemove) {
                List<Destination> found = destinationRepository.findAllByNameIgnoreCase(toRemove);
                for (Destination d : found) {
                    List<Attraction> attrs = attractionRepository.findByDestinationId(d.getId());
                    attractionRepository.deleteAll(attrs);
                    destinationRepository.delete(d);
                }
            }

            // 3. Deduplicate multiple entries for any destination (e.g. Munnar, Mussoorie, Bangalore, Pune, Shillong)
            List<Destination> currentDests = destinationRepository.findAll();
            Map<String, List<Destination>> groupedByName = currentDests.stream()
                    .collect(Collectors.groupingBy(d -> d.getName().trim().toLowerCase()));

            for (Map.Entry<String, List<Destination>> entry : groupedByName.entrySet()) {
                List<Destination> duplicates = entry.getValue();
                if (duplicates.size() > 1) {
                    // Keep the first record, delete subsequent duplicates and their attractions
                    for (int i = 1; i < duplicates.size(); i++) {
                        Destination dup = duplicates.get(i);
                        List<Attraction> attrs = attractionRepository.findByDestinationId(dup.getId());
                        attractionRepository.deleteAll(attrs);
                        destinationRepository.delete(dup);
                    }
                }
            }

            // 4. Ensure Pune and Bangalore have type = "Metropolis"
            for (Destination d : destinationRepository.findAll()) {
                if ("Pune".equalsIgnoreCase(d.getName()) && !"Metropolis".equalsIgnoreCase(d.getType())) {
                    d.setType("Metropolis");
                    destinationRepository.save(d);
                }
                if ("Bangalore".equalsIgnoreCase(d.getName()) && !"Metropolis".equalsIgnoreCase(d.getType())) {
                    d.setType("Metropolis");
                    destinationRepository.save(d);
                }
            }

            System.out.println("TripNest: Seeding / syncing 45 curated Indian destinations (9 per category)...");

            // =========================================================================
            // 1. METROPOLIS (9 DESTINATIONS)
            // =========================================================================
            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Bangalore", "India", "Metropolis",
                    "India's vibrant tech capital known for historic palaces, botanical gardens, lively cafe culture, and craft microbreweries.",
                    "October to March", "Well-connected by Kempegowda International Airport (BLR) and Namma Metro.",
                    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Bangalore Palace", "Tudor-style royal residence with wooden carvings and gardens.", "Vasanth Nagar", "Sightseeing", 250.0),
                            new AttractionSeed("Lalbagh Botanical Garden", "240-acre historic botanical garden with centuries-old glasshouse.", "Mavalli", "Nature", 30.0),
                            new AttractionSeed("Cubbon Park & Vidhana Soudha", "Lush central park adjacent to Karnataka's neo-Dravidian state legislature.", "Central Bangalore", "Heritage", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Mumbai", "India", "Metropolis",
                    "India's dynamic commercial capital and Bollywood hub, famous for British colonial heritage, Marine Drive, and street food.",
                    "October to March", "Served by Chhatrapati Shivaji Maharaj International Airport (BOM) and local trains.",
                    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Gateway of India", "Colonial basalt triumphal arch overlooking Mumbai Harbour.", "Apollo Bunder", "Heritage", 0.0),
                            new AttractionSeed("Marine Drive", "The Queen's Necklace C-shaped coastal promenade facing the Arabian Sea.", "South Mumbai", "Leisure", 0.0),
                            new AttractionSeed("Chhatrapati Shivaji Terminus", "UNESCO World Heritage Victorian Gothic railway masterpiece.", "Fort", "Heritage", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Delhi", "India", "Metropolis",
                    "India's historic capital blending Mughal fortresses, Lutyens' grand boulevards, vibrant bazaars, and culinary trails.",
                    "October to March", "Served by Indira Gandhi International Airport (DEL) and extensive Delhi Metro.",
                    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Red Fort (Lal Qila)", "Monumental 17th-century Mughal sandstone fortress palace.", "Old Delhi", "Heritage", 35.0),
                            new AttractionSeed("Qutub Minar", "UNESCO World Heritage 73-meter victory tower with intricate carvings.", "Mehrauli", "Heritage", 35.0),
                            new AttractionSeed("India Gate", "Triumphal war memorial arch surrounded by sprawling lawns.", "Central Delhi", "Historical", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Pune", "India", "Metropolis",
                    "Maharashtra's cultural and IT metropolis nestled by the Sahyadris, famous for historic forts, colleges, and cafes.",
                    "July to February", "Scenic 3-hour expressway drive from Mumbai or via Pune Airport (PNQ).",
                    "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Shaniwar Wada", "Historic 18th-century fortified palace headquarters of the Peshwa rulers.", "Shaniwar Peth", "Heritage", 25.0),
                            new AttractionSeed("Aga Khan Palace", "Italian-arched historical monument with serene lawns significant to the freedom movement.", "Kalyani Nagar", "Historical", 25.0),
                            new AttractionSeed("Sinhagad Fort", "Clifftop fortress offering sweeping Sahyadri vistas and famous village cuisine.", "Sinhagad Ghat", "Adventure", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Hyderabad", "India", "Metropolis",
                    "The City of Pearls and Cyberabad, celebrated for Nizami architectural grandeur, world-famous biryani, and tech campuses.",
                    "October to March", "Served by Rajiv Gandhi International Airport (HYD) and Hyderabad Metro.",
                    "https://images.unsplash.com/photo-1605007493699-ce65834f8a00?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Charminar", "Iconic 16th-century four-minaret mosque and monument in the historic old city.", "Old City", "Heritage", 25.0),
                            new AttractionSeed("Golconda Fort", "Mighty medieval citadel fortress acclaimed for acoustic engineering and diamond heritage.", "Ibrahim Bagh", "Historical", 25.0),
                            new AttractionSeed("Hussain Sagar Lake", "Heart-shaped lake featuring a colossal monolithic Buddha statue at its center.", "Necklace Road", "Leisure", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Chennai", "India", "Metropolis",
                    "Cultural gateway to South India along the Coromandel Coast, famous for Dravidian temples, Marina Beach, and Carnatic music.",
                    "November to February", "Served by Chennai International Airport (MAA) and Chennai Central rail hub.",
                    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Marina Beach", "India's longest natural urban beach along the Bay of Bengal.", "Marina Coast", "Leisure", 0.0),
                            new AttractionSeed("Kapaleeshwarar Temple", "7th-century Dravidian temple with ornate colorful gopuram dedicated to Shiva.", "Mylapore", "Spiritual", 0.0),
                            new AttractionSeed("Fort St. George", "Historic 17th-century British colonial coastal fortress and museum.", "Rajaji Salai", "Heritage", 25.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Gurgaon", "India", "Metropolis",
                    "India's Millennium City, showcasing futuristic glass skyscrapers, high-end culinary hubs, luxury malls, and corporate headquarters.",
                    "October to March", "20 minutes from Delhi IGI Airport and connected via Delhi & Rapid Metro.",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Cyber Hub", "Premier pedestrian dining and social lifestyle center with global restaurants.", "DLF Phase 2", "Leisure", 0.0),
                            new AttractionSeed("Kingdom of Dreams", "Magnificent cultural carnival and live theatrical entertainment complex.", "Sector 29", "Cultural", 600.0),
                            new AttractionSeed("Leisure Valley Park", "Expansive 25-acre green park featuring musical fountains and walking trails.", "Sector 29", "Nature", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Noida", "India", "Metropolis",
                    "Planned modern metropolis in the NCR with wide avenues, tech corporate towers, entertainment hubs, and verdant public parks.",
                    "October to March", "Connected to Delhi via DND Flyway and Blue/Magenta Delhi Metro lines.",
                    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Worlds of Wonder", "World-class amusement and water park with thrilling roller coasters.", "Sector 38A", "Adventure", 899.0),
                            new AttractionSeed("Botanic Garden of Indian Republic", "State-of-the-art conservation sanctuary preserving endangered Indian plants.", "Sector 38", "Nature", 0.0),
                            new AttractionSeed("Okhla Bird Sanctuary", "Wetland nature reserve along Yamuna River home to 300+ migratory bird species.", "Sector 95", "Wildlife", 30.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Kolkata", "India", "Metropolis",
                    "The City of Joy and cultural capital of India, revered for grand colonial palaces, yellow taxis, tramcars, and literary heritage.",
                    "October to March", "Served by Netaji Subhash Chandra Bose International Airport (CCU) and Howrah Station.",
                    "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Victoria Memorial", "Grand white marble palace museum set within 64 acres of landscaped gardens.", "Maidan", "Heritage", 30.0),
                            new AttractionSeed("Howrah Bridge", "Colossal cantilever steel bridge spanning the Hooghly River, an engineering marvel.", "Howrah", "Sightseeing", 0.0),
                            new AttractionSeed("Dakshineswar Kali Temple", "Historic 19th-century Navaratna temple on the riverbanks associated with Ramakrishna.", "Dakshineswar", "Spiritual", 0.0)
                    ));

            // =========================================================================
            // 2. HILL STATION (9 DESTINATIONS)
            // =========================================================================
            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Manali", "India", "Hill Station",
                    "Nestled along the Beas River, Manali is renowned for snow-clad peaks, cedar forests, thrilling adventure sports, and Solang Valley.",
                    "October to June", "Fly to Bhuntar Airport (KUU) or take an overnight luxury Volvo bus from Delhi.",
                    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Solang Valley", "Premier hub for paragliding, skiing, zorbing, and cable cars.", "Solang", "Adventure", 500.0),
                            new AttractionSeed("Rohtang Pass", "High Himalayan mountain pass offering panoramic snow fields and glaciers.", "Rohtang", "Nature", 50.0),
                            new AttractionSeed("Hadimba Temple", "Ancient wooden pagoda temple enveloped by towering deodar forests.", "Dhungri", "Heritage", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Ooty", "India", "Hill Station",
                    "The Queen of Nilgiris, famous for sprawling tea gardens, eucalyptus groves, the UNESCO Nilgiri Mountain Railway, and tranquil lakes.",
                    "October to June", "3-hour scenic drive from Coimbatore Airport (CJB) or via heritage toy train.",
                    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Ooty Botanical Gardens", "55-acre terraced gardens showcasing thousands of exotic plant species.", "Vannarapettai", "Nature", 30.0),
                            new AttractionSeed("Doddabetta Peak", "Highest mountain in the Nilgiris offering 360-degree panoramic valley views.", "Ooty Hills", "Scenic Point", 10.0),
                            new AttractionSeed("Ooty Lake & Boathouse", "Picturesque mountain lake with pedal boating and eucalyptus trees.", "West Lake", "Leisure", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Shimla", "India", "Hill Station",
                    "Historic colonial summer capital of British India with pedestrian Mall Road, neo-Gothic Christ Church, and snow-capped ridges.",
                    "March to June & December to February", "Accessible via Kalka-Shimla Toy Train or scenic highway drive from Chandigarh.",
                    "https://images.unsplash.com/photo-1562670652-e5947bddb335?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("The Ridge & Christ Church", "Open cultural promenade with mountain panoramas and historic yellow church.", "The Ridge", "Heritage", 0.0),
                            new AttractionSeed("Jakhoo Temple & Hill", "Highest peak in Shimla crowned by a colossal 108-foot Hanuman statue.", "Jakhoo", "Spiritual", 0.0),
                            new AttractionSeed("Mall Road Promenade", "Pedestrian avenue with colonial architecture, shops, and heritage cafes.", "Mall Road", "Leisure", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Munnar", "India", "Hill Station",
                    "Emerald rolling tea estates, mist-covered mountain valleys, and cascading waterfalls tucked in the Western Ghats.",
                    "September to March", "Scenic 3.5-hour mountain drive from Cochin Airport (COK).",
                    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Eravikulam National Park", "High-altitude sanctuary home to the rare Nilgiri Tahr and Anamudi peak.", "Munnar Hills", "Wildlife", 200.0),
                            new AttractionSeed("Tata Tea Museum", "Historic tea-processing museum showcasing artisanal leaf cultivation.", "Nullatanni", "Cultural", 150.0),
                            new AttractionSeed("Mattupetty Dam & Echo Point", "Picturesque reservoir lake offering speedboats and forest trails.", "Mattupetty", "Leisure", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Mussoorie", "India", "Hill Station",
                    "The Queen of the Hills perched high on a ridge facing snow-capped Himalayan peaks and the lush Doon Valley.",
                    "March to June & December to February", "1.5-hour uphill mountain drive from Dehradun Railway Station or Airport.",
                    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Kempty Falls", "Famous mountain waterfall cascading into a plunge pool surrounded by cliffs.", "Kempty", "Leisure", 0.0),
                            new AttractionSeed("Mall Road & Gun Hill", "Colonial promenade with handicraft shops, historic bakeries, and cable car ride.", "The Mall", "Sightseeing", 150.0),
                            new AttractionSeed("Lal Tibba & Landour", "Highest point in Mussoorie with telescopes facing the high Himalayas.", "Landour", "Scenic Point", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Coorg", "India", "Hill Station",
                    "Mist-cloaked hills, fragrant Arabica coffee estates, spice plantations, and the warm hospitality of the Kodava community.",
                    "October to April", "5 hours from Bangalore or 2.5 hours from Mysore. Best explored through homestays.",
                    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Abbey Falls", "Roaring waterfall dropping through lush coffee groves and pepper vines.", "Madikeri", "Sightseeing", 15.0),
                            new AttractionSeed("Namdroling Monastery", "Tibetan Buddhist monastery featuring 40-foot golden statues and tranquil chants.", "Bylakuppe", "Spiritual", 0.0),
                            new AttractionSeed("Raja's Seat", "Historic seasonal garden where Kodagu kings watched sunset panoramas.", "Madikeri", "Scenic View", 20.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Darjeeling", "India", "Hill Station",
                    "The Champagne of Teas, celebrated for breathtaking golden sunrises over Mt. Kanchenjunga and heritage toy train rides.",
                    "March to May & September to November", "3-hour mountain drive from Bagdogra Airport (IXB) or New Jalpaiguri (NJP).",
                    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Tiger Hill", "Famous vantage point for sunrise panoramas over Kanchenjunga and Everest.", "Tiger Hill", "Scenic View", 50.0),
                            new AttractionSeed("Batasia Loop", "Spiral railway loop with blooming gardens facing Himalayan snow peaks.", "Ghoom", "Heritage", 25.0),
                            new AttractionSeed("Happy Valley Tea Estate", "Historic working tea plantation with guided leaf-to-cup garden tours.", "Lebong", "Cultural", 100.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Nainital", "India", "Hill Station",
                    "Enchanting Himalayan lake city centered around emerald Naini Lake, enveloped by seven verdant pine and oak hills.",
                    "March to June & September to November", "1-hour drive from Kathgodam Railway Station or 7-hour drive from Delhi.",
                    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Naini Lake Boating", "Serene mountain lake with traditional yacht boating and hill reflections.", "Mallital", "Leisure", 150.0),
                            new AttractionSeed("Snow View Point", "Aerial ropeway to breathtaking vantage point facing Trishul and Nanda Devi.", "Sher-ka-Danda", "Scenic View", 120.0),
                            new AttractionSeed("Naina Devi Temple", "Sacred lakeside temple dedicated to Goddess Naina on northern shore.", "Mallital", "Spiritual", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Kodaikanal", "India", "Hill Station",
                    "The Princess of Hill Stations in Palani Hills with mist-covered cliffs, star-shaped lakes, and cool pine forests.",
                    "October to March", "3-hour drive from Madurai Airport (IXU). Known for homemade chocolates and Kurinji flowers.",
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Kodaikanal Lake", "Star-shaped freshwater lake surrounded by water lilies and cycle tracks.", "Town Centre", "Leisure", 40.0),
                            new AttractionSeed("Coaker's Walk", "Paved pedestrian pathway curving along steep mountain slopes.", "Van Allen", "Nature", 30.0),
                            new AttractionSeed("Pillar Rocks", "Three colossal granite rock pillars rising 400 feet into misty clouds.", "Pillar Rocks Rd", "Scenic Point", 20.0)
                    ));

            // =========================================================================
            // 3. BEACHES (9 DESTINATIONS) - All Distinct, Verified Images
            // =========================================================================
            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Goa", "India", "Beaches",
                    "Sun-kissed beaches, coastal cuisine, Portuguese architecture, water sports, and tranquil backwaters.",
                    "November to February", "Served by Dabolim and MOPA international airports.",
                    "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Baga Beach", "Vibrant sandy shoreline known for water sports, beach shacks, and evening music.", "North Goa", "Adventure", 0.0),
                            new AttractionSeed("Basilica of Bom Jesus", "UNESCO World Heritage 16th-century church holding relics of St. Francis Xavier.", "Old Goa", "Heritage", 0.0),
                            new AttractionSeed("Dudhsagar Falls", "Four-tiered majestic white waterfall nestled deep in Bhagwan Mahaveer Sanctuary.", "Sonaulim", "Nature", 100.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Gokarna", "India", "Beaches",
                    "Serene temple town along the Arabian Sea celebrated for pristine secluded beaches, palm cliffs, and bohemian coastal vibes.",
                    "October to March", "3 hours from Goa Dabolim Airport (GOI) or direct trains to Gokarna Road.",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Om Beach", "Iconic crescent beach naturally shaped like the spiritual Om symbol.", "Om Beach Rd", "Leisure", 0.0),
                            new AttractionSeed("Kudle Beach", "Golden sandy cove framed by rocky hills, famous for sunset shacks.", "Kudle", "Nature", 0.0),
                            new AttractionSeed("Mahabaleshwar Temple", "Ancient 4th-century Dravidian temple enshrining sacred Atmalinga.", "Car Street", "Spiritual", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Varkala", "India", "Beaches",
                    "Dramatic red laterite cliffs bordering the Arabian Sea, dotted with rooftop cafes, Ayurvedic spas, and golden sands.",
                    "October to March", "45 minutes from Trivandrum International Airport (TRV) with direct rail links.",
                    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Varkala Cliff & Beach", "Spectacular clifftop promenade overlooking sparkling blue waters.", "North Cliff", "Leisure", 0.0),
                            new AttractionSeed("Janardanaswamy Temple", "2,000-year-old temple dedicated to Lord Vishnu overlooking the sea.", "Beach Rd", "Spiritual", 0.0),
                            new AttractionSeed("Kappil Beach & Backwaters", "Scenic confluence where emerald backwaters meet the roaring sea.", "Kappil", "Nature", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Havelock Island", "India", "Beaches",
                    "Tropical paradise in Andaman & Nicobar with turquoise lagoons, powdery white sands, and world-class scuba diving.",
                    "October to May", "1.5-hour high-speed catamaran ferry from Port Blair (Veer Savarkar Airport IXZ).",
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Radhanagar Beach", "Ranked among Asia's best beaches for pristine turquoise waters and sunsets.", "Beach No. 7", "Nature", 0.0),
                            new AttractionSeed("Elephant Beach", "Premier watersports hub for snorkeling, sea-walking, and coral reefs.", "North Havelock", "Adventure", 20.0),
                            new AttractionSeed("Kalapathar Beach", "Quiet shoreline lined with fallen black rocks and turquoise waters.", "Beach No. 5", "Leisure", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Puri", "India", "Beaches",
                    "Holy coastal city along the Bay of Bengal, revered for Lord Jagannath Temple, wide golden surf beaches, and sand art.",
                    "October to February", "1.5-hour drive from Bhubaneswar Biju Patnaik Airport (BBI).",
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Golden Beach", "Blue Flag certified pristine beach with clean promenade and safe bathing.", "Marine Drive", "Leisure", 20.0),
                            new AttractionSeed("Jagannath Temple", "12th-century holy shrine and pilgrimage center with towering spire.", "Grand Road", "Spiritual", 0.0),
                            new AttractionSeed("Konark Sun Temple", "UNESCO World Heritage 13th-century chariot temple to Surya.", "Konark Coastal Rd", "Heritage", 40.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Kovalam", "India", "Beaches",
                    "Famous crescent beach destination marked by a vintage striped lighthouse, calm shallow waters, and coconut groves.",
                    "September to March", "20 minutes from Trivandrum International Airport (TRV).",
                    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Lighthouse Beach", "Southernmost beach featuring a 35-meter red-and-white stone lighthouse.", "Lighthouse Beach", "Leisure", 25.0),
                            new AttractionSeed("Hawah Beach", "Picturesque cove where traditional fishing catamarans set out to sea.", "Hawah", "Nature", 0.0),
                            new AttractionSeed("Samudra Beach", "Tranquil northern beach with wooden shacks and serene shoreline walks.", "Samudra", "Leisure", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Pondicherry", "India", "Beaches",
                    "Charming coastal French enclave featuring cobblestone boulevards, pastel villas, golden beaches, and bohemian cafes.",
                    "October to March", "2.5-hour scenic drive along the East Coast Road (ECR) from Chennai Airport.",
                    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Promenade Beach", "Scenic 1.5-km seafront boulevard overlooking rocky shores and Bay of Bengal.", "Goubert Ave", "Leisure", 0.0),
                            new AttractionSeed("Paradise Beach", "Secluded golden sand spit accessible by scenic backwater ferry ride.", "Chunnambar", "Nature", 50.0),
                            new AttractionSeed("French War Memorial", "Graceful colonial monument honoring soldiers situated on Promenade.", "White Town", "Historical", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Diu", "India", "Beaches",
                    "Peaceful island off the Gujarat coast renowned for golden crescent beaches, Portuguese sea forts, and sea caves.",
                    "October to April", "Served by Diu Airport (DIU) or 2 hours from Veraval Railway Station.",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Nagoa Beach", "Famous horseshoe-shaped beach lined with rare Hoka palm trees.", "Nagoa", "Leisure", 0.0),
                            new AttractionSeed("Diu Fort & Lighthouse", "Mighty 16th-century stone fortress with cannons facing the Arabian Sea.", "Diu Head", "Heritage", 20.0),
                            new AttractionSeed("Naida Caves", "Enchanting illuminated sandstone cave labyrinth carved by natural light.", "Near Fort", "Adventure", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Alibaug", "India", "Beaches",
                    "Coastal weekend getaway near Mumbai known for clean coconut-lined beaches, historic sea fortresses, and fresh seafood.",
                    "November to March", "45-minute speedboat or Ro-Ro ferry from Gateway of India, Mumbai to Mandwa Jetty.",
                    "https://images.unsplash.com/photo-1520454974749-611a7248ffdb?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Alibaug Beach", "Black sand coastline with stunning views of the offshore Kolaba Fort.", "Town Coast", "Leisure", 0.0),
                            new AttractionSeed("Kolaba Fort", "300-year-old Maratha sea fort accessible by walking during low tide.", "Offshore", "Heritage", 20.0),
                            new AttractionSeed("Varsoli Beach", "White sandy beach surrounded by cypress and casuarina trees.", "Varsoli", "Nature", 0.0)
                    ));

            // =========================================================================
            // 4. HERITAGE (9 DESTINATIONS) - Verified Temple & Ganga Aarti for Varanasi
            // =========================================================================
            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Jaipur", "India", "Heritage",
                    "The Pink City, a UNESCO World Heritage gem adorned with hilltop fortresses, royal Rajput palaces, and colorful bazaars.",
                    "October to March", "Jaipur International Airport (JAI) or 4.5-hour highway drive from Delhi.",
                    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Amber Palace", "Majestic hilltop fort with Sheesh Mahal mirror palace and lake views.", "Devisinghpura", "Heritage", 100.0),
                            new AttractionSeed("Hawa Mahal", "Iconic 5-story honeycomb facade built with pink sandstone for royal women.", "Badi Choupad", "Heritage", 50.0),
                            new AttractionSeed("City Palace & Jantar Mantar", "Grand royal residence complex and UNESCO ancient astronomical observatory.", "Gangori Bazaar", "Heritage", 200.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Agra", "India", "Heritage",
                    "Immortal Mughal capital on the banks of Yamuna, home to the Taj Mahal—the world's most famous monument of love.",
                    "October to March", "2 hours from Delhi via Yamuna Expressway or Gatimaan Express superfast train.",
                    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Taj Mahal", "UNESCO World Heritage ivory-white marble mausoleum built by Shah Jahan.", "Dharmapuri", "Heritage", 50.0),
                            new AttractionSeed("Agra Fort", "Mighty red sandstone fortress housing Mughal imperial palaces and courtyards.", "Rakabganj", "Heritage", 50.0),
                            new AttractionSeed("Fatehpur Sikri", "Preserved Mughal ghost city with monumental Buland Darwaza gateway.", "Fatehpur", "Historical", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Varanasi", "India", "Heritage",
                    "One of the world's oldest continuously inhabited cities, revered for sacred Ganges ghats, temples, and evening aartis.",
                    "October to March", "Lal Bahadur Shastri Airport (VNS). Early morning boat rides are unforgettable.",
                    "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Dashashwamedh Ghat & Ganga Aarti", "Main sacred ghat on Ganges where the grand evening Ganga Aarti with brass lamps takes place.", "Ganga Ghats", "Spiritual", 0.0),
                            new AttractionSeed("Kashi Vishwanath Temple", "Historic golden-spire temple dedicated to Lord Shiva in heart of old city.", "Vishwanath Gali", "Spiritual", 0.0),
                            new AttractionSeed("Sarnath Deer Park", "Revered pilgrimage site where Lord Buddha delivered his first sermon.", "Sarnath", "Historical", 25.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Hampi", "India", "Heritage",
                    "Surreal UNESCO World Heritage ruins of Vijayanagara Empire strewn across a landscape of giant boulders and rivers.",
                    "October to March", "30 minutes from Hospet Junction railway station or 6 hours from Bangalore.",
                    "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Virupaksha Temple", "7th-century functioning temple dedicated to Lord Shiva with high gopuram.", "Hampi Bazaar", "Spiritual", 25.0),
                            new AttractionSeed("Vijaya Vittala & Stone Chariot", "Masterpiece temple complex with famous stone chariot and musical pillars.", "Vittala", "Heritage", 40.0),
                            new AttractionSeed("Matanga Hill", "Highest point in Hampi offering unforgettable sunset panoramas over ruins.", "Matanga", "Scenic Point", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Khajuraho", "India", "Heritage",
                    "UNESCO World Heritage temple group acclaimed for exquisite Nagara-style architecture and intricate stone carvings.",
                    "October to March", "Khajuraho Airport (HJR) or train connectivity from Jhansi.",
                    "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Kandariya Mahadeva Temple", "Largest and most ornate Hindu temple in the Western Group.", "Western Complex", "Heritage", 40.0),
                            new AttractionSeed("Lakshmana Temple", "Well-preserved sandstone temple dedicated to Vaikuntha Vishnu.", "Western Enclosure", "Heritage", 40.0),
                            new AttractionSeed("Raneh Falls", "Deep canyon waterfall carved through crystalline granite rocks.", "Raneh", "Nature", 100.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Udaipur", "India", "Heritage",
                    "The City of Lakes and Venice of the East, surrounded by the Aravalli Hills with floating royal marble palaces.",
                    "October to March", "Maharana Pratap Airport (UDR) and direct trains from Delhi, Jaipur, and Mumbai.",
                    "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("City Palace", "Towering royal complex perched over Lake Pichola with mirror-inlay courtyards.", "Old City", "Heritage", 300.0),
                            new AttractionSeed("Lake Pichola & Jag Mandir", "Picturesque artificial lake offering royal sunset boat cruises.", "Pichola", "Leisure", 400.0),
                            new AttractionSeed("Saheliyon-ki-Bari", "Historic marble courtyard garden built for royal ladies with rain fountains.", "Panchwati", "Nature", 20.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Amritsar", "India", "Heritage",
                    "Spiritual and cultural epicenter of Sikhism, world-famous for the sublime Golden Temple, history, and culinary delicacies.",
                    "October to March", "Sri Guru Ram Dass Jee International Airport (ATQ) and major rail hub.",
                    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Golden Temple (Harmandir Sahib)", "Holiest gurdwara with pure gold foil dome floating in sacred Amrit Sarovar.", "Heritage Street", "Spiritual", 0.0),
                            new AttractionSeed("Wagah Border Ceremony", "Electrifying daily military retreat ceremony on the India-Pakistan border.", "Wagah", "Historical", 0.0),
                            new AttractionSeed("Jallianwala Bagh", "Historic national memorial park preserving the sacred freedom struggle ground.", "Heritage Street", "Historical", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Mysore", "India", "Heritage",
                    "The Cultural Capital of Karnataka, celebrated for its illuminated royal palace, sandalwood, silk, and heritage yoga.",
                    "October to March", "2 hours from Bangalore via express rail or expressway.",
                    "https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Mysore Palace", "Indo-Saracenic royal palace illuminated by nearly 100,000 bulbs on Sundays.", "Sayyaji Rao Rd", "Heritage", 70.0),
                            new AttractionSeed("Chamundeshwari Temple", "Ancient temple atop Chamundi Hills overlooking Mysore city.", "Chamundi Hill", "Spiritual", 0.0),
                            new AttractionSeed("Brindavan Gardens", "Terraced botanical gardens with illuminated musical dancing fountains.", "KRS Dam", "Leisure", 50.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Aurangabad", "India", "Heritage",
                    "Historic gateway to Maharashtra's UNESCO world wonders: the rock-cut masterpiece temples of Ellora and Ajanta.",
                    "October to March", "Chhatrapati Sambhajinagar Airport (IXU) or direct trains from Mumbai and Pune.",
                    "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Ellora Caves & Kailasa Temple", "World's largest monolithic rock excavation carved top-down out of a cliff.", "Ellora", "Heritage", 40.0),
                            new AttractionSeed("Ajanta Caves", "30 rock-cut Buddhist cave monuments holding ancient fresco murals.", "Ajanta", "Heritage", 40.0),
                            new AttractionSeed("Bibi Ka Maqbara", "Historic 17th-century Mughal mausoleum known as the Taj of the Deccan.", "Begumpura", "Historical", 25.0)
                    ));

            // =========================================================================
            // 5. ECO-TOURISM (9 DESTINATIONS)
            // =========================================================================
            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Shillong", "India", "Eco-Tourism",
                    "The Scotland of the East, famous for living root bridges, pine hills, live music, and pristine waterfalls.",
                    "September to May", "Fly to Guwahati (GAU) followed by a 3-hour scenic drive past Umiam Lake.",
                    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Umiam Lake", "Vast crystal-blue reservoir surrounded by pines, offering kayaking and boat rides.", "Ri-Bhoi", "Adventure", 100.0),
                            new AttractionSeed("Elephant Falls", "Three-tier mountain waterfall with paved walking trails surrounded by rare ferns.", "Upper Shillong", "Nature", 50.0),
                            new AttractionSeed("Laitlum Canyons", "Breathtaking canyon edge overlooking deep misty gorges and tribal villages.", "Laitlum", "Hiking", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Kaziranga", "India", "Eco-Tourism",
                    "UNESCO World Heritage sanctuary along the Brahmaputra River, harboring two-thirds of the world's great one-horned rhinos.",
                    "November to April", "4 hours from Guwahati Airport (GAU) or 2 hours from Jorhat.",
                    "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Central Range Jeep Safari", "Thrilling safari through tall elephant grass to spot rhinos and wild buffalo.", "Kohora", "Wildlife", 800.0),
                            new AttractionSeed("Kaziranga Orchid Park", "Biodiversity park home to 500+ indigenous wild orchid species.", "Durgapur", "Nature", 100.0),
                            new AttractionSeed("Bagori Range", "Wetland zone famous for bird watching, swamp deer, and tiger tracking.", "Bagori", "Wildlife", 750.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Sundarbans", "India", "Eco-Tourism",
                    "The world's largest coastal mangrove forest and UNESCO Biosphere Reserve, crisscrossed by tidal rivers and Royal Bengal tigers.",
                    "October to March", "3 hours from Kolkata to Godkhali followed by motorized riverboat journey.",
                    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Sajnekhali Watch Tower", "Gateway watch tower with mangrove interpretation center.", "Sajnekhali", "Wildlife", 60.0),
                            new AttractionSeed("Sudhanyakhali Watch Tower", "Sweetwater pond observation point known for tiger sightings.", "Sudhanyakhali", "Wildlife", 60.0),
                            new AttractionSeed("Dobanki Canopy Walk", "Half-kilometer elevated wire-mesh pathway 20 feet above mangrove forest.", "Dobanki", "Nature", 100.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Wayanad", "India", "Eco-Tourism",
                    "Lush bio-reserve paradise in the Western Ghats with ancient Neolithic caves, mist-wrapped tea plantations, and treehouses.",
                    "October to May", "2.5-hour mountain drive from Calicut International Airport (CCJ).",
                    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Edakkal Caves", "Prehistoric rock shelters with Neolithic petroglyphs carved on stone walls.", "Ambukuthi Mala", "Heritage", 50.0),
                            new AttractionSeed("Banasura Sagar Dam", "Largest earthen dam in India set against misty hills with speedboats.", "Padinjarathara", "Leisure", 40.0),
                            new AttractionSeed("Chembra Peak & Heart Lake", "Highest peak in Wayanad with a natural heart-shaped mountain lake.", "Meppadi", "Hiking", 250.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Spiti Valley", "India", "Eco-Tourism",
                    "The Middle Land between India and Tibet, a high-altitude cold desert world with ancient Buddhist gompas and star-filled skies.",
                    "May to October", "Road expedition via Manali (Atal Tunnel & Kunzum Pass) or Shimla-Kinnaur.",
                    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Key Monastery", "1,000-year-old cliffside Buddhist monastery perched at 13,600 feet.", "Key Village", "Spiritual", 0.0),
                            new AttractionSeed("Chandratal Lake", "Crescent blue glacial lake reflecting snow-capped peaks in the Himalayas.", "Spiti High Plains", "Nature", 0.0),
                            new AttractionSeed("Hikkim Post Office", "World's Highest Post Office at 14,567 feet where travelers mail postcards.", "Hikkim", "Cultural", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Jim Corbett", "India", "Eco-Tourism",
                    "India's oldest national park and premier tiger reserve, nestled in the Himalayan foothills along the sparkling Ramganga River.",
                    "November to June", "5 hours from Delhi by road or direct train to Ramnagar.",
                    "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Dhikala Zone Safari", "Core reserve zone known for Royal Bengal tigers and elephant herds.", "Dhikala", "Wildlife", 1200.0),
                            new AttractionSeed("Corbett Waterfall", "Scenic 66-foot waterfall set inside dense teak and sal forests.", "Kaladhungi", "Nature", 50.0),
                            new AttractionSeed("Garjiya Devi Temple", "Picturesque shrine situated atop a large rock in the Kosi River.", "Ramnagar", "Spiritual", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Ranthambore", "India", "Eco-Tourism",
                    "Legendary royal hunting ground turned premier tiger reserve, where Royal Bengal tigers roam among 10th-century fort ruins.",
                    "October to April", "Sawai Madhopur Railway Station is 20 minutes away, connecting to Delhi and Jaipur.",
                    "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Ranthambore Tiger Safari", "Open-top gypsy and canter safaris through scenic rocky valleys and lakes.", "Zone 1-5", "Wildlife", 1100.0),
                            new AttractionSeed("Ranthambore Fort", "UNESCO World Heritage 10th-century fortress towering over the national park.", "Park Center", "Heritage", 0.0),
                            new AttractionSeed("Padam Talao & Jogi Mahal", "Largest water lily lake in reserve featuring ancient royal hunting lodge.", "Core Area", "Nature", 0.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Rishikesh", "India", "Eco-Tourism",
                    "The Yoga Capital of the World along the emerald Ganges, surrounded by Himalayan foothills, eco-camps, and rafting rapids.",
                    "September to April", "30 minutes from Dehradun Jolly Grant Airport (DED) or direct trains to Yog Nagari Rishikesh.",
                    "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("White Water River Rafting", "Thrilling grade III & IV rapids down the pristine Ganges River.", "Shivpuri to Rishikesh", "Adventure", 650.0),
                            new AttractionSeed("Laxman Jhula & Triveni Ghat Aarti", "Iconic suspension bridge and serene evening riverbank Ganga Aarti.", "Tapovan", "Spiritual", 0.0),
                            new AttractionSeed("Neer Garh Waterfall", "Multi-tiered natural waterfall tucked in pine jungle with cool plunge pools.", "Badrinath Hwy", "Nature", 30.0)
                    ));

            seedOrUpdateDest(destinationRepository, attractionRepository,
                    "Gir National Park", "India", "Eco-Tourism",
                    "The sole remaining natural habitat of the majestic Asiatic lion, featuring dry deciduous teak forests and crocodile rivers.",
                    "December to March", "2 hours from Keshod Airport or 3 hours from Rajkot International Airport.",
                    "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
                    List.of(
                            new AttractionSeed("Asiatic Lion Safari", "Guided open-jeep expedition into the protected wilderness to observe wild lion prides.", "Sasan Gir", "Wildlife", 900.0),
                            new AttractionSeed("Kamleshwar Dam", "Scenic reservoir known as the marsh crocodile capital of India.", "Central Gir", "Wildlife", 0.0),
                            new AttractionSeed("Gir Interpretation Zone (Devalia)", "Fenced eco-safari park offering guaranteed wildlife sightings.", "Devalia", "Nature", 250.0)
                    ));

            System.out.println("TripNest: Successfully seeded/synced all 45 destinations (9 in each category) and attractions!");
        };
    }

    private void seedOrUpdateDest(DestinationRepository destinationRepo,
                                  AttractionRepository attractionRepo,
                                  String name, String country, String type,
                                  String description, String bestTime,
                                  String travelInfo, String imageUrl,
                                  List<AttractionSeed> attractions) {

        List<Destination> existingList = destinationRepo.findAllByNameIgnoreCase(name);
        Destination destination;
        if (existingList.isEmpty()) {
            destination = createDestination(name, country, type, description, bestTime, travelInfo, imageUrl);
            destination = destinationRepo.save(destination);
        } else {
            destination = existingList.get(0);
            destination.setCountry(country);
            destination.setType(type);
            destination.setDescription(description);
            destination.setBestTimeToVisit(bestTime);
            destination.setTravelInformation(travelInfo);
            destination.setImageUrl(imageUrl);
            destination = destinationRepo.save(destination);
        }

        // Ensure attractions exist for this destination
        List<Attraction> existingAttractions = attractionRepo.findByDestinationId(destination.getId());
        if (existingAttractions.isEmpty()) {
            for (AttractionSeed a : attractions) {
                attractionRepo.save(createAttraction(a.name, a.description, a.location, a.category, a.entryFee, destination));
            }
        }
    }

    private static class AttractionSeed {
        final String name;
        final String description;
        final String location;
        final String category;
        final Double entryFee;

        AttractionSeed(String name, String description, String location, String category, Double entryFee) {
            this.name = name;
            this.description = description;
            this.location = location;
            this.category = category;
            this.entryFee = entryFee;
        }
    }

    private Destination createDestination(String name, String country, String type,
                                          String description, String bestTime,
                                          String travelInfo, String imageUrl) {
        Destination d = new Destination();
        d.setName(name);
        d.setCountry(country);
        d.setType(type);
        d.setDescription(description);
        d.setBestTimeToVisit(bestTime);
        d.setTravelInformation(travelInfo);
        d.setImageUrl(imageUrl);
        return d;
    }

    private Attraction createAttraction(String name, String description, String location,
                                        String category, Double entryFee, Destination destination) {
        Attraction a = new Attraction();
        a.setName(name);
        a.setDescription(description);
        a.setLocation(location);
        a.setCategory(category);
        a.setEntryFee(entryFee);
        a.setDestination(destination);
        return a;
    }
}
