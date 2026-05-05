const translations = {
  en: {
    header: {
      name: "Salman Khaled Ovi",
      title: "Web Developer"
    },
    about: "I am Ovi, a Web Developer at Shoepassion GmbH, specializing in frontend development with solid backend experience. I create flexible, user-friendly web applications and tackle technical challenges with clear, well-structured code. Currently, I am deepening my knowledge of React.js and modern frontend frameworks to stay up to date with the latest technologies.",
    codeSnippetIntro: "Here is a code snippet from my projects at my current job. Maybe with this snippet, you get a sense of what I actually do in my code. I haven't had time to build many personal projects, but this is what I'm working on right now.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "GraphQL (Foundational knowledge)",
      "SQL (Foundational knowledge)",
      "Liquid (Experience developing Shopify themes)",
      "PHP (Experience developing WordPress themes)",
      "React (Currently learning via a Udemy course)",
    ],
    more_skills: [
      "Shopify",
      "WordPress",
      "N8N",
      "Magento 1",
      "Plytix (PIM System)",
      "Pixi (Warehouse Management System)",
      "GitHub",
      "Bitbucket",
      "ChatGPT",
      "Klaviyo",
      "Lugis Box",
      "DataFeedWatch"
    ],
    more_soft_skills: [

      "Technical Testing (Python scripts to validate Shopify product data via GraphQL API)",
      "Team Collaboration (Supported marketing, accounting, and product teams on IT tasks)",
      "API Integration (Extracted Klaviyo data and saved as CSV for Power BI)",
      "Automation Scripts (Imported bulk data to Shopify from PIM via N8N automation)",
      "Image Processing (Python scripts to remove backgrounds, crop, and edit product images)",
      "ETL Workflows (Extracted, transformed, and loaded data from multiple sources)",
      "Custom Widgets (Developed Shopify and WordPress custom widgets)",
      "Partner Coordination (Communicated with third-party services like ShopConnect, Toolbox, and Shopney to resolve technical issues and implement solutions)",
      "System Integration (Created email accounts and configured DNS settings)",
    ],
    projectsIntro: "Currently, I work in a small team where I handle both frontend and backend tasks as well as parts of system integration. Due to limited resources, I am often responsible for several technical areas at the same time. This has allowed me to build a comprehensive understanding of various aspects of web development and related systems.",
    projectsParagraphs: [
      "I feel most comfortable working on frontend applications. At the same time, I occasionally work with GraphQL, SQL, and API integrations, as well as e-commerce, warehouse, product management systems, and feed management systems like DataFeed Watch. I also use tools such as GitHub, Bitbucket, GitHub Copilot, and ChatGPT to make my workflow more efficient and structured.",

      "For my further professional development, I am looking for an environment with more technical exchange, clearer structures, and the opportunity to focus more on frontend development. I would like to actively contribute my previous experience and further develop my skills within a larger developer team."
    ],
    projects: [{
        title: "Frontend and Backend Development in E-Commerce",
        description: "Comprehensive work on frontend and backend projects, including customization of Shopify and WordPress themes and development of custom features."
      },
      {
        title: "Python Scripting for Automation and Data Processing",
        description: "Development of scripts for automation, image processing, and data handling for internal workflows and marketplaces."
      },
      {
        title: "API Integrations & OpenAI Workflows",
        description: "Integration of various APIs, including the OpenAI API, to automate translations and data processes in Shopify."
      },
      {
        title: "ETL Processes for Internal Analytics",
        description: "Preparation and transformation of data for internal analytics, e.g., for use in Power BI."
      },
      {
        title: "Shopify App Integration & Custom Features",
        description: "Installation, customization, and integration of Shopify apps as well as development of custom tools and widgets."
      },
      {
        title: "Work with E-Commerce and PIM Systems",
        description: "Experience with Shopify, WordPress, Pixi (Warehouse Management System), and Plytix (Product Information Management)."
      },
      {
        title: "Integration of External Tools",
        description: "Integration of external tools such as Klaviyo and Lugis Box to optimize workflows and marketing processes."
      },
      {
        title: "Technical Testing & System Optimization",
        description: "Conducting technical tests, optimization, and continuous improvement of internal systems."
      },
      {
        title: "Collaboration & Team Support",
        description: "Close cooperation with different departments, system integration, IT support, setup of workstations, and technical assistance for new team members."
      }
    ],
    contact: {

      contactText: "Feel free to reach out via email or learn more about my work on GitHub and LinkedIn.",
      contactLinks: [{
          label: "Email",
          url: "mailto:salmankhaledovi@gmail.com"
        },
        {
          label: "GitHub",
          url: "https://github.com/salkha"
        },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/salman-khaled-ovi-b617831ba"
        }
      ]
    },
    skillsSectionTitles: {
      main: "Skills",
      technical: "Programming Languages I worked with",
      more: "Tools I worked with",
      soft: "Practical Projects & Implementations"
    },
    codingButtonName: [
      "Image Editing (part 1)",
      "Image Editing (part 2)",
      "Auto-Translate Shopify Collections",
      "Generate Image Feed from Server",
      "Update Supplier Prices from CSV",
      "Store Locator Map (Shopify Widget)"
    ],
    code_description_1: "This script automates the process of organizing, renaming, and cropping product images for an e-commerce project. It starts by reading a list of GTIN-based product folders and a CSV feed with product details, then filters the data to match available products. Each image is renamed using a standardized format based on brand, gender, and color, and a maximum of eight images per product are copied to a new folder. Finally, the script crops each image to focus on the main product, removing extra transparent areas, resulting in clean, consistently named images ready for further use or display.",
    code_description_2: "After the agency generates the additional 9th and 10th images, this script takes the renamed and cropped images and applies various platform-specific image profiles. It reorganizes and renames files according to custom rules, adds consistent backgrounds, adjusts padding, and ensures images are properly centered for each marketplace or storefront. The output is a set of ready-to-upload images for multiple platforms like Shopify, Fashionette, Breuninger, and others, with uniform sizes and visually optimized layouts.",
    code_description_3: "This script automatically translates Shopify collection content from a source language into a target language using the OpenAI API. It retrieves translatable resources from Shopify via the GraphQL API, sends the content to the AI for translation while preserving HTML structure and placeholders, and then registers the translated text back into Shopify. The script intelligently handles both plain text and HTML sections (such as headings and paragraphs), ensuring formatting and dynamic variables remain intact. This allows stores to quickly generate and publish localized collection pages for multiple languages.",
    code_description_4: "This script connects to a remote server via SFTP, scans product folders created within a specific date range, and counts available product images. It then matches those folders with product data from a CSV feed and automatically generates image URLs for each product. The script groups products by their parent ID, builds structured image galleries, and exports the result as a clean CSV file ready for marketplace or shop imports. This allows newly uploaded product images on the server to be quickly transformed into a usable product image feed.",
    code_description_5: "This script reads a CSV file containing product item numbers, supplier identifiers, and new purchase prices (EK). It connects to the Pixi API, retrieves the existing suppliers for each product, and matches them with the supplier specified in the CSV. When a match is found, the script updates the supplier’s purchase price directly in Pixi. This enables quick and automated bulk updates of supplier costs while ensuring that only the correct supplier records are modified.",
    code_description_6: "This Shopify section creates an interactive store locator with Google Maps integration. Store locations are defined in the section blocks and displayed both on the map as markers and in a searchable list. Users can search by store name, street, or city, and the map automatically centers and zooms when a store is selected from the list or when a marker is clicked. The layout is responsive, showing the map and store list side-by-side on desktop and stacked on mobile for an optimized browsing experience.",
    codeHeading: "Code Example",
    footer: "© 2026 Salman Khaled Ovi. All rights reserved."
  },
  de: {
    header: {
      name: "Salman Khaled Ovi",
      title: "Webentwickler"
    },
    about: "Ich bin Ovi, Webentwickler bei Shoepassion GmbH, spezialisiert auf Frontend-Entwicklung mit soliden Backend-Kenntnissen. Ich erstelle flexible, benutzerfreundliche Webanwendungen und löse technische Herausforderungen mit klar strukturiertem Code. Derzeit vertiefe ich mein Wissen in React.js und modernen Frontend-Frameworks, um stets auf dem neuesten Stand der Technik zu bleiben.",
    codeSnippetIntro: "Hier ist ein Code-Snippet aus meinen Projekten bei meiner aktuellen Arbeit. Vielleicht bekommen Sie anhand dieses Snippets einen Eindruck davon, was ich tatsächlich in meinem Code mache. Ich hatte bisher keine Zeit, viele persönliche Projekte zu entwickeln, aber dies ist, woran ich gerade arbeite.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "GraphQL (Grundkenntnisse)",
      "SQL (Grundkenntnisse)",
      "Liquid (Erfahrung in der Entwicklung von Shopify-Themes)",
      "PHP (Erfahrung in der Entwicklung von WordPress-Themes)",
      "React (Derzeit über einen Udemy-Kurs lernend)"
    ],
    more_skills: [
      "Shopify",
      "WordPress",
      "N8N",
      "Magento 1",
      "Plytix (PIM-System)",
      "Pixi (Warehouse Management System)",
      "GitHub",
      "Bitbucket",
      "ChatGPT",
      "Klaviyo",
      "Lugis Box",
      "DataFeedWatch"
    ],
    more_soft_skills: [
      "Technische Tests (Python-Skripte zur Validierung von Shopify-Produktdaten über GraphQL-API)",
      "Teamzusammenarbeit (Unterstützung von Marketing-, Buchhaltungs- und Produktteams bei IT-Aufgaben)",
      "API-Integration (Extraktion von Klaviyo-Daten und Speicherung als CSV für Power BI)",
      "Automatisierungsskripte (Import von Massendaten in Shopify aus PIM über N8N-Automatisierung)",
      "Bildbearbeitung (Python-Skripte zum Entfernen von Hintergründen, Zuschneiden und Bearbeiten von Produktbildern)",
      "ETL-Workflows (Extraktion, Transformation und Laden von Daten aus mehreren Quellen)",
      "Benutzerdefinierte Widgets (Entwicklung von Shopify- und WordPress-Widgets)",
      "Partnerkoordination (Kommunikation mit Drittanbietern wie ShopConnect, Toolbox und Shopney zur Lösung technischer Probleme und Implementierung von Lösungen)",
      "Systemintegration (Erstellung von E-Mail-Konten und Konfiguration von DNS-Einstellungen)"
    ],
    projectsIntro: "Derzeit arbeite ich in einem kleinen Team, in dem ich sowohl Frontend- als auch Backend-Aufgaben sowie Teile der Systemintegration übernehme. Aufgrund begrenzter Ressourcen bin ich häufig für mehrere technische Bereiche gleichzeitig verantwortlich. Dies hat mir ermöglicht, ein umfassendes Verständnis verschiedener Aspekte der Webentwicklung und verwandter Systeme zu entwickeln.",
    projectsParagraphs: [
      "Am wohlsten fühle ich mich bei der Arbeit an Frontend-Anwendungen. Gleichzeitig arbeite ich gelegentlich mit GraphQL, SQL und API-Integrationen sowie E-Commerce-, Lager-, Produktmanagementsystemen und Feed-Management-Systemen wie DataFeedWatch. Ich nutze auch Tools wie GitHub, Bitbucket, GitHub Copilot und ChatGPT, um meinen Workflow effizienter und strukturierter zu gestalten.",
      "Für meine weitere berufliche Entwicklung suche ich ein Umfeld mit mehr technischem Austausch, klareren Strukturen und der Möglichkeit, mich stärker auf Frontend-Entwicklung zu konzentrieren. Ich möchte meine bisherigen Erfahrungen aktiv einbringen und meine Fähigkeiten innerhalb eines größeren Entwicklerteams weiterentwickeln."
    ],
    projects: [{
        title: "Frontend- und Backend-Entwicklung im E-Commerce",
        description: "Umfassende Arbeiten an Frontend- und Backend-Projekten, einschließlich Anpassung von Shopify- und WordPress-Themes und Entwicklung benutzerdefinierter Funktionen."
      },
      {
        title: "Python-Skripte für Automatisierung und Datenverarbeitung",
        description: "Entwicklung von Skripten für Automatisierung, Bildbearbeitung und Datenhandling für interne Workflows und Marktplätze."
      },
      {
        title: "API-Integrationen & OpenAI-Workflows",
        description: "Integration verschiedener APIs, einschließlich der OpenAI-API, zur Automatisierung von Übersetzungen und Datenprozessen in Shopify."
      },
      {
        title: "ETL-Prozesse für interne Analysen",
        description: "Aufbereitung und Transformation von Daten für interne Analysen, z. B. für die Verwendung in Power BI."
      },
      {
        title: "Shopify-App-Integration & benutzerdefinierte Features",
        description: "Installation, Anpassung und Integration von Shopify-Apps sowie Entwicklung von benutzerdefinierten Tools und Widgets."
      },
      {
        title: "Arbeiten mit E-Commerce- und PIM-Systemen",
        description: "Erfahrung mit Shopify, WordPress, Pixi (Warehouse Management System) und Plytix (Product Information Management)."
      },
      {
        title: "Integration externer Tools",
        description: "Integration externer Tools wie Klaviyo und Lugis Box zur Optimierung von Workflows und Marketingprozessen."
      },
      {
        title: "Technische Tests & Systemoptimierung",
        description: "Durchführung technischer Tests, Optimierung und kontinuierliche Verbesserung interner Systeme."
      },
      {
        title: "Zusammenarbeit & Teamunterstützung",
        description: "Enge Zusammenarbeit mit verschiedenen Abteilungen, Systemintegration, IT-Support, Einrichtung von Arbeitsplätzen und technische Unterstützung für neue Teammitglieder."
      }
    ],
    contact: {
      contactText: "Sie können mich gerne per E-Mail kontaktieren oder mehr über meine Arbeit auf GitHub und LinkedIn erfahren.",
      contactLinks: [{
          label: "E-Mail",
          url: "mailto:salmankhaledovi@gmail.com"
        },
        {
          label: "GitHub",
          url: "https://github.com/salkha"
        },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/salman-khaled-ovi-b617831ba"
        }
      ]
    },
    skillsSectionTitles: {
      main: "Fähigkeiten",
      technical: "Programmiersprachen, mit denen ich gearbeitet habe",
      more: "Tools, mit denen ich gearbeitet habe",
      soft: "Praktische Projekte & Implementierungen"
    },
    codingButtonName: [
      "Bildbearbeitung (Teil 1)",
      "Bildbearbeitung (Teil 2)",
      "Shopify-Kollektionen automatisch übersetzen",
      "Bilder-Feed vom Server generieren",
      "Lieferantenpreise aus CSV aktualisieren",
      "Store Locator Karte (Shopify Widget)"
    ],
    code_description_1: "Dieses Skript automatisiert den Prozess der Organisation, Umbenennung und Zuschneidung von Produktbildern für ein E-Commerce-Projekt. Es beginnt mit dem Lesen einer Liste von GTIN-basierten Produktordnern und einem CSV-Feed mit Produktdetails, filtert dann die Daten, um verfügbare Produkte abzugleichen. Jedes Bild wird mit einem standardisierten Format basierend auf Marke, Geschlecht und Farbe umbenannt, und maximal acht Bilder pro Produkt werden in einen neuen Ordner kopiert. Schließlich schneidet das Skript jedes Bild zu, um sich auf das Hauptprodukt zu konzentrieren und zusätzliche transparente Bereiche zu entfernen, was zu sauberen, konsistent benannten Bildern führt, die für die weitere Verwendung oder Anzeige bereit sind.",
    code_description_2: "Nachdem die Agentur die zusätzlichen 9. und 10. Bilder erstellt hat, nimmt dieses Skript die umbenannten und zugeschnittenen Bilder und wendet verschiedene plattformspezifische Bildprofile an. Es organisiert und benennt Dateien nach benutzerdefinierten Regeln um, fügt konsistente Hintergründe hinzu, passt den Abstand an und stellt sicher, dass die Bilder für jeden Marktplatz oder Shop korrekt zentriert sind. Das Ergebnis ist ein Satz von sofort hochladbaren Bildern für mehrere Plattformen wie Shopify, Fashionette, Breuninger und andere mit einheitlichen Größen und visuell optimierten Layouts.",
    code_description_3: "Dieses Skript übersetzt automatisch Shopify-Kollektionen aus einer Quellsprache in eine Zielsprache mithilfe der OpenAI API. Es ruft übersetzbare Ressourcen über die Shopify GraphQL API ab, sendet den Inhalt an die KI zur Übersetzung unter Beibehaltung der HTML-Struktur und Platzhalter und registriert den übersetzten Text anschließend wieder in Shopify. Das Skript verarbeitet sowohl Klartext als auch HTML-Abschnitte (wie Überschriften und Absätze) intelligent, sodass Formatierung und dynamische Variablen erhalten bleiben. So können Shops schnell lokalisierte Kategorieseiten für mehrere Sprachen generieren und veröffentlichen.",
    code_description_4: "Dieses Skript verbindet sich über SFTP mit einem Remote-Server, durchsucht Produktordner, die innerhalb eines bestimmten Datumsbereichs erstellt wurden, und zählt die verfügbaren Produktbilder. Anschließend gleicht es diese Ordner mit Produktdaten aus einem CSV-Feed ab und generiert automatisch Bild-URLs für jedes Produkt. Das Skript gruppiert Produkte nach ihrer Parent-ID, erstellt strukturierte Bildergalerien und exportiert das Ergebnis als saubere CSV-Datei, die für Marktplatz- oder Shop-Importe bereit ist. So können neu hochgeladene Produktbilder auf dem Server schnell in einen nutzbaren Produktbild-Feed umgewandelt werden.",
    code_description_5: "Dieses Skript liest eine CSV-Datei mit Produktnummern, Lieferantenkennungen und neuen Einkaufspreisen (EK). Es verbindet sich mit der Pixi-API, ruft die vorhandenen Lieferanten für jedes Produkt ab und gleicht sie mit dem in der CSV angegebenen Lieferanten ab. Bei Übereinstimmung wird der Einkaufspreis des Lieferanten direkt in Pixi aktualisiert. So können Lieferantenpreise schnell und automatisiert in großen Mengen aktualisiert werden, wobei sichergestellt ist, dass nur die richtigen Lieferantendatensätze geändert werden.",
    code_description_6: "Dieser Shopify-Abschnitt erstellt einen interaktiven Store Locator mit Google Maps-Integration. Die Standorte werden in den Abschnittsblöcken definiert und sowohl auf der Karte als Marker als auch in einer durchsuchbaren Liste angezeigt. Nutzer können nach Filialname, Straße oder Stadt suchen, und die Karte zentriert und zoomt automatisch, wenn ein Store aus der Liste ausgewählt oder ein Marker angeklickt wird. Das Layout ist responsiv und zeigt Karte und Store-Liste auf dem Desktop nebeneinander und auf Mobilgeräten untereinander für ein optimiertes Nutzungserlebnis.",
    codeHeading: "Code-Beispiel",
    footer: "© 2026 Salman Khaled Ovi. Alle Rechte vorbehalten."
  }
};

export default translations;